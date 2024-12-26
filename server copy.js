const data = require("./database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
// const jwt = require("jwt-simple");
const port = 4131;

app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.json());  // turn on json handling

// Secret used to encode/decode JWTs
const secret = "nfianfianfoiw";

// for session handling
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // for HTTP, true for HTTPS
}));

app.use(express.static('public'));
app.use("/css", express.static("resources/css"));
app.use("/js", express.static("resources/js"));
app.use("/images", express.static("resources/images"));

const router = express.Router();

// Middleware to check if the request has a valid JWT
function authenticateToken(req, res, next) {
  const user = req.session.un;
  if (!user) { // no token exists
     return res.status(401).send('Unauthorized');
  }

  try { 
     req.user = user;
     next();

  } catch (error) {
     console.error("Failed to find user");
     return res.status(403).send('Forbidden');
  }
}

// Parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// adds json handling
router.use(bodyParser.json());

// Adds router middleware to the "/api" path
app.use("/api", router);

app.get(["/", "/login"], (req, res)=>{  // returns mainpage
  res.status(200).render("login.pug")
});

app.get("/accountCreation", (req, res)=>{  // returns mainpage
  res.status(200).render("accountCreation.pug")
});

app.get("/profile", authenticateToken, async (req, res) => {
  // console.log("req.user in /profile endpoint")
  let username = String(req.session.un)
  let userPosts = await data.getPostsByUser(username)

  if (String(userPosts) == "") { // if username doesn't exist, then they have no posts
    res.status(200).render("profile.pug", {posts : userPosts})
  
  }
  else{
    res.status(200).render("profile.pug", {posts : userPosts})
  }
});

app.get("/explore", authenticateToken, async (req, res)=>{  // returns home, can make blog post from here
  let page = parseInt(req.query.page ?? 1)
    if (! page) {
        // this should catch "Nan" from a bad parseInt
        page = 1;
    }
    // -1 so that we go to 0 indexing.
    let offset = (page-1)*5 
  
    let posts;
    if (req.query.sort === 'likes') {
      posts = await (await data.getPostsByLikes()).slice(offset, offset + 5);
    }
    else {
      posts = await (await data.getPostsByTime()).slice(offset, offset + 5);
    }

    res.status(200).render("explore.pug", {posts, page})
});


app.get("/logout", async (req, res)=>{ 
  await data.toggleLogout(req.session.un)
  req.session.destroy(()=>{}) // empty function
  res.status(200).render("login.pug")
});

// Checks user login
router.post("/loginCheck", async function(req, res) {
  // console.log("made it to the api/login endpoint! next is to check its in the db")
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ error: "Missing username and/or password"});
    return;
  }
    // console.log(req.body.username)
    // console.log(req.body.password)
    let acctInfo = await data.getAccount(req.body.username, req.body.password);
    // console.log(acctInfo)
    if (String(acctInfo) == "") { //acctInfo does not exist
      // Unauthorized access
      res.status(401).json({ error: "Bad username/password" });     
    }
    else {
      // Send back a token that contains the user's username
      await data.toggleLogin(req.body.username)
      req.session.un = req.body.username;
      // SET STATUS AS LOGGED IN WITH AWAIT data.setLoggedin
      res.sendStatus(200);
    }
});

// Add a new user to the database
router.post("/createCheck", async function(req, res) {
  // console.log("made it to the api/createCheck endpoint! next is to check its in the db")
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ error: "Missing username and/or password"});
    return;
  }
  
  let userCheck = await data.checkUser(req.body.username)

  if (String(userCheck) == "") { // if username doesn't exist, then create the acocunt!!!!
      let result = await data.addAccount(req.body.username, req.body.password);
      if (result) { // if successful
          res.status(201).json({ success: "account created" });   
      }
  }
  else {
    res.status(401).json({ error: "Username already taken, try something else" });  
  }
});

// Add a new post
app.post("/createPost", authenticateToken, async function(req, res) {
  // console.log("made it to the api/createPost endpoint!")
  if (!req.session.un || !req.body.postText) {
    res.status(401).json({ error: "Missing message for post"});
    return;
  }
  let result = await data.addPost(req.session.un, req.body.postText);
  if (result) { // if successful
    // console.log(result)
      // console.log("post was added!")
      res.status(201).redirect("/profile")
  }
});

app.delete("/deletePost", authenticateToken, async function(req, res) {
  // console.log("made it to the api/deletePost endpoint!");
  if (!req.session.un|| !req.body.postID) {
    res.status(401).send({ error: "Missing ID for post"});
    return;
  }
  await data.deletePost(req.session.un, req.body.postID);
  res.status(200).send({ message: "Post deleted successfully" });
});

app.put("/editPost", authenticateToken, async function(req, res) {
  // console.log("made it to the api/editPost endpoint!");
  if (!req.session.un || !req.body.postText || !req.body.postID) {
    res.status(401).send({ error: "Missing message for post"});
    return;
  }
  await data.editPost(req.body.postText, req.body.postID);
  res.status(201).send({ message: "Post edited successfully" });
});

app.put("/likePost", authenticateToken, async function(req, res) {
  // console.log("made it to the api/likePost endpoint!");
  if (!req.body.postID) {
    res.status(401).json({ error: "Missing message for post"});
    return;
  }
  await data.addLike(req.body.postID);
  // returns updated likes
  let likes = await data.getLikes(req.body.postID);
  res.status(201).send({"likes": likes})
});

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});
  
app.listen (port , () => {
    console.log(`Example app listening on port ${port} available at http://localhost:4131`)
});
