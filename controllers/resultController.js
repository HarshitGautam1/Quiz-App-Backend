const Result = require('../models/Result');
const Question = require('../models/Question');
const {
  successResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHandler');

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const { quizId } = req.params;

    const questions = await Question.find({ quiz: quizId });
    if (!questions.length) return notFoundResponse(res, 'No questions found for this quiz');

    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const result = await Result.create({
      user: req.user._id,
      quiz: quizId,
      score,
      totalQuestions: questions.length,
    });

    return successResponse(res, {
      score,
      totalQuestions: questions.length,
      resultId: result._id
    }, "Quiz submitted successfully");

  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id }).populate('quiz', 'title');
    return successResponse(res, results);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const results = await Result.find({ quiz: req.params.quizId }).populate('user', 'name email');
    return successResponse(res, results);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
