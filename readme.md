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

{
   "adult":false,
   "backdrop_path":"/fzL28DKiE1ZBEZbzfb3Wohmo9Bl.jpg",
   "belongs_to_collection":{
      "id":63043,
      "name":"TRON Collection",
      "poster_path":"/cvFlDIfOwhYe4ouAAfdyq9E5zlZ.jpg",
      "backdrop_path":"/o8NBfffQPE9tHTR9l7FuWbdVPHu.jpg"
   },
   "budget":170000000,
   "genres":[
      {
         "id":12,
         "name":"Adventure"
      },
      {
         "id":28,
         "name":"Action"
      },
      {
         "id":878,
         "name":"Science Fiction"
      }
   ],
   "homepage":"http://disney.go.com/tron/",
   "id":20526,
   "imdb_id":"tt1104001",
   "original_language":"en",
   "original_title":"TRON: Legacy",
   "overview":"Sam Flynn, the tech-savvy and daring son of Kevin Flynn, investigates his father's disappearance and is pulled into The Grid. With the help of a mysterious program named Quorra, Sam quests to stop evil dictator Clu from crossing into the real world.",
   "popularity":29.371,
   "poster_path":"/vuifSABRpSnxCAOxEnWpNbZSXpp.jpg",
   "production_companies":[
      {
         "id":76043,
         "logo_path":"/9RO2vbQ67otPrBLXCaC8UMp3Qat.png",
         "name":"Revolution Sun Studios",
         "origin_country":"US"
      },
      {
         "id":2,
         "logo_path":"/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
         "name":"Walt Disney Pictures",
         "origin_country":"US"
      },
      {
         "id":7161,
         "logo_path":null,
         "name":"LivePlanet",
         "origin_country":""
      },
      {
         "id":18713,
         "logo_path":null,
         "name":"Prana Studios",
         "origin_country":""
      },
      {
         "id":23791,
         "logo_path":null,
         "name":"Sean Bailey Productions",
         "origin_country":""
      },
      {
         "id":76067,
         "logo_path":null,
         "name":"Kontsept Film Company",
         "origin_country":""
      }
   ],
   "production_countries":[
      {
         "iso_3166_1":"US",
         "name":"United States of America"
      }
   ],
   "release_date":"2010-12-15",
   "revenue":400062763,
   "runtime":125,
   "spoken_languages":[
      {
         "english_name":"English",
         "iso_639_1":"en",
         "name":"English"
      }
   ],
   "status":"Released",
   "tagline":"The Game Has Changed.",
   "title":"TRON: Legacy",
   "video":false,
   "vote_average":6.4,
   "vote_count":5458
}
==========

{
  backdrop_path: '/edmk8xjGBsYVIf4QtLY9WMaMcXZ.jpg',
  created_by: [
    {
      id: 25539,
      credit_id: '5256cf6c19c2956ff609bd8e',
      name: 'Shonda Rhimes',
      gender: 1,
      profile_path: '/pIQbVxfjNwZ0DaAjo3q107nng1b.jpg'
    }
  ],
  episode_run_time: [ 43 ],
  first_air_date: '2005-03-27',
  genres: [ { id: 18, name: 'Drama' } ],
  homepage: 'http://abc.go.com/shows/greys-anatomy',
  id: 1416,
  in_production: true,
  languages: [ 'en' ],
  last_air_date: '2021-03-18',
  last_episode_to_air: {
    air_date: '2021-03-18',
    episode_number: 8,
    id: 2781269,
    name: "It's All Too Much",
    overview: 'As traumas and pressure mount, Grey Sloan doctors try to find a path forward, and Richard questions his faith. Meanwhile, Maggie gives Winston hospital privileges and they work together to treat an uneasy patient. Jo, Link and Jackson play an unconventional drinking game.',
    production_code: '',
    season_number: 17,
    still_path: '/tU8yRXw0VUD63BJMs4EeiXSc7bk.jpg',
    vote_average: 0,
    vote_count: 0
  },
  name: "Grey's Anatomy",
  next_episode_to_air: {
    air_date: '2021-03-25',
    episode_number: 9,
    id: 2803206,
    name: 'In My Life',
    overview: '',
    production_code: '',
    season_number: 17,
    still_path: null,
    vote_average: 0,
    vote_count: 0
  },
  networks: [
    {
      name: 'ABC',
      id: 2,
      logo_path: '/ndAvF4JLsliGreX87jAc9GdjmJY.png',
      origin_country: 'US'
    }
  ],
  number_of_episodes: 371,
  number_of_seasons: 17,
  origin_country: [ 'US' ],
  original_language: 'en',
  original_name: "Grey's Anatomy",
  overview: 'Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.',
  popularity: 985.03,
  poster_path: '/clnyhPqj1SNgpAdeSS6a6fwE6Bo.jpg',
  production_companies: [
    {
      id: 1557,
      logo_path: '/ccz9bqCu3jSFKbPFnfWmjAKZLBL.png',
      name: 'The Mark Gordon Company',
      origin_country: 'US'
    },
    {
      id: 34209,
      logo_path: '/chuOOQxixQL4fa9LBcIEbuh1S5G.png',
      name: 'ShondaLand',
      origin_country: 'US'
    },
    {
      id: 19366,
      logo_path: '/vOH8dyQhLK01pg5fYkgiS31jlFm.png',
      name: 'ABC Studios',
      origin_country: 'US'
    },
    {
      id: 1558,
      logo_path: '/wwaKUcOENHix2jxLfFBfNkCtOEQ.png',
      name: 'Touchstone Television',
      origin_country: 'US'
    }
  ],
  production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  seasons: [
    {
      air_date: '2006-01-08',
      episode_count: 5,
      id: 3722,
      name: 'Specials',
      overview: '',
      poster_path: '/97hftic9L28LO57fV5g7PPivysK.jpg',
      season_number: 0
    },
    {
      air_date: '2005-03-27',
      episode_count: 9,
      id: 3718,
      name: 'Season 1',
      overview: `The first season of the American television medical drama Grey's Anatomy, began airing in the United States on the American Broadcasting Company on March 27, 2005 and concluded on May 22, 2005. The first season introduces the main character, Meredith Grey, as she enrolls in Seattle Grace Hospital's internship program and faces unexpected challenges and surprises. Season one had nine series regulars, six of whom have been part of the main cast ever since. The season initially served as a mid-season replacement for the legal drama Boston Legal, airing in the Sunday night time slot at 10:00, after Desperate Housewives. Although no clip shows have been produced for this season, the events that occur are recapped in "Straight to Heart", a clip-show which aired one week before the winter holiday hiatus of the second season ended. The season was officially released on DVD as two-disc Region 1 box set under the title of Grey's Anatomy: Season One on February 14, 2006 by Buena Vista Home Entertainment.\n` +
        '\n' +
        `The season's reviews and critiques were generally positive, and the series received several awards and nominations for the cast and crew. The first five episodes of the second season were conceived, written and shot to air as the final five episodes of the first season, but aired during the 2005-2006 season due to the high number of viewers that watched "Who's Zoomin' Who?", the season's highest-rated episode with 22.22 million viewers tuning in.`,
      poster_path: '/ulGju8GyXE36wCgmvyFJL3sLiVm.jpg',
      season_number: 1
    },
    {
      air_date: '2005-09-25',
      episode_count: 27,
      id: 3719,
      name: 'Season 2',
      overview: "The second season of the American television medical drama Grey's Anatomy commenced airing on the American Broadcasting Company on September 25, 2005, and concluded on May 15, 2006. The season was produced by Touchstone Television, in association with Shondaland production company and The Mark Gordon Company, the showrunner being Shonda Rhimes. Actors Ellen Pompeo, Sandra Oh, Katherine Heigl, Justin Chambers, and T.R. Knight reprised their roles as surgical interns Meredith Grey, Cristina Yang, Izzie Stevens, Alex Karev, and George O'Malley, respectively. Previous main cast members Chandra Wilson, James Pickens, Jr., Isaiah Washington, and Patrick Dempsey also returned, while Kate Walsh, who began the season in a recurring capacity, was promoted to series regular status, after appearing in seven episodes as a guest star.\n" +
        '\n' +
        "The season continued to focus on the surgical residency of five young interns as they try to balance to the challenges of their competitive careers, with the difficulties that determine their personal lives. It was set in the fictional Seattle Grace Hospital, located in the city of Seattle, Washington. Whereas the first season put the emphasis mainly on the unexpected impact the surgical field has on the main characters, the second one provides a detailed perspective on the personal background of each character, focusing on the consequences that their decisions have on their careers. Throughout the season, new story lines were introduced, including the love triangle between Meredith Grey, Derek Shepherd, and Addison Montgomery, the main arc of the season. Also heavily developed was the story line involving Izzie Stevens' relationship with patient Denny Duquette, which resulted in critical acclaim and positive fan response.",
      poster_path: '/bO0S3fU8Tcqn0g5DCmDcX1oqA2t.jpg',
      season_number: 2
    },
    {
      air_date: '2006-09-21',
      episode_count: 25,
      id: 3715,
      name: 'Season 3',
      overview: "The third season of the American television medical drama Grey's Anatomy, commenced airing on the American Broadcasting Company on September 21, 2006, and concluded on May 17, 2007. The season was produced by Touchstone Television, in association with Shondaland Production Company and The Mark Gordon Company, the showrunner being Shonda Rhimes. Actors Ellen Pompeo, Sandra Oh, Katherine Heigl, Justin Chambers, and T.R. Knight reprised their roles as surgical interns Meredith Grey, Cristina Yang, Izzie Stevens, Alex Karev, and George O'Malley, respectively, continuing their expansive storylines as focal points throughout the season. Previous main cast members Chandra Wilson, James Pickens, Jr., Kate Walsh, Isaiah Washington, and Patrick Dempsey also returned, while previous guest stars Sara Ramirez and Eric Dane were promoted to series regulars, following the extension of their contracts.\n" +
        '\n' +
        "The season followed the continuation of the surgical residency of five young interns, as they experience the demands of the competitive field of medicine, which becomes defining in their personal evolution. Although set in fictional Seattle Grace Hospital, located in Seattle, Washington, filming primarily occurred in Los Angeles, California. Whereas the first season mainly focused on the impact the surgical field has on the main characters, and the second one provided a detailed perspective on the physicians' private lives, the third season deals with the tough challenges brought by the last phase of the surgeons' internship, combining the professional motif emphasized in the first season, with the complex personal background used in the second. Through the season, several new storylines are introduced, including the arrival of Dane's character, Dr. Mark Sloan, conceived and introduced as an antagonizing presence.",
      poster_path: '/aY7NuvFj5Uzliy0nrFxVWmlZFiK.jpg',
      season_number: 3
    },
    {
      air_date: '2007-09-27',
      episode_count: 17,
      id: 3716,
      name: 'Season 4',
      overview: "The fourth season of the American television medical drama Grey's Anatomy, commenced airing in the United States on September 27, 2007 and concluded on May 22, 2008. The season continues the story of a group of surgeons and their mentors in the fictional Seattle Grace Hospital, describing their professional lives and the way they affect the personal background of each character. Season four had twelve series regulars with ten of them returning from the previous season, out of which eight are part of the original cast from the first season. The season aired in the Thursday night timeslot at 9:00 EST. In addition to the regular seventeen episodes, a clip-show narrated by the editors of People recapped previous events of the show and made the transition from Grey's Anatomy to Private Practice, a spin-off focusing of Dr. Addison Montgomery and aired on September 19, 2007, before the season premiere. The season was officially released on DVD as a five-disc boxset under the title of Grey's Anatomy: Season Four – Expanded on September 9, 2008 by Buena Vista Home Entertainment.\n" +
        '\n' +
        "For the first time in the show's history, many cast changes occur, seeing the first departure of two main cast members. The season received mixed response from critics and fans, resulting in several awards and nominations for the cast members and the production team. Show creator Shonda Rhimes heavily contributed to the production of the season, writing five out of the seventeen episodes. The highest-rated episode was the season premiere, which was watched by 20.93 million viewers. The season was interrupted by the 2007–2008 Writers Guild of America strike, which resulted in the production of only seventeen episodes, instead of twenty-three originally planned.",
      poster_path: '/xoBWd6WNcQKoxfYzcwWRZUiFGtx.jpg',
      season_number: 4
    },
    {
      air_date: '2008-09-25',
      episode_count: 24,
      id: 3717,
      name: 'Season 5',
      overview: "The fifth season of the American television medical drama Grey's Anatomy, created by Shonda Rhimes, commenced airing on American Broadcasting Company in the United States on September 25, 2008 and concluded on May 14, 2009 with twenty-four aired episodes. The season follows the story of a group of surgeons as they go through their residency, while they also deal with the personal challenges and relationships with their mentors. Season five had thirteen series regulars with twelve of them returning from the previous season. The season aired in the Thursday night timeslot at 9:00 pm. The season was officially released on DVD as seven-disc boxset under the title of Grey's Anatomy: The Complete Fifth Season – More Moments on September 9, 2009 by Buena Vista Home Entertainment.",
      poster_path: '/bnOS0AKjbfPY1xVqF80qk0iBQBX.jpg',
      season_number: 5
    },
    {
      air_date: '2009-09-24',
      episode_count: 24,
      id: 3720,
      name: 'Season 6',
      overview: "The sixth season of the American television medical drama Grey's Anatomy, commenced airing on the American Broadcasting Company in the United States on September 24, 2009, and concluded on May 20, 2010. The season was produced by ABC Studios, in association with Shondaland Production Company and The Mark Gordon Company; the showrunner being Shonda Rhimes. Actors Ellen Pompeo, Sandra Oh, Katherine Heigl, and Justin Chambers reprised their roles as surgical residents Meredith Grey, Cristina Yang, Izzie Stevens, and Alex Karev, respectively. Heigl was released from her contract in the middle of the season, while T.R. Knight did not appear as George O'Malley, because Knight was released from his contract at the conclusion of season five. Main cast members Patrick Dempsey, Chandra Wilson, James Pickens, Jr., Sara Ramirez, Eric Dane, Chyler Leigh, and Kevin McKidd also returned, while previous recurring star Jessica Capshaw was promoted to a series regular, and Kim Raver was given star billing after the commencement of the season.\n" +
        '\n' +
        "The season follows the story of surgical interns, residents and their competent mentors, as they experience the difficulties of the competitive careers they have chosen. It is set in the surgical wing of the fictional Seattle Grace Hospital, located in Seattle, Washington. A major storyline of the season is the characters adapting to change, as their beloved co-worker Stevens departed following the breakdown of her marriage, O'Malley died in the season premiere—following his being dragged by a bus, and new cardiothoracic surgeon Teddy Altman is given employment at the hospital. Further storylines include Shepherd being promoted to chief of surgery, Seattle Grace Hospital merging with the neighboring Mercy West —introducing several new doctors, and several physicians lives being placed into danger—when a grieving deceased patient's husband embarks on a shooting spree at the hospital, seeking revenge for his wife's death.",
      poster_path: '/vCiJa2YfzOWhhfKCXNZWFVhYulE.jpg',
      season_number: 6
    },
    {
      air_date: '2010-09-23',
      episode_count: 22,
      id: 3721,
      name: 'Season 7',
      overview: "The seventh season of the American television medical drama Grey's Anatomy, commenced airing on September 23, 2010 on the American Broadcasting Company, and concluded on May 19, 2011 ending the season with a total of 22 episodes. The season was produced by ABC Studios, in association with Shondaland Production Company and The Mark Gordon Company; the showrunner being Shonda Rhimes.",
      poster_path: '/wmGUedMQJkmSZFYJA35AKPrHsGJ.jpg',
      season_number: 7
    },
    {
      air_date: '2011-09-22',
      episode_count: 24,
      id: 3723,
      name: 'Season 8',
      overview: "The eighth season of the American television medical drama Grey's Anatomy, commenced airing on the American Broadcasting Company on September 22, 2011, with a special two-hour episode and ended on May 17, 2012 with the eighth season having a total of 24 episodes. The season was produced by ABC Studios, in association with Shondaland Production Company and The Mark Gordon Company; the showrunner being Shonda Rhimes.",
      poster_path: '/pvuMQwMPWDqunRiajmeGQmUF0zS.jpg',
      season_number: 8
    },
    {
      air_date: '2012-09-27',
      episode_count: 24,
      id: 3724,
      name: 'Season 9',
      overview: '',
      poster_path: '/gLP8aeWDfoOIqp1EFEMLSoHlIHW.jpg',
      season_number: 9
    },
    {
      air_date: '2013-09-26',
      episode_count: 24,
      id: 3725,
      name: 'Season 10',
      overview: '',
      poster_path: '/h0z0USK1KerDJu02c218zFMIa52.jpg',
      season_number: 10
    },
    {
      air_date: '2014-09-25',
      episode_count: 24,
      id: 62051,
      name: 'Season 11',
      overview: `During an interview, Shonda Rhimes stated that "Season 11 is really a Meredith-centric season. She lost her ‘person’, her half-sister has shown up, her husband is chafing to go someplace else…” She went on to reveal that she's been wanting to do the "familial grenade" storyline for a long time, and at the end of Season 10, she knew it was the time to do it. Rhimes also claimed that Season 11 will pick up right where Season 10 left us, so there won't be much that the audience won't see. In another interview discussing this storyline, Rhimes revealed that she and the writers are thinking about doing flashback periods to the younger days of Drs. Ellis Grey and Richard Webber.`,
      poster_path: '/AvMxKxyj6zIG5fR0fg7D6bWH4AY.jpg',
      season_number: 11
    },
    {
      air_date: '2015-09-24',
      episode_count: 24,
      id: 70494,
      name: 'Season 12',
      overview: '',
      poster_path: '/b8pkzoNM5X0XSwppEA7jTID5Dcm.jpg',
      season_number: 12
    },
    {
      air_date: '2016-09-22',
      episode_count: 24,
      id: 79174,
      name: 'Season 13',
      overview: '',
      poster_path: '/i4gNHaY1MzP50zcjgw3ew2hKCCW.jpg',
      season_number: 13
    },
    {
      air_date: '2017-09-28',
      episode_count: 24,
      id: 92088,
      name: 'Season 14',
      overview: '',
      poster_path: '/2eSQFbeZZ7lCru40Q0UYGJ20itx.jpg',
      season_number: 14
    },
    {
      air_date: '2018-09-27',
      episode_count: 25,
      id: 108798,
      name: 'Season 15',
      overview: '',
      poster_path: '/eqgIOObafPJitt8JNh1LuO2fvqu.jpg',
      season_number: 15
    },
    {
      air_date: '2019-09-26',
      episode_count: 21,
      id: 129348,
      name: 'Season 16',
      overview: '',
      poster_path: '/eDIfEk8dHysaea0ICkKtLUc3xro.jpg',
      season_number: 16
    },
    {
      air_date: '2020-11-12',
      episode_count: 9,
      id: 163320,
      name: 'Season 17',
      overview: '',
      poster_path: '/1Dk9X7QNMf2yp6UhFEYiuvvKVmP.jpg',
      season_number: 17
    }
  ],
  spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
  status: 'Returning Series',
  tagline: 'The life you save may be your own.',
  type: 'Scripted',
  vote_average: 8.2,
  vote_count: 5549
}