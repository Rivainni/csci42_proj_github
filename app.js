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

// Use MySQL and util packages
const util = require('util');
const mysql = require("mysql");

// Use Session
const session = require('express-session');
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));

// Use Connect-Flash
const flash = require ('connect-flash');
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// Use Axios
const axios = require('axios');
const { rejects } = require("assert");
const { hasUncaughtExceptionCaptureCallback } = require("process");

// Connect to MySQL database
    var  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'medialists',
    });

function makeDb () {
    var  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'medialists',
    });

    return {
        query(sql, args) {
            return util.promisify(connection.query)
            .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection)
        }
    }
}

// Test Database Query
db.query('SELECT "The database is running..." AS status', function (error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
});

var active_username = ''

// Clear logged in users


db.query('SELECT username FROM user WHERE login_status=1', function (error, results, fields) {
    if (error) throw error;
    if (!results[0]) {
        console.log ('There is no user logged in');
    }
})

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
    var historyData = []
    var mediaData = []
    var mediaURL = ''
    var allLists = []

    const connection = makeDb();
    (async () => {
        try {
            const allListsQuery = await connection.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await connection.close();
        }
      })() 

    const db = makeDb();
    (async () => {
        try {
            const historyQuery = await db.query(
                `

                select media.*, media_history.history_id, media_history.watch_date, history.username 
                from media, media_history, history
                where 
                username = '${active_username}'
                and history.history_id = media_history.history_id
                and media_history.media_id = media.media_id;


                `
                
            )    
            historyData = historyQuery 
            
            for (i = 0; i < historyData.length; i++) {
                if (historyData[i].media_type=="M") {    
                mediaURL = `https://api.themoviedb.org/3/movie/${historyData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                }
                else if (historyData[i].media_type=="T") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${historyData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                } else if (historyData[i].media_type=="E") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${historyData[i].tmdb_id}/season/${historyData[i].season_no}/episode/${historyData[i].episode_no}?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US`
                }
                
                await axios.get(mediaURL
                    , {
                headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
                }
                })
                .then((res) => {
                    mediaData.push(res.data)
                })
                .catch((error) => {
                console.error(error)
                })
            }
            
         } 
        //  catch {console.log('============rating query failed=================')
            
         
         finally {
          await db.close();
          res.render('history.ejs', {historyData, mediaData, allLists, active_username})

        }
      })()  


})


app.post('/history/addMediaToHistory', requireLogin, (req, res) => {
    const {userName, tmdb_id, media_type, season_no, episode_no} = req.body
    var fromURL = req.header('Referer') || '/history'
    var media_id = ''


    const db = makeDb();
    (async () => {
        try {
            const insertMedia = await db.query(
                `
                insert into media(tmdb_id, media_type, episode_no, season_no)
                values ('${tmdb_id}','${media_type}', ${episode_no}, ${season_no});
                `  
            )

            getMediaID = await db.query(
                `
                select last_insert_id() as id;
                `  
            )

            media_id = getMediaID[0].id

            const insertHistory = await db.query(
                `
                insert into history(username)
                values ('${active_username}');
                `  
            )

            const insertMediaHistory = await db.query(
                `
                insert into media_history(history_id, media_id, watch_date)
                values (last_insert_id(), ${media_id},now());
                `  
            )

 
            
         }     catch(error){
            console.error(error)
            }
            
         
         finally {
          await db.close();
          res.redirect(fromURL)
          req.flash('success', 'Media successully added to History.')

          res.redirect(fromURL)
        }
      })()  


})

app.post('/history/deleteMediaFromHistory', requireLogin, (req, res) => {
    const {media_id} = req.body
    var fromURL = req.header('Referer') || '/lists'

    const db = makeDb();
    (async () => {
        try {
            const deleteFromMedia = await db.query(
                `
                delete from media
                where media_id = '${media_id}';
                `
            )
         } 
         catch {
         }
         
         finally {
          await db.close();
          req.flash('success', 'Media successfully deleted from history page.')
          res.redirect(fromURL)
            
        }
      })()  
        
})

app.get('/landing', (req, res) => {
    res.render('landing.ejs', {active_username})
})

app.get('/listDetail', requireLogin, (req, res) => {
    res.render('listDetail.ejs', {active_username})
})

app.get('/lists', requireLogin, (req, res) => {
    db.query(`select list_id, list_name from list where username='${active_username}'`, function (error, results, fields) {
        if (error) {throw error;}
        else {
        var listData = results
        console.log(results)
        res.render('lists.ejs', {listData, active_username})
        }
    });
})
app.post('/lists/addMediaToList', requireLogin, (req, res) => {
    const {list_id, userName, tmdb_id, media_type, season_no, episode_no} = req.body
    var fromURL = req.header('Referer') || '/lists'
    var media_id = ''

    const db = makeDb();
    (async () => {
        try {
            const insertToMedia = await db.query(
                `
                insert into media(tmdb_id, media_type, episode_no, season_no) 
                values ('${tmdb_id}','${media_type}', ${episode_no}, ${season_no}) 
                `
            )

            const getMediaID = await db.query(
                `
                select media_id from media
                where tmdb_id='${tmdb_id}' and media_type='${media_type}' and episode_no = ${episode_no} and season_no = ${season_no};`   
            )

            var getmediaIdfrom = getMediaID[getMediaID.length -1].media_id

            const insertToMediaList = await db.query(
                `
                insert into media_list(list_id, media_id) 
                values (${list_id}, ${getmediaIdfrom});
                `
            )


         } 
         catch {
         }
         
         finally {
          await db.close();
          req.flash('success', 'Media successfully added to list')
          res.redirect(fromURL)
            
        }
      })()  
        
})

app.post('/lists/addNewList', requireLogin, (req, res) => {
    const {newLabelName, userName} = req.body
    var fromURL = req.header('Referer') || '/lists'

    db.query(`insert into list(list_name, username) values ('${newLabelName}','${userName}');`, function (error, results, fields) {
        if (error) {throw error;}
        else {
        req.flash('success', 'List added successfully')
        res.redirect(fromURL)
        }
    });
})

app.post('/lists/deleteMediaFromList', requireLogin, (req, res) => {
    const {media_id} = req.body
    var fromURL = req.header('Referer') || '/lists'

    const db = makeDb();
    (async () => {
        try {
            const deleteFromMedia = await db.query(
                `
                delete from media
                where media_id = '${media_id}';
                `
            )
         } 
         catch {
         }
         
         finally {
          await db.close();
          req.flash('success', 'Media successfully deleted from list')
          res.redirect(fromURL)
            
        }
      })()  
        
})

app.post('/lists/deleteList', requireLogin, (req, res) => {
    const {userName, list_id} = req.body
    var fromURL = req.header('Referer') || '/lists'

    db.query(`delete from list where list_id='${list_id}' and username='${userName}';`, function (error, results, fields) {
        if (error) {throw error;}
        else {    
        req.flash('success', 'List deleted successfully')
        res.redirect(fromURL)
        }
    });

})

app.get('/lists/:listid', requireLogin, async (req, res) => {
    const listID = req.params.listid
    var mediaData = []
    var mediaURL = ''
    var listData = []

    const db = makeDb();
    (async () => {
        try {
          const results = await db.query(
            `
            SELECT *
            FROM media, media_list, list
            WHERE list.username='${active_username}' AND media_list.list_id=${listID} AND media_list.media_id=media.media_id and media_list.list_id=list.list_id;
            `
            );
            listData = results
            
            for (i = 0; i < listData.length; i++) {
                if (listData[i].media_type=="M") {    
                mediaURL = `https://api.themoviedb.org/3/movie/${listData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                }
                else if (listData[i].media_type=="T") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${listData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                } else if (listData[i].media_type=="E") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${listData[i].tmdb_id}/season/${listData[i].season_no}/episode/${listData[i].episode_no}?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US`
                }
                

                await axios.get(mediaURL
                    , {
                headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
                }
                })
                .then((res) => {
                    mediaData.push(res.data)
                })
                .catch((error) => {
                    console.error(error)
                })
            
            }
        } finally {
          await db.close();
          res.render("listDetail.ejs", {listData, mediaData, active_username})
        }
      })()
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
            req.flash('error', 'The user does not exist in the database')
            res.redirect('/login')
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
                    req.flash('success', 'Successfully logged in.')
                    res.redirect('/search')
                });

            } else {
                req.flash('error', 'Invalid password.')
                req.redirect('/login')
                console.log('invalid password')
            }
        }
    });
  
})

app.get('/logout', (req, res) => {
   
   db.query(`update user set login_status=0 where login_status=1;`
   , function (error, results, fields) {
   if (error) throw error;
   active_username = ''
   console.log('user logged out');

    res.render('logout.ejs', {active_username:''})
}); 

})


app.get('/movie/:movieID', async (req, res) => {
    const movieID = req.params.movieID;
    var movieData = {}
    var allLists = []

    const db = makeDb();
    (async () => {
        try {
            const allListsQuery = await db.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await db.close();
        }
      })() 

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
    res.render('movie.ejs', {movieData, allLists, active_username})
})

app.get('/tv/:tvID/:season/:episodeCount/episodeDetail', async (req,res) => {
    const tvID = req.params.tvID
    const seasonID = req.params.season
    const episodeCount = req.params.episodeCount
    var tvData = []
    var urls = []
    var allLists = []

    const db = makeDb();
    (async () => {
        try {
            const allListsQuery = await db.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await db.close();
        }
      })() 

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

    res.render('episodeDetail.ejs', { tvData, allLists, active_username })
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
        req.flash('error', 'The password you entered is null.')
        res.redirect('/profile')

        console.log('password is null')
    } else if (password != confirmPassword) {
        req.flash('error', 'The password and confirm password fields should be the same.')

        console.log('password is not equal to confirm password')
        res.redirect('/profile')

    } else if (!regExp.test(password)) {
        req.flash('error', 'Your password should be 8 characters long, contain a number and special character.')

        console.log('password pattern not allowed')
        res.redirect('/profile')

    } else {
        db.query(
            `UPDATE user SET pwd='${password}' WHERE username='${userName}';`
            , function (error, results, fields) {
            if (error) throw error;
            req.flash('success', 'Password successfully updated.')
            console.log('password updated')
            res.redirect('/search')
    });
    }
})

    // if firstName AND lastName is not null

app.post('/profile/updateName', requireLogin, (req, res) => {
    const {userName, firstName, lastName} = req.body

    if (firstName == "" || lastName == "") {
        req.flash('error', 'Your first or last name cannot be null.')
        console.log("firstName or lastName is null")
        res.redirect('/profile')

    } else
    db.query(
        `UPDATE user SET first_name='${firstName}', last_name='${lastName}' WHERE username='${userName}';`
        , function (error, results, fields) {
            if (error) throw error;
            req.flash('success', 'Name successfully updated.')
            res.redirect('/profile')

            console.log('name updated')
    });


})


app.get('/ratings', requireLogin, (req, res) => {
    var ratingData = []
    var mediaData = []
    var mediaURL = ''
    var allLists = []

    const connection = makeDb();
    (async () => {
        try {
            const allListsQuery = await connection.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await connection.close();
        }
      })() 

    const db = makeDb();
    (async () => {
        try {
            const ratingQuery = await db.query(
                `
                select rating.*, tmdb_id, media_type, season_no, episode_no from rating, media where username='${active_username}' and media.media_id = rating.media_id
                `
                
            )    
            ratingData = ratingQuery 
            
            for (i = 0; i < ratingData.length; i++) {
                if (ratingData[i].media_type=="M") {    
                mediaURL = `https://api.themoviedb.org/3/movie/${ratingData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                }
                else if (ratingData[i].media_type=="T") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${ratingData[i].tmdb_id}?api_key=f5d0b40e98581b4563c21ee53a7209ee`
                } else if (ratingData[i].media_type=="E") {
                    mediaURL = `https://api.themoviedb.org/3/tv/${ratingData[i].tmdb_id}/season/${ratingData[i].season_no}/episode/${ratingData[i].episode_no}?api_key=f5d0b40e98581b4563c21ee53a7209ee&language=en-US`
                }
                
                await axios.get(mediaURL
                    , {
                headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
                }
                })
                .then((res) => {
                    mediaData.push(res.data)
                })
                .catch((error) => {
                console.error(error)
                })
            }
            
         } 
        catch {

        }
            
         
         finally {
          await db.close();
          res.render('ratings.ejs', {ratingData, mediaData, allLists, active_username})

        }
      })()  


})

app.post('/ratings/addMediaRating', requireLogin, (req, res) => {
    const {score, userName, tmdb_id, media_type, season_no, episode_no} = req.body
    var fromURL = req.header('Referer') || '/ratings'
    var media_id = ''

    const db = makeDb();
    (async () => {
        try {
             const insertMedia = await db.query(
                `
                insert into media(tmdb_id, media_type, episode_no, season_no)
                values ('${tmdb_id}','${media_type}', ${episode_no}, ${season_no});
                `
            )
    
            const insertRating = await db.query(
                `
                insert into rating(score, rating_date, media_id, username)
                values ('${score}',now(), last_insert_id(), '${active_username}');
                `
            )

         } 
         catch(error){

            console.error(error)
            }
         
         finally {
          await db.close();
          req.flash('success', 'Rating successfully added to addMediaRating.')
          res.redirect(fromURL)
        }
      })()  
})

app.post('/ratings/deleteMediaFromRating', requireLogin, (req, res) => {
    const {media_id} = req.body
    var fromURL = req.header('Referer') || '/lists'

    const db = makeDb();
    (async () => {
        try {
            const deleteFromMedia = await db.query(
                `
                delete from media
                where media_id = '${media_id}';
                `
            )
         } 
         catch {
         }
         
         finally {
          await db.close();
          req.flash('success', 'Media successfully deleted from rating page.')
          res.redirect(fromURL)
            
        }
      })()  
        
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
            req.flash('error', 'The username you entered already exists in the system.')

            console.log('user already exists')
            res.redirect('/register')
        }  else { 
        
        if (password == "") {
            req.flash('error', 'Password cannot be null')
            res.redirect('/register')


            console.log('password is null')
        } else if (password != confirmPassword) {
            req.flash('error', 'Password is not equal to Confirm Password')
            res.redirect('/register')


            console.log('password is not equal to confirm password')
        } else if (!regExp.test(password)) {
            req.flash('error', 'Password should be 8 characters long, should contain a number and special character.')
            console.log('password pattern not allowed')
            res.redirect('/register')

        } else {
        db.query(
            `INSERT INTO user (username, last_name, first_name,  pwd, login_status) 
            VALUES ('${userName}', '${lastName}', '${firstName}', '${password}', 1);`
        , function (error, results, fields) {
            if (error) throw error;
            console.log('New User Created')
            req.flash('success', 'New user successfully registered.')
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
    var allLists = []

    const db = makeDb();
    (async () => {
        try {
            const allListsQuery = await db.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await db.close();
        }
      })() 

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
    })
    .catch((error) => {
    console.error(error)
    })
    res.render('search.ejs', {searchData, allLists, active_username})
     
})

app.get('/tv/:tvID', async (req, res) => {
    const tvID = req.params.tvID
    var tvData = {}

    var allLists = []

    const db = makeDb();
    (async () => {
        try {
            const allListsQuery = await db.query(
                `
                SELECT *
                FROM list
                WHERE username = '${active_username}'
                `
                );

            allLists =  allListsQuery
         } finally {
          await db.close();
        }
      })() 

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
    res.render('tv.ejs', {tvData, allLists, active_username})
})

app.get('*', (req, res) => {
    req.flash('error', 'Page not found')
    res.redirect('/search')
})
