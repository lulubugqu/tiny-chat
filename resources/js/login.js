if (document.querySelector("#loginBtn") != null){
   document.querySelector("#loginBtn").addEventListener("click", async function() {
      // Get form data
      const username = document.querySelector("#un").value;
      const password = document.querySelector("#pw").value;
      
      // Attempt to login
      login(username, password);
   });
}

if (document.querySelector("#createAcctBtn") != null){
   document.querySelector("#createAcctBtn").addEventListener("click", async function() {
      // Get form data
      const username = document.querySelector("#un").value;
      const password = document.querySelector("#pw").value;

      // Attempt to create account
      create(username, password);
   });
}
// document.querySelector("#statusBtn").addEventListener("click", displayStatus);

async function login(username, password) {
   // Remove any previous error message
   document.querySelector("#errorMsg").innerHTML = "";

   // Send POST request with username and password
   // The server verifies user/pass and returns a JWT to the web browser
   let response = await fetch("/api/loginCheck", {
      method: "post",
      body: new URLSearchParams({ 
         username: username,
         password: password 
      })
   });
   console.log(response)
   if (response.ok) {
      // Extract JWT
      // const tokenResponse = await response.json();
      console.log("ok")
      // Store JWT in local storage
      // localStorage.setItem("token", tokenResponse.token);
      // token = tokenResponse.token;
      
      // Redirects to profile if successful log in
      window.location.href = "/profile"
   }
   else {
      document.querySelector("#errorMsg").innerHTML = "Bad username/password";
   }
}

async function create(username, password) {
   let response = await fetch("/api/createCheck", {
      method: "post",
      body: new URLSearchParams({ 
         username: username,
         password: password,
      }),
   });
   if (response.ok) {
      console.log("passed");
      window.location.href = "/accountCreation";
   } else {
      console.log("failed");
      document.querySelector("#errorMsgCreate").innerHTML = "Username already taken, try something else";
      console.error("Error:", response.statusText);
   }
}

// async function profile() { 
//    // Clear previous statuses
//    document.querySelector("ul").innerHTML = "";
      
//    // Get the token from localStorage
//    //const token = localStorage.getItem("token");
   
//    // Get user statuses
//    const response = await fetch("https://wp.zybooks.com/status.php?op=status", {
//       headers: { "X-Auth": token }
//    });

//    if (response.ok) {
//       // Display user statuses in unordered list
//       console.log("PRINT STUFF HERE")
//       const users = await response.json();
//       let html = "";
//       for (let user of users) {
//          html += `<li>${user.username} - ${user.status}</li>`;
//       }
//       document.querySelector("ul").innerHTML = html;
//    }
//    else {
//       document.querySelector("#errorMsg").innerHTML = "Error: " + response.status;
//    }
// }