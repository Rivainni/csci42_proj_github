# Technical Documentation

## Node.JS Configuration
After Installing Node.JS...

Save `app.js` in root directory of project folder
Save `package.json` in root directory of project folder

Initialize the current folder (ie. root directory of project folder) as a node project by running `npm init`

Install node.js dependencies by running `npm install` from root directory of project folder to install dependencies listed in `package.json`

Package installation via npm and required modules for node (no need to do these if installed from package.json):
`npm install --save mysql`
`npm install --save express`
`npm install --save axios`

When configuration is complete, you may run the server with: `node app.js` (Ensure that mySQL server is running as well).



## MySQL Configuration
After installing MySQL, add `/usr/local/mysql/bin` to your $PATH

when MySQL runs, you'll need to alter root or create new user. I went with altering root:

```sql
-- alter root
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

mysql> FLUSH PRIVILEGES;
-- create new user
CREATE USER 'new_user'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
GRANT USAGE ON *.* TO 'new_user'@'%';
ALTER USER 'new_user'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `new_user`.* TO 'new_user'@'%';
FLUSH PRIVILEGES;
```

start mysql server with:
`mysql -u root -p medialists`

enter `1234` when prompted for a password.

## Express Configuration
Express is a node.js package
MediaList is configured to listen to port 3000.

## EJS Configuration
`npm install --save ejs`
you are required to create a folder named `views` in the root folder.
you are required to create a folder named `public` in the root folder.

If you're going to download Bootstrap (rather than use CDN) these need to be put in the public folder.
app.css also needs to be put inside public folder.

## Git (Not Complete)
After installing Git from git-scm.com, check with `git --version`

Configure global user name
`git config --global user.name "sottoms"`

Configure global user.email "xxxx@obf.ateneo.edu"
`git config --global user.email`

Check Global Configurations
`git config --global --list`

Initialize project folder
`git init`

Show hidden files on mac
`cmd+shift+.`

Check merge status
`git status`

Stage changed files to be commited
`git add .`

Commit changes
`git commit -m "my first commit"`



## Nodemon Installation and Configuration (Optional)
Nodemon is an optional package.
It allows developers to make updates to the source code without having to restart the server to reflect changes.

Below are the steps to install nodemon local to the project.

`npm install --save nodemon`

add script below in package.json

```json
"scripts": {
  "devserver": "./node_modules/nodemon/bin/nodemon.js app.js"
}, /* rest of package.json */
```

run the server with:

`npm run devserver`

## Trakt API Data
Client ID: 67cb9a4ced5c32500437a9b9ce8988df785fb9bf086a1931d59a4e59a6e3cb05
Client Secret: b803aefe251f13d6e250282c267b0d298451c9f44a1b9e84f9863fe9a1a517bc

## TMDB API
API Key
f5d0b40e98581b4563c21ee53a7209ee

Bearer Token
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWQwYjQwZTk4NTgxYjQ1NjNjMjFlZTUzYTcyMDllZSIsInN1YiI6IjYwNTBmMDI1OTc2YTIzMDA1MzJmNGYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TaLIvnWo0ojdqn7INShG0g3xwc6oWhpCUzYBKvHhtZM

Get Movie Details
https://api.themoviedb.org/3/movie/<movie_id>?api_key=f5d0b40e98581b4563c21ee53a7209ee

Get TV Details
https://api.themoviedb.org/3/tv/1416?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US

Get Episode Details

Multi Search