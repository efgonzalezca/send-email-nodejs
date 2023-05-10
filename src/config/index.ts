import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  emailPort: process.env.EMAIL_PORT || '465',
  emailServer: process.env.EMAIL_SERVER || 'smtp.gmail.com',
  emailSender: process.env.EMAIL_SENDER || 'test@test.com',
  emailPassword: process.env.EMAIL_PASSWORD || 'gdfdgbvcswrfg',
  filesFolder: process.env.FILES_FOLDER || `${ __dirname }/../../files`
}