import express from 'express';
import { getGenres } from '../tmdb-api';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/:type', asyncHandler(async (req, res) => {   
    const genres = await getGenres(req.params.type);
    if (genres) {
        res.status(200).json(genres);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
export default router;