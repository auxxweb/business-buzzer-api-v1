import axios from "axios";
import { sendMailData } from "../interface/app.interface.js";
import { appConfig } from "../config/appConfig.js";

export const sendEmail = async (mailData: sendMailData): Promise<boolean> => {
  try {
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": appConfig.sibKey,
    };
    const { to, text, subject } = mailData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.SIB_SOURCE,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: text,
      },
      {
        headers,
      },
    );

    return true;
  } catch (err) {
    console.log(err, "error");
    return false;
  }
};
