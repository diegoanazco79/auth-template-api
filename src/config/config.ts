export const config = {
  port: process.env.PORT,
  mongo_db_uri: process.env.DB_URI,
  jwt_secret: process.env.JWT_SECRET,
  google_gmail: {
    email: process.env.GOOGLE_GMAIL_EMAIL,
    password: process.env.GOOGLE_GMAIL_PASSWORD,
  },
  frontend_url: process.env.FRONTEND_URL,
};
