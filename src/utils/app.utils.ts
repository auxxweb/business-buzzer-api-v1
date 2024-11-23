import { v4 } from "uuid";
import { appConfig } from "../config/appConfig.js";
import Business from "../modules/business/business.model.js";

export const getUuid = (): string => {
  const uuid = v4();
  return uuid;
};

export const resetLinkEmailTemplate = async (tempData: {
  username: string;
  uuId: string;
}): Promise<string> => {
  const resetLink = `${appConfig.webUrl}/changePassword/${tempData?.uuId}`;
  // const resetLink = `http://localhost:3000/changePassword/${tempData?.uuId}`;

  return `
  <!DOCTYPE html>
  <html>
  
  <body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, sans-serif;">
    <div style="
        max-width: 400px;
        margin: 40px auto;
        padding: 20px;
        border-radius: 15px;
        background-color: #ffffff;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        border: 1px solid #e3e6ec;
        text-align: center;
        color: #333333;
      ">
      <h2 style="
          font-size: 24px;
          font-weight: bold;
          color: #004ba0;
          margin-bottom: 15px;
        ">
        Reset Your Password
      </h2>
      <p style="
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #555555;
        ">
        Hello <strong>${tempData?.username}</strong>,<br/>
        We received a request to reset your password. Please click the button below to continue. If this wasn't you, kindly disregard this email.
      </p>
      <a href="${resetLink}" style="
          display: inline-block;
          margin: 20px auto;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          background-color: #0066cc;
          text-decoration: none;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 102, 204, 0.3);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.backgroundColor='#005bb5'; this.style.boxShadow='0px 6px 12px rgba(0, 91, 181, 0.3)';" 
          onmouseout="this.style.backgroundColor='#0066cc'; this.style.boxShadow='0px 4px 10px rgba(0, 102, 204, 0.3)';">
        Reset Password
      </a>
      <p style="
          font-size: 14px;
          line-height: 1.4;
          margin-top: 20px;
          color: #777777;
        ">
        For any assistance, contact us at<br/>
        <a href="mailto:inconnect.nfc@gmail.com" style="
            color: #0066cc;
            text-decoration: none;
            font-weight: bold;
          ">
          inconnect.nfc@gmail.com
        </a>.
      </p>
      <p style="
          font-size: 12px;
          color: #999999;
          margin-top: 20px;
          border-top: 1px solid #e3e6ec;
          padding-top: 15px;
        ">
        © 2024 Instant Connect. All rights reserved.
      </p>
    </div>
  </body>
  
  </html>
  `;
};
export const adminResetLinkEmailTemplate = async (tempData: {
  username: string;
  uuId: string;
}): Promise<string> => {
  const resetLink = `${appConfig.adminUrl}/changePassword/${tempData?.uuId}`;
  // const resetLink = `http://localhost:3000/changePassword/${tempData?.uuId}`;

  return `
  <!DOCTYPE html>
  <html>
  
  <body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, sans-serif;">
    <div style="
        max-width: 400px;
        margin: 40px auto;
        padding: 20px;
        border-radius: 15px;
        background-color: #ffffff;
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
        border: 1px solid #e3e6ec;
        text-align: center;
        color: #333333;
      ">
      <h2 style="
          font-size: 24px;
          font-weight: bold;
          color: #004ba0;
          margin-bottom: 15px;
        ">
        Reset Your Password
      </h2>
      <p style="
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #555555;
        ">
        Hello <strong>${tempData?.username}</strong>,<br/>
        We received a request to reset your password. Please click the button below to continue. If this wasn't you, kindly disregard this email.
      </p>
      <a href="${resetLink}" style="
          display: inline-block;
          margin: 20px auto;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          background-color: #0066cc;
          text-decoration: none;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 102, 204, 0.3);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        " onmouseover="this.style.backgroundColor='#005bb5'; this.style.boxShadow='0px 6px 12px rgba(0, 91, 181, 0.3)';" 
          onmouseout="this.style.backgroundColor='#0066cc'; this.style.boxShadow='0px 4px 10px rgba(0, 102, 204, 0.3)';">
        Reset Password
      </a>
      <p style="
          font-size: 14px;
          line-height: 1.4;
          margin-top: 20px;
          color: #777777;
        ">
        For any assistance, contact us at<br/>
        <a href="mailto:inconnect.nfc@gmail.com" style="
            color: #0066cc;
            text-decoration: none;
            font-weight: bold;
          ">
          inconnect.nfc@gmail.com
        </a>.
      </p>
      <p style="
          font-size: 12px;
          color: #999999;
          margin-top: 20px;
          border-top: 1px solid #e3e6ec;
          padding-top: 15px;
        ">
        © 2024 Instant Connect. All rights reserved.
      </p>
    </div>
  </body>
  
  </html>
  `;
};

export const createBusinessId = async (): Promise<string> => {
  const businessCount = await Business.countDocuments();
  const paddedCount = String(businessCount + 1).padStart(6, "0");
  return `INC${paddedCount}`;
};

export const getInformEmailTemplate = async ({
  businessName,
}: {
  businessName: string;
}): Promise<string> => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Signing In</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <table role="presentation" width="100%" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #ddd;">
          <!-- Header Section -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #1E3A8A; color: #ffffff; border-bottom: 1px solid #ddd;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Thank You for Signing In, ${businessName}!</h1>
              <p style="margin: 10px 0 0; font-size: 16px; font-weight: 400;">We're excited to help you manage your business with Instant Connect.</p>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td style="padding: 30px; font-size: 16px; color: #333333; line-height: 1.6;">
              <p style="margin: 0 0 20px;">Hello,</p>
              <p style="margin: 0 0 20px;">Thank you for signing in to Instant Connect. We are thrilled to have you on board and can't wait to help you manage your business <strong>${businessName}</strong> more effectively.</p>
              <p style="margin: 0 0 20px;">To get started, simply click the link below to access your dashboard:</p>
              <p style="margin: 0 0 20px;">
                <a href="https://admin.enconnect.in/login" style="color: #1E3A8A; text-decoration: none; font-weight: 600; border: 2px solid #1E3A8A; padding: 12px 20px; border-radius: 6px; display: inline-block; transition: background-color 0.3s;">
                  Go to Your Dashboard
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 30px; text-align: center; font-size: 14px; color: #777777; background-color: #f9f9f9; border-top: 1px solid #ddd;">
              <p style="margin: 0;">If you have any questions or need assistance, don't hesitate to reach out to us.</p>
              <p style="margin: 10px 0 0;">Best regards,<br>The Instant Connect Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
