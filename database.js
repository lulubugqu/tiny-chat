// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https ://www.npmj.com/package/mysql#pooling-connections
// this is used a bit differently, but I think it's just better -- especially if server is doing heavy work.

// to start server, in another terminal, node server.js
var connPool = mysql.createPool({
  // The maximum number of connections to create at once. 
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "localhost",  // this will work
  user: "C4131F23U48",
  database: "C4131F23U48",
  password: "2354", 
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.
async function getAccount(un, pw) {
  // return await connPool.awaitQuery("select id, apptName, email, date(apptDate) as dateOnly, apptService, cash from contact;")
  return await connPool.awaitQuery("select * from accounts where un = ? and pw = ?;", [un, pw])
}


async function checkUser(un) {
  return await connPool.awaitQuery("select * from accounts where un = ?", [un])
}

async function toggleLogin(un) {
  return await connPool.awaitQuery("update accounts set looged_in = 1 where un = ?;", [un])
}

async function toggleLogout(un) {
  return await connPool.awaitQuery("update accounts set looged_in = 0 where un = ?;", [un])
}

async function addAccount(un, pw) {
  // you CAN change the parameters for this function. please do not change the parameters for any other function in this file.
  // let { un, pw } = data; // get data values
  // let values = [un, pw, apptDate, apptService, cash]; // values to pass in
  return await connPool.awaitQuery("insert into accounts (un, pw) values (?, ?);", [un, pw])
}

async function getPostsByTime() {
  return await connPool.awaitQuery("select * from posts order by postDate desc;")
}

async function getPostsByLikes() {
  return await connPool.awaitQuery("select * from posts order by postLikes desc;")
}

async function getPostsByUser(user) {
  return await connPool.awaitQuery("select * from posts where postUser = ? order by postDate desc;", [user])
}

async function addPost(user, message) {
  return await connPool.awaitQuery("insert into posts (postUser, postMessage) values (?, ?);", [user, message])
}

async function deletePost(user, id) {
  connPool.awaitQuery("delete from posts where postUser = ? and id= ?;", [user, id])
}

async function editPost(message, id) {
  connPool.awaitQuery("update posts set postMessage = ? where id= ?;", [message, id])
}

async function addLike(id) {
  return await connPool.awaitQuery("update posts set postLikes = postLikes + 1 where id = ?;", [id])
}

async function getLikes(id) {
  return await connPool.awaitQuery("select postLikes from posts where id = ?;", [id])
}


// async function addSale(message) {
//   return await connPool.awaitQuery("insert into sale (saleText, active) values (?, 1);", [message])
// }

// async function endSale() {
//   return await connPool.awaitQuery("update sale set active = 0, endTime = NOW() where active = 1;")
// }


// async function getRecentSales() {
//   return await connPool.awaitQuery("select saleText, active from sale order by startTime desc limit 3;")
//     // return await connPool.awaitQuery("select json_object ('saleText', saleText, 'startTime', startTime, 'endTime', endTime, 'active', active, 'id', id) from sale order by startTime desc limit 3;")
//   // SELECT json_object('name', name, 'age', age) FROM yourTable;

// }
// This is an important line of code! It's a key part of the javascript modules
// system and it defines what will actually be "public" from this file when 
// imported by others. This is a javascript object using the "shortcut" syntax
// we talked about in class.
module.exports = {addAccount, toggleLogin, toggleLogout, getAccount, checkUser, getPostsByTime, getPostsByLikes, getPostsByUser, deletePost, addPost, editPost, addLike, getLikes}