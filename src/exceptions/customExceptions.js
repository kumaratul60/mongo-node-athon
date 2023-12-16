class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.message = this.constructor.message;

        if (typeof Error.captureStackTrace === 'function' || Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

try {
    // code block
} catch (error) {
    throw new CustomError("custom error message", error);
}


///2

class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.message = this.constructor.message;
        Error.captureStackTrace(this, this.constructor);
    }
}

//3
class CustomError extends Error {
    constructor(statusCode, message, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}

const customError = new CustomError(404, 'Resource not found', { reason: 'ID not found' });



// use:
// 1.
try {
    // Your code that might throw an error
    throw new CustomError(404, 'Resource not found');
} catch (error) {
    // Handle the custom error
    console.error(`${error.statusCode}: ${error.message}`);
}

//2
const condition = true; // Your condition

if (condition) {
    // Trigger the custom error
    const error = new CustomError(400, 'Bad Request');
    console.error(`${error.statusCode}: ${error.message}`);
} else {
    // Continue with the rest of your logic
}

//3
const someAsyncFunction = async () => {
    return new Promise((resolve, reject) => {
        // Simulate an error
        reject(new CustomError(500, 'Internal Server Error'));
    });
};

someAsyncFunction()
    .catch((error) => {
        // Handle the custom error
        console.error(`${error.statusCode}: ${error.message}`);
    });


//4
app.get('/example', (req, res) => {
    try {
        // Your code that might throw an error
        throw new CustomError(404, 'Resource not found');
    } catch (error) {
        // Send the custom error in the response
        res.status(error.statusCode).json({ error: error.message });
    }
});