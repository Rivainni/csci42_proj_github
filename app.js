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
const { rejects } = require("assert");

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

var active_username = 'sottoms'

// Clear logged in users

/*
db.query('SELECT username FROM user WHERE login_status=1', function (error, results, fields) {
    if (error) throw error;
    if (!results[0]) {
        console.log ('There is no user logged in');
    }
})
*/
const requireLogin = (req, res, next) => {
    if (!active_username) {
       res.redirect('/login') 
    }
   else {
      next() 
   }
}

// Express Routes
app.listen(3000, () => {
    console.log("Listening on Port 3000!")
})

app.get('/', (req, res) => {
    res.render('home.ejs', {active_username})
})

app.get('/episodeDetail', (req, res) => {
    res.render('episodeDetail.ejs', {active_username})
})

app.get('/help', (req, res) => {
    res.render('help.ejs', {active_username})
})


app.get('/history', requireLogin, (req, res) => {
    res.render('history.ejs', {active_username})
})


app.get('/landing', (req, res) => {
    res.render('landing.ejs', {active_username})
})

app.get('/listDetail', requireLogin, (req, res) => {
    res.render('listDetail.ejs', {active_username})
})

app.get('/lists', requireLogin, (req, res) => {
    res.render('lists.ejs', {active_username})
})

app.get('/login', (req, res) => {
    res.render('login.ejs', {active_username})
})

app.post('/login', async (req, res) => {
    const{userName, password} = req.body;

    db.query(
        `select * from user where username='${userName}';`
        , function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            console.log('The user does not exist in the database')
        } else {
            if (results[0].pwd == password) {
                console.log('login successful')
                db.query(`update user set login_status=0 where login_status=1 and username <> '${userName}'`
                    , function (error, results, fields) {
                    if (error) throw error;
                    active_username = ''
                    console.log('clearing logged in users before sign-in');
                });
                db.query(`update user set login_status=1 where username='${userName}'`, function (error, results, fields) {
                    if (error) throw error;
                    console.log('db login user updatedi');
                    active_username = userName
                    console.log(`active user is ${active_username}`)
                    res.redirect('/search')
                });

            } else {
                console.log('invalid password')
            }
        }
    });



    
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
    res.render('movie.ejs', {movieData, active_username})
})

app.get('/tv/:tvID/:season/:episodeCount/episodeDetail', async (req,res) => {
    const tvID = req.params.tvID
    const seasonID = req.params.season
    const episodeCount = req.params.episodeCount
    var tvData = []
    var urls = []
    urls.unshift(`https://api.themoviedb.org/3/tv/${tvID}?api_key=f5d0b40e98581b4563c21ee53a7209ee`)
    for (let i = 0; i <= episodeCount; i++) {
        urls.push(`https://api.themoviedb.org/3/tv/${tvID}/season/${seasonID}/episode/${i + 1}?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US`)
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

    res.render('episodeDetail.ejs', { tvData, active_username })
})


app.get('/navbar', (req, res) => {
    res.render('navbar.ejs')
})

app.get('/profile', requireLogin, (req, res) => {
    res.render('profile.ejs', {active_username})
    
})

app.post('/profile/updatePassword', requireLogin, (req, res) => {
    const {userName, password, confirmPassword} = req.body
    var regExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    
    if (password == "") {
        console.log('password is null')
    } else if (password != confirmPassword) {
        console.log('password is not equal to confirm password')
    } else if (!regExp.test(password)) {
        console.log('password pattern not allowed')
    } else {
        db.query(
            `UPDATE user SET pwd='${password}' WHERE username='${userName}';`
            , function (error, results, fields) {
            if (error) throw error;
            console.log('password updated')
            res.redirect('/search')
    });
    }
})

    // if firstName AND lastName is not null

app.post('/profile/updateName', requireLogin, (req, res) => {
    const {userName, firstName, lastName} = req.body

    if (firstName == "" || lastName == "") {
        console.log("firstName or lastName is null")
    } else
    db.query(
        `UPDATE user SET first_name='${firstName}', last_name='${lastName}' WHERE username='${userName}';`
        , function (error, results, fields) {
            if (error) throw error;
            console.log('name updated')
    });


    res.send(req.body)
})


app.get('/ratings', requireLogin, (req, res) => {
    res.render('ratings.ejs', {active_username})
})

app.get('/register', (req, res) => {
    res.render('register.ejs', {active_username})
})

app.post('/register', async (req, res) => {
    // error handling for user has been created
    // error handling for passwords not equal
    // error handling for bad password
    const {userName, lastName, firstName, password, confirmPassword} = req.body
    var regExp = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    
    console.log('Register form submitted')
    db.query(
        `select * from user where username='${userName}';`
    , function (error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            console.log('user already exists')
            res.redirect('/register')
        }  else { 
        
        if (password == "") {
            console.log('password is null')
        } else if (password != confirmPassword) {
            console.log('password is not equal to confirm password')
        } else if (!regExp.test(password)) {
            console.log('password pattern not allowed')
        } else {
        db.query(
            `INSERT INTO user (username, last_name, first_name,  pwd, login_status) 
            VALUES ('${userName}', '${lastName}', '${firstName}', '${password}', 1);`
        , function (error, results, fields) {
            if (error) throw error;
            console.log('New User Created')
            res.redirect('/login')
        }) 
        }
    }
})     

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
    res.render('search.ejs', {searchData, active_username})
     
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
    res.render('tv.ejs', {tvData, active_username})
})

app.get('*', (req, res) => {
    res.send('<h1>MediaLists Page not available.</h1>.')
})

// API Calls

 