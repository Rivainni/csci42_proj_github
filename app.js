console.log ("Welcome to MediaLists!")

// Use Express
const express = require("express");
const app = express(); 

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configuration to resolve EJS path issues
// EJS will not work if node server is launched from outside of project root directory
// without this setup
const path = require('path')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))

// Use EJS
app.set('view engine', 'ejs');

// Use MySQL
var mysql = require("mysql");

// Use Axios
const axios = require('axios');

// Connect to MySQL database
var  db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '1234',
database: 'medialists',
});

// Test Database Query
db.query('SELECT "The database is running..." AS status', function (error, results, fields) {
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

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/movie/:movieID', async (req, res) => {
    const movieID = req.params.movieID;
    var movieData = {}
    await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=f5d0b40e98581b4563c21ee53a7209ee`, {
    headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
    }
    })
    .then((res) => {
        movieData = res.data
    })
    .catch((error) => {
    console.error(error)
    })
    console.log(movieData)
    res.render('movie.ejs', {movieData})
})

app.get('/tv/:tvID/:season/:episodeCount/episodeDetail', async (req,res) => {
    const tvID = req.params.tvID
    const seasonID = req.params.season
    const episodeCount = req.params.episodeCount
    var tvData = [] 
    var urls = []
    urls.unshift(`https://api.themoviedb.org/3/tv/${tvID}?api_key=f5d0b40e98581b4563c21ee53a7209ee`)
    for (let i = 0; i < episodeCount; i++) {
        urls.push(`https://api.themoviedb.org/3/tv/1416/season/${seasonID}/episode/${i+1}?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US`)
        await axios.get(urls[i], {
            headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
            }
            })
            .then((res) => {
                tvData.push(res.data)
            })
            .catch((error) => {
            console.error(error)
            })
    }

    console.log(tvData)
    res.render('episodeDetail.ejs', {tvData})
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


app.get('/search', async (req, res) => {
    var qstring = req.query.q
    if (qstring == "") {qstring = "undefined"}
    var searchData = []   
    await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=f5d0b40e98581b4563c21ee53a7209ee&query=${qstring}&page=1`, {
    headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
    }
    })
    .then((res) => {
    for(let data of res.data.results) {
        if (data.media_type == 'tv' || data.media_type == 'movie') {
            searchData.push(data)    
            }
        }
    
        console.log(searchData)
    })
    .catch((error) => {
    console.error(error)
    })
    res.render('search.ejs', {searchData})
     
})

app.get('/tv/:tvID', async (req, res) => {
    const tvID = req.params.tvID
    var tvData = {}
    await axios.get(`https://api.themoviedb.org/3/tv/${tvID}?api_key=f5d0b40e98581b4563c21ee53a7209ee`, {
    headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
    }
    })
    .then((res) => {
        tvData = res.data
    })
    .catch((error) => {
    console.error(error)
    })
    console.log(tvData)
    res.render('tv.ejs', {tvData})
})

app.get('*', (req, res) => {
    res.send('<h1>MediaLists Page not available.</h1>.')
})

// API Calls

 