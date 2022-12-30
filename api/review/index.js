import express from 'express';
import AddReview from './reviewModel';

import asyncHandler from 'express-async-handler';



const router = express.Router(); 

//Get a movie review from mongodb
router.get('/:id/reviews', asyncHandler(async (req, res) => {

    const movieid = parseInt(req.params.id);
    const movieReviews = await AddReview.find({movieid: movieid});

    if(movieid){
        res.status(200).json(movieReviews); 
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }

}));

//Post a movie review
router.post('/:username/reviews/:movieid',asyncHandler( async  (req, res) => {

    if (!req.body.review) {
        res.status(401).json({success: false, msg: 'Please write a review.'});
        return next();
      }
      if (req.query.action === 'addreview') {

          req.body.created_at = new Date();
          req.body.updated_at = new Date();

        await AddReview.create(req.body);


        res.status(201).json({code: 201, msg: `Successful created new review by ${req.body.author}.`});

      } else {
          res.status(404).json({
              message: 'The resource you requested could not be found.',
              status_code: 404
            });
         } 
    }));


export default router;