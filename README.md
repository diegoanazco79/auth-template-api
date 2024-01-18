# Auth Template API

Auth Template REST API built with Node.js, Express, and MongoDB. This project provides a robust platform for managing user authentication through Google and conventional methods (email and password). Additionally, it includes essential features such as password recovery and the registration process, both with the ability to send emails for a complete and secure user experience.

Explore a live demo of the project [here](https://auth-template-topaz.vercel.app/login).

## Deployment on Vercel

This project is designed to be deployed on Vercel. Make sure to have an account on Vercel and follow the appropriate deployment steps.

## Environment Variables

Ensure to configure the following environment variables before running the backend:

- **PORT**: The port on which the server will run (e.g., 3001).

- **DB_URI**: MongoDB database URI. Make sure to replace the credentials with the correct ones.

- **JWT_SECRET**: Secret key for JWT token generation.

- **GOOGLE_GMAIL_EMAIL**: Gmail email address for sending emails (follow the instructions to obtain this information).

- **GOOGLE_GMAIL_PASSWORD**: Gmail account password for sending emails (follow the instructions to obtain this information).

- **FRONTEND_URL**: Associated frontend URL.

## Gmail Credentials Setup

To set up the necessary Gmail credentials for sending emails from your application, follow these steps:

1. Access your Google account:
   - Visit the Google account management page: [https://myaccount.google.com/](https://myaccount.google.com/).
   - Log in to the Google account associated with the Gmail address you want to use for programmatically sending emails.

2. Enable two-step verification:
   - In the left sidebar, click on "Security."
   - Scroll down to "How you sign in to Google" and click on "2-step verification."

3. Generate an app password:
   - Continuing from the two-step verification section, scroll down to "App passwords."
   - Click on "App passwords." You may be asked to re-enter your password for security reasons.

4. Set up a new app password:
   - In "App name," enter a custom name for this app password. Choose something related to the application or use case where you plan to use this app password.
   - Click on "Create." Google will generate a unique 16-character password for your custom application/device.

Make sure to use the generated email address as `GOOGLE_GMAIL_EMAIL` and the generated password as `GOOGLE_GMAIL_PASSWORD` in the environment variables of your backend application.

Note that this step is necessary only if you have enabled two-step verification on your Gmail account.

## Technologies Used

- [Express](https://expressjs.com/): Web framework for Node.js.

- [Nodemailer](https://nodemailer.com/): Library for sending emails from Node.js.

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs): Library for password hashing.

- [Cors](https://www.npmjs.com/package/cors): Middleware to enable CORS in Express.

- [Express Validator](https://express-validator.github.io/docs/): Middleware for data validation in Express.

- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implementation of JSON Web Tokens for authentication.

- [Mongoose](https://mongoosejs.com/): MongoDB modeling library for Node.js.

## Postman

A Postman [collection](https://drive.google.com/drive/folders/1oGSe5jOq1PPVV9x5kokKnhmajJijkC5i?usp=sharing) is provided, containing examples of HTTP requests to test the backend.

## Installation and Execution

To run the project, you need to have TypeScript and Nodemon installed globally.

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Configure environment variables according to the above instructions.
4. Run `nodemon src/index.ts` to start the backend server.

## Contributions

If you encounter any issues or have suggestions to improve the backend, feel free to create an issue or pull request!
