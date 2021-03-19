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

app.get('/search', async (req, res) => {
    const qstring = req.query.q
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
            if (data.media_type == 'tv') {
                renameKey(data, data.original_title, data.title)
            }
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

app.delete('/search', async (req,res) => {
    qstring = req.body.q 
    searchyData = []
    await axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=f5d0b40e98581b4563c21ee53a7209ee&query=${qstring}&page=1`, {
  headers: {
    'Content-Type': 'application/json',
    'charset': 'utf-8'
}
    })
    .then((res) => {

    for(let data of res.data.results) {
        searchyData.push(data.name)
    }
    console.log(searchyData)
    })
    .catch((error) => {
    console.error(error)
    })
    res.render('search.ejs', {searchyData})
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

// API Calls

const clone = (obj) => Object.assign({}, obj);

const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
  };
 