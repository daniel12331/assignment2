import express from 'express';
import { movies, movieReviews, movieDetails } from './moviesData';
import uniqid from 'uniqid'
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies, getDiscoverMovies, getMovie, getMovieImages, getMovieReviews} from '../tmdb-api';


const router = express.Router(); 

//get upcoming movies from tmdb
router.get('/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
  }));

//getting discover movies from tmdb
router.get('/discover', asyncHandler( async(req, res) => {
    const discoverMovies = await getDiscoverMovies();
    res.status(200).json(discoverMovies);
  }));

// Get movie details based on id from tmdb
router.get('/:id', asyncHandler(async (req, res) => {   
    const movie = await getMovie(req.params.id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie detail images based on id from tmdb
router.get('/:id/images', asyncHandler(async (req, res) => {   
    const movie = await getMovieImages(req.params.id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews based on movie id from tmdb
router.get('/reviews/:id', asyncHandler(async(req, res) => {
    const movieReviews = await getMovieReviews(req.params.id);
    if (movieReviews) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.',status_code: 404});
    }
}));

export default router;