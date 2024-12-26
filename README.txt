These are the feautres I implemented:
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

To Run This:
    Download the zip file, then unzip it. In the directory with the package.json, run:
    ```
        nmp install
    ```
    Run this command to create the tunnel, and log in with UMN account:
    ```
        node tunnel.js
    ```
    Then in another terminal, run this command to start the server:
    ```
        node server.js
    ```
    Open http://localhost:4131/ to interact with the website.