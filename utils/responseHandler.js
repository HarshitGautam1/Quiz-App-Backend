class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

const sendResponse = (res, statusCode, data, message) => {
    const response = new ApiResponse(statusCode, data, message);
    res.locals.message = message;
    return res.status(statusCode).json(response);
};

const successResponse = (res, data, message = "Operation successful") => {
    return sendResponse(res, 200, data, message);
};

const createdResponse = (res, data, message = "Resource created successfully") => {
    return sendResponse(res, 201, data, message);
};

const errorResponse = (res, statusCode = 500, message = "Internal server error", data = null) => {
    return sendResponse(res, statusCode, data, message);
};

const notFoundResponse = (res, message = "Resource not found") => {
    return errorResponse(res, 404, message);
};

const unauthorizedResponse = (res, message = "Unauthorized access") => {
    return errorResponse(res, 401, message);
};

const forbiddenResponse = (res, message = "Forbidden access") => {
    return errorResponse(res, 403, message);
};

const badRequestResponse = (res, message = "Bad request", data = null) => {
    return errorResponse(res, 400, message, data);
};

module.exports = {
    ApiResponse,
    sendResponse,
    successResponse,
    createdResponse,
    errorResponse,
    notFoundResponse,
    unauthorizedResponse,
    forbiddenResponse,
    badRequestResponse
}; 