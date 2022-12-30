import express from 'express';
import { getSearch } from '../tmdb-api';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/:searchText/:page/:type', asyncHandler( async(req, res) => {
    const searchQ = await getSearch(req.params.searchText, req.params.page, req.params.type);
    if (searchQ) {
        res.status(200).json(searchQ);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;