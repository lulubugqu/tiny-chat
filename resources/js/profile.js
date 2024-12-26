// let token = localStorage.getItem("token");
// console.log("token:")
// console.log(token)

// ----------------------------- post button ----------------------------- //
let makePostBtn = document.querySelector(".makePostBtn")

if (makePostBtn != null) {
    makePostBtn.addEventListener("click", async function() {
        // Get form data
        const postText = document.querySelector("#postText").value;
        console.log(postText)
        
        // Attempt to create post
        createPost(postText);
     });
}
async function createPost(postText) {
    let response = await fetch("/createPost", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postText})
    });
    if (!response.ok) {
        alert("could not post, try again ฅ(^=✪ ᴥ ✪=^)ฅ")
    } else {
        window.location.reload()
    }
}

// ----------------------------- delete button ----------------------------- //
// Assuming your posts are contained in a parent element with id="postsContainer"
const postDiv = document.querySelector('.PostDiv');

// click event listener to the PostDiv container
postDiv.addEventListener('click', async function (event) {
  // if target is delete button
    if (event.target.classList.contains('deletePostBtn')) {
        // gets closest div.post element
        const post = event.target.closest('.post');
        if (post) {
            const postID = post.id;
            console.log("postID: ", postID)
            deletePost(postID)
        }
    }
    else if (event.target.classList.contains('bx-edit-alt')) {
        const postEle = event.target.closest('.post');
        if (postEle) {
            const postID = postEle.id;
            const newPostMessage = String(window.prompt("What is your new message ฅ(^=✪ ᴥ ✪=^)ฅ ", "type here :P"));
            console.log("postID: ", postID)

            console.log("newPostMessage: ", newPostMessage)
            if (newPostMessage === "null") {
                alert("Operation canceled by user ฅ(^=✪ ᴥ ✪=^)ฅ");
                return; // break out of the function
            } else if (newPostMessage.trim() === "") { // checks for leading whitespaces and if null 
                alert("Enter a valid message ฅ(^=✪ ᴥ ✪=^)ฅ");
                return; // break out of the function
            } else {
                editPost(newPostMessage, postID);
            }
        }
    }
    else {
        return;
    }
    
});
  
async function deletePost(postID) {
    let response = await fetch("/deletePost", {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postID})
    });
    if (!response.ok) {
        alert("could not delete, try again ฅ(^=✪ ᴥ ✪=^)ฅ")
    } else {
        window.location.reload()

    }
}

async function editPost(newPostMessage, postID) {
    // console.log("made it to editpost function")
    // console.log(postID)
    // console.log(messnewPostMessageage)
    let response = await fetch("/editPost", {
        method: "put",
        body: new URLSearchParams({ 
            postText: newPostMessage,
            postID: postID
        })
    });
    if (!response.ok) {
        alert("could not edit your post, try again ฅ(^=✪ ᴥ ✪=^)ฅ")
    } else {
        // alert("edited! reload to see your changes ฅ(^=✪ ᴥ ✪=^)ฅ");
        window.location.reload()

    }
}

