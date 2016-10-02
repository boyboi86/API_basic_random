# API_basic_random

This is a full MERN stack app.

For a full list of library used kindly refer to package.json.

This is a simple blog that allows individual users to create/read/update/delete their post.

Posts are specific to individual users as routes are privatized by JWT tokens.

Therefore, if the post entry does not belong to the correct user, they cannot delete or update that post.

With the only exception to users page where every user can see every available user in the database as well as the number of post they have created.

Under public folder, there is another readme.md specifically for React/Redux instructions.

The project is 172 days (roughly 5 months plus) after I started learning HTML/CSS. Finished on 29 Sept 2016.

## instructions

download zip file or clone using `git clone`

navigate to working directory, then run `npm install`

run `npm start`, got to browser `http://localhost:3000`

##When you are authenticated

You can see all your post/ create your post, edit your post and delete your post.

You can also see all your post details like when it was posted.

You can see a list of users with the number of post they have made.

There is character count handle at bottom right hand corner, when you create new post. To keep track of number of characters typed.

Give it a try here [Heroku](https://glacial-cove-64389.herokuapp.com)

##When you are NOT authenticated

You can see all other individual posts. (Assuming if you know their user IDs)

## Note

Server-side was scaffolded using express-generator then modified to fit the needs of the project.

I included the bundle.js in the public folder, so there is no need to run additional commands.

Please make sure you have either mongodb installed or a mLab account when you set up your own config file.

config file format (JSON):
`module.exports = {
  mLab: <mLAB_URL>
  secret: <JWT_SECRETKEY>
  }`

Although the app is completed but it will continuously be updated to add more features and styles.
