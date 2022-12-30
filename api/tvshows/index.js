import express from 'express';
import { getTVShows, getTVShow, getTvShowSimilar} from '../tmdb-api';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/page/:pageNumber', asyncHandler(async (req, res) => {   
    const tvshows = await getTVShows(req.params.pageNumber);
    if (tvshows) {
        res.status(200).json(tvshows);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id', asyncHandler(async (req, res) => {   
    const tvshow = await getTVShow(req.params.id);
    if (tvshow) {
        res.status(200).json(tvshow);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
router.get('/similar/:id', asyncHandler(async (req, res) => {   
    const tvshowsimilar = await getTvShowSimilar(req.params.id);
    if (tvshowsimilar) {
        res.status(200).json(tvshowsimilar);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;

