class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Call the constructor of the parent class (Error)
    super(message);
   

    // Set the custom properties
    this.statusCode = statusCode;

    // Ensure the error message is correctly set
    this.message = message;

    this.status = statusCode >= 400 && statusCode <500 ? 'operational fail' : 'error'

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
