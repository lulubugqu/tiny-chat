<!-- ABOUT THE PROJECT -->
## About The Project
CSCI 4131 Final Project.
These are the feautres implemented:
    - Account creation (I.E. a not-logged in user can create a new account)
    - Logged-in vs. not-logged-in status should be tracked.
    - Login and logout features
    - Posts are associated with a specific user, only the associated user 
      can edit or delete a given post.
        - This is implemented by making the posting, editing, and deleting 
          can only be done by the logged in user accessing their profile
        - Users can create short text-posts. (I did a max length of 280 characters)
        - Text posts can be edited and deleted
    - Text posts can be "liked", and should maintain a "like count"

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
npm 
### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. In the directory with the package.json, install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file like ethe /env/template. Enter your secrets in in `.env`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

5. Run this command to create the tunnel, and log in with UMN account:
    ```sh
        node tunnel.js
    ```
6. Then in another terminal, run this command to start the server:
    ```sh
        node server.js
    ```
7. Open http://localhost:4131/ to interact with the website.
