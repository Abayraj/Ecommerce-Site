class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    /**
       * 
Error.captureStackTrace(this, this.constructor) 
captures the stack trace for the ErrorHandler instance. so what is stack trace
A stack trace is a detailed report of the sequence of function calls that leads to an error or an exception being thrown in a program.
 It provides information about the execution flow of the program, including the sequence of function calls, the files in which those functions are defined, 
 and the line numbers within those files where the calls occurred.
       * 
       */
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
