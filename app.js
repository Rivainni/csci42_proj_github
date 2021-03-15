console.log ("Welcome to MediaLists!")

// Use Express
const express = require("express");
const app = express(); 

// Configuration to resolve EJS path issues
// EJS will not work if node server is launched from outside of project root directory
// without this setup
const path = require('path')
app.set('views', path.join(__dirname, '/views'))
app.set(express.static(path.join(__dirname, 'public')))

// Use EJS
app.set('view engine', 'ejs');

// Use MySQL
var mysql = require("mysql");

// Connect to MySQL database
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '1234',
database: 'medialists',
});

// Test Database Query
connection.query('SELECT "The database is running..." AS status', function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
});


// Express Routes
app.listen(3000, () => {
    console.log("Listening on Port 3000!")
})

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/comments', (req, res) => {
    res.render('comments.ejs')
})


app.get('/episodeDetail', (req, res) => {
    res.render('episodeDetail.ejs')
})

app.get('/help', (req, res) => {
    res.render('help.ejs')
})


app.get('/history', (req, res) => {
    res.render('history.ejs')
})


app.get('/landing', (req, res) => {
    res.render('landing.ejs')
})

app.get('/listDetail', (req, res) => {
    res.render('listDetail.ejs')
})

app.get('/lists', (req, res) => {
    res.render('lists.ejs')
})

/*
app.get('/lists/:userList', (req, res) => {
    const {userList} = req.params;
    res.send('<h1> ${userList} User List Page</h1>')
})
*/

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/movie', (req, res) => {
    res.render('movie.ejs')
})

app.get('/movieDetail', (req, res) => {
    res.render('movieDetail.ejs')
})

app.get('/navbar', (req, res) => {
    res.render('navbar.ejs')
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})

app.get('/ratings', (req, res) => {
    res.render('ratings.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/search', (req, res) => {
    res.render('search.ejs')
})

app.get('/tv', (req, res) => {
    res.render('tv.ejs')
})

app.get('/tvDetail', (req, res) => {
    res.render('tvDetail.ejs')
})

app.get('*', (req, res) => {
    res.send('<h1>MediaLists Page not available.</h1>.')
})