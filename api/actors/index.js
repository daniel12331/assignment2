import express from 'express';
import { getActors, getActor, getActorCredits } from '../tmdb-api';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/page/:pageNumber', asyncHandler( async(req, res) => {
    const actors = await getActors(req.params.pageNumber);
    if (actors) {
        res.status(200).json(actors);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id', asyncHandler(async (req, res) => {   
    const actor = await getActor(req.params.id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/credits/:id', asyncHandler(async (req, res) => {   
    const actor = await getActorCredits(req.params.id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;