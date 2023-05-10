import { createTransport } from 'nodemailer';

import config from '../config';

interface EmailTemplate {
  html: string;
  text: string;
}

interface Attachment {
  filename: string;
  path: string;
  cid?: string;
}

export const sendEmail = (
  to: string[] | string,
  subject: string,
  template: EmailTemplate,
  attachments?: Attachment[]
) => {
  const transporter = createTransport({
    host: config.emailServer,
    port: parseInt(config.emailPort),
    secure: true,
    auth: {
      user: config.emailSender,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailSender,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject: subject,
    text: template.text,
    attachments: attachments || [],
    html: template.html,
    alternatives: [
      {
        contentType: 'text/plain',
        content: template.text
      },
      {
        contentType: 'text/html',
        content: template.html,
        related: attachments?.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.path,
          cid: attachment.cid
        }))
      }
    ],
  }

  transporter.sendMail(mailOptions)
    .then(_info => {
      console.log('The email has been sent');
    })
    .catch(error => {
      console.log('Email could not be sent:', error.message);
    });
}