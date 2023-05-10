/* Development environment */
import dotenv from 'dotenv';
dotenv.config();

import config from './config';
import { sendEmail } from './utils';

const emailTo = ['test1@gmail.com', 'test2@gmail.com'];
const emailSubject = 'Prueba email desde NodeJS'

const emailTemplate = {
  text: 'Este es un correo de prueba.',
  html: `
    <h1>Este es un correo de prueba</h1>
    <p>¡Hola!</p>
    <p>Te envío dos imágenes y un archivo PDF adjunto:</p>
    <img src="cid:image1" alt="Imagen 1">
    <img src="cid:image2" alt="Imagen 2">
  `
}

const emailAttachments = [
  {
    filename: 'image1.png',
    path: config.filesFolder + 'image1.png',
    cid: 'image1'
  },
  {
    filename: 'image2.png',
    path: config.filesFolder + 'image2.png',
    cid: 'image2'
  },
  {
    filename: 'document.pdf',
    path: config.filesFolder + 'Nest-cheatsheet.pdf'
  }
];

sendEmail(emailTo, emailSubject, emailTemplate, emailAttachments);