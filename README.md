# Assignment 2 - Agile Software Practice.
​
Name: Daniel Marko
​
## API endpoints.

+ GET api/users/ - Gets Users
+ POST api/users/ - Log in/ Register User
+ PUT api/users/:id - Updates User
------------------------------------------------------------------------------------------------------------------
+ POST api/add/:username/favourites - (Auth) Adds a favourite movie object to user nested array
+ GET api/users/:userName/favourites - (Auth) Gets all user nested favourites.
+ DELETE api/users/:userName/delete/favourties - (Auth) Deletes the nested favourite based on username.
------------------------------------------------------------------------------------------------------------------
+ GET api/actor/page/:pageNumber - (Auth)Gets Actors based on pagenumber
+ GET api/actor/:id - (Auth) Gets the actor details
+ GET api/actor/credits/:id - (Auth) Gets the actors credtis
------------------------------------------------------------------------------------------------------------------
+ GET api/movies/upcoming - (Auth) Gets list of upcoming movies
+ GET api/movies/discover - (Auth) Gets a list of discover movies
+ GET api/movies/:id - (Auth) Gets the movie details
+ GET api/movies/:id/images - (Auth) Gets movie images
+ GET api/movies/review/:id - (Auth) Gets movie reviews
------------------------------------------------------------------------------------------------------------------
+ GET api/genres/:type - (Auth) Gets movie and tv genres
------------------------------------------------------------------------------------------------------------------
+ GET api/addreviews/:id/reviews - (Auth) Gets a reviews based on movie id
+ POST api/addreviews/:username/reviews/:movieid - (Auth) - Add a review to the selection of movie id.
------------------------------------------------------------------------------------------------------------------
+ GET api/search/:searchtext/:page/:type - (Auth) Gets a movies/tvshows/actors based on search query.
------------------------------------------------------------------------------------------------------------------
+ GET api/tvshows/page/:pagenumber - (Auth) Gets a list of tvshows based on pagenumber
+ GET api/tvshows/:id - (Auth) Gets the tvshow details
+ GET api/tvshows/similar/:id - (Auth) Gets the list of similar tvshows based on id

## Test cases.
~~~
​ Users endpoint
    POST /api/users/add/:userName/favourites
      √ should return the success of adding a favourite and confirm the user who added the favourite (70ms)
    Get /api/users/:userName/favourites
      √ should return the success of getting favourites and checks for favourite added by the previous test
    DELETE /api/users/:userName/delete/favourites
      √ should return the 201 and successfully delete the previous favourite added (65ms)

  Movies endpoint
    GET /api/movies/discover
      √ should return a 200 status and a bearer token (217ms)
      √ should return 20 discover movies and a status 200 (313ms)
    GET /api/movies/:id 
      √ should return the title of the movie and a status 200 (173ms)
    GET /api/movies/reviews/:id 
      √ should make sure reviews are being returned and a status 200 (185ms)
    GET /api/movies/discover - UnAuth Test
      √ should return 401 Unauthorized

  Actors endpoint
    GET /api/actor/page/:pageNumber
      √ should return a 200 status and a bearer token (305ms)
      √ should return 20 actors and a status 200 (188ms)
    GET /api/actor/:id 
      √ should get Chris Pine the actor and a status 200 (188ms)
    GET /api/actor/credits/:id 
      √ get Chris Pines credits (Blind Dating) and a status 200 (203ms)
    GET /api/actor/page/:pageNumber - UnAuth Test
      √ should return 401 Unauthorized

  Genres endpoint
    GET /api/genres/:movies
      √ should return a 200 status and a bearer token (207ms)
      √ should return all the movie genres and a status 200 (169ms)
    GET /api/genres/:tv
      √ should return all the tvshow genres and a status 200 (184ms)
    GET /api/genres/:type - UnAuth Test
      √ should return 401 Unauthorized

  Reviews endpoint
    POST /api/addreview/:username/reviews/:movieid
      √ should return a 200 status and a bearer token (216ms)
      √ should return a 201 status and the user who created the review (108ms)
    GET /api/addreview/:movieid/reviews 
      √ should return the review and rating made from the previous test (40ms)
    GET /api/addreview/:movieid/reviews - UnAuth Test
      √ should return 401 Unauthorized

  TVShows endpoint
    GET /api/tvshow/page/:pageNumber
      √ should return a 200 status and a bearer token (217ms)
      √ should return 20 tvshows and a status 200 (189ms)
    GET /api/tvshow/:id 
      √ should get Wednesday the tvshow and a status 200 (175ms)
    GET /api/tvshow/similar/:id 
      √ get similar tv shows to wednesday called Bewitched and a status 200 (181ms)
    GET /api/tvshows/page/:pagenumber - UnAuth Test
      √ should return 401 Unauthorized

  Search endpoint
    GET /api/search/:searchText/:page/:movie
      √ should return a 200 status and a bearer token (217ms)
      √ should return 20 movies, the first movie title being Hugo and a status 200 (206ms)
    GET /api/search/:searchText/:page/:tv
      √ should return 4 tvshows, the first tvshow title being Spongebob and a status 200 (195ms)
    GET /api/search/:searchText/:page/:person 
      √ should return 1 actor, the first actor name being Brad pitt and a status 200 (195ms)
    GET /api/search/:searchText/:page/:movie - UnAuth Test
      √ should return 401 Unauthorized
~~~
## Independent Learning (if relevant)
+ [Vercel Deployed]( https://vercel-agile-61c127c7m-daniel12331.vercel.app )
+ [Vercel Github]( https://github.com/daniel12331/vercel-agile )
------------------------------------------------------------------------------------------------------------------
I had a issue with vercel when I first successfully deployed my app, I was not able to call the endpoint and was only giving a result `The serverless function has crashed`
apparently this isnt a vercel issue and the solution was to tell the server how the application works with vercel.json.

[Vercel Refernce](https://www.youtube.com/watch?v=C1Sf_ntbqZQ)

