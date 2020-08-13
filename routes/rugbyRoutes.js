const express = require('express');
const teamController = require('./../controllers/rugbyController');

const router = express.Router();

router.param('id', teamController.checkID);

router
  .route('/')
  .get(teamController.getAllteams)
  .post(teamController.checkBody, teamController.createteam);

router
  .route('/:id')
  .get(teamController.getteam)
  .patch(teamController.updateteam)
  .delete(teamController.deleteteam);

module.exports = router;
