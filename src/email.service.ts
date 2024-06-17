import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
  const templatePath = path.join(__dirname, "templates", "welcome-email.ejs");
  const templateData = { name };

  ejs.renderFile(templatePath, templateData, (err, data) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Welcome to Our Restaurant Service",
      html: data,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};
