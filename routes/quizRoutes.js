const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

const { auth } = require('../middleware/auth');

router.post('/', auth, quizController.createQuiz);              
router.get('/', quizController.getAllQuizzes);                
router.get('/:id', quizController.getQuizById);                
router.put('/:id', auth, quizController.updateQuiz);           
router.delete('/:id', auth, quizController.deleteQuiz);        

module.exports = router;
