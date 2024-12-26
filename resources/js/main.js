// ----------------------------- sort button ----------------------------- //

// // document.addEventListener('DOMContentLoaded', function() {
    // let srtBtn = document.querySelector(".sortBtn");
    // let btnText = document.querySelector("#sortBtn"); 
    // //span element holding text about sorting status
    // let sortStatement = document.querySelector("#sortStatement");

    // if (srtBtn != null && btnText != null && sortStatement != null) {
    //     srtBtn.addEventListener('click', async function() {
    //         // checks state before swapping
    //         const isSortingByLikes = srtBtn.classList.contains("sortByLikes");

    //         // swaps state
    //         srtBtn.classList.toggle("sortByLikes");

    //         // update innher html based on state
    //         if (isSortingByLikes) {
    //             btnText.innerHTML = "sort by newest";
    //             sortStatement.innerHTML = "currently sorted by likes";
    //         } else {
    //             btnText.innerHTML = "sort by likes";
    //             sortStatement.innerHTML = "currently sorted by newest posts";
    //         }
    //     });
    // }

// ----------------------------- like button ----------------------------- //
const postsContainer = document.querySelector('.postContainer');

postsContainer.addEventListener('click', async function (event) { 
    console.log("target classlist: ");
    console.log(event.target.classList)
    if (event.target.classList.contains('fa-heart') || event.target.classList.contains('button-like') || event.target.classList.contains('span')) {
        const post = event.target.closest('.post');
        const span = post.querySelector('.span');

        if (post && span) { // they both are found
            const postID = post.id;

            let response = await fetch("/likePost", {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postID })
            });

            if (response.ok) {
                const updatedLikes = await response.json();
                const newLikeCount = updatedLikes.likes[0];

                // modify DOM
                span.textContent = `${newLikeCount.postLikes} likes`;

            } else {
                console.log("Failed to increment likes");
            }
        }
    }
});