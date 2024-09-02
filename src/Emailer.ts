import * as nodemailer from "nodemailer";
import env from "./env";

class Emailer {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_SERVER,
      port: env.SMTP_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  public async sendEmail(email: Email) {
    return this.transporter.sendMail(email.build());
  }
}

class Email {
  private subject: string = "No Subject";
  private to: string = "";
  private from: string = env.SMTP_SENDER;
  private body: string = "";
  setSubject(subject: string) {
    this.subject = subject;
    return this;
  }
  setTo(to: string) {
    this.to = to;
    return this;
  }
  setBody(body: string) {
    this.body = body;
    return this;
  }
  public build(): nodemailer.SendMailOptions {
    return {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.body,
    };
  }
}

export { Emailer, Email };
