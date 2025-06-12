const Question = require('../models/Question');
const {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse
} = require('../utils/responseHandler');

exports.addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return createdResponse(res, question, "Question added successfully");
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.quizId });
    return successResponse(res, questions);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return notFoundResponse(res);
    return successResponse(res, question);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return notFoundResponse(res);
    return successResponse(res, updated, "Question updated successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return notFoundResponse(res);
    return successResponse(res, null, "Question deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
