const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHandler');

exports.createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;
    const quiz = await Quiz.create({ title, description, createdBy: req.user._id });
    return createdResponse(res, quiz, "Quiz created successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'name');
    return successResponse(res, quizzes);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return notFoundResponse(res);

    const questions = await Question.find({ quiz: quiz._id });
    return successResponse(res, { quiz, questions });
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return notFoundResponse(res);
    return successResponse(res, updated, "Quiz updated successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const deleted = await Quiz.findByIdAndDelete(req.params.id);
    if (!deleted) return notFoundResponse(res);
    await Question.deleteMany({ quiz: req.params.id });
    return successResponse(res, null, "Quiz and related questions deleted");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};