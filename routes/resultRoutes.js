const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

const { auth, adminAuth } = require('../middleware/auth');

router.post('/:quizId', auth, resultController.submitQuiz);            
router.get('/', auth, resultController.getMyResults);      
router.get('/quiz-results', auth, resultController.getMyQuizResults);       
router.get('/:quizId', auth, adminAuth, resultController.getQuizResults); 
module.exports = router;
