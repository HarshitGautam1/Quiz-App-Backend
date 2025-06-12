const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

const { auth } = require('../middleware/auth');

router.post('/', auth, questionController.addQuestion);                      
router.get('/:quizId', questionController.getQuestionsByQuiz);         
router.put('/:id', auth, questionController.updateQuestion);                
router.delete('/:id', auth, questionController.deleteQuestion);            

module.exports = router;
