const router = require('express').Router();

const Revs = require('../helpers/reviews-model.js');

const { validateReviewId } = require('../middleware/index.js');

//************* GET ALL REVIEWS ***************//
router.get('/', (req, res) => {
  Revs.findReviews()
    .then(reviews => {
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting all reviews.'
      });
    });
});
//************* GET ALL REVIEWS BY FILTER ***************//
router.get('/filter', (req, res) => {
  const filter = req.params.filter;

  Revs.findReviewsBy(filter)
    .then(reviews => {
      console.log(reviews);
      res.json(reviews);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error getting a company by a filter.'
      });
    });
});


//************* GET A SINGLE REVIEW BY ID ***************//

router.get('/:revId', validateReviewId, (req, res) => {
  res.status(200).json(res.locals.review);
});


/**************************************************************************/


module.exports = router;
