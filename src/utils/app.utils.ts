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
  const resetLink = `${appConfig.webUrl}/reset-password?id=${tempData?.uuId}`;

  return `
<!DOCTYPE html>
<html>

<head>
<style>
.center {
display: block;
margin-left: auto;
margin-right: auto;
width:15rem
}

.email-container {
max-width: 600px;
padding: 24px;
gap: 40px;
flex-shrink: 0;
border-radius: 8px;
border: 1px solid var(--Purple-purple-100, #E8D1FF);
background: #FFF;
}

pre {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: system-ui ;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

h2 {
align-self: stretch;
color: var(--Grey-grey-400, #5C5C5C);
font-family: Trip Sans;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: normal;
}

.link {
padding: 15px 24px;
border-radius: 8px;
background: var(--Primary,orange);
box-shadow: 0px 4px 10px 0px #DDBAFF;
color: #FFF;
font-family: Trip Sans;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
text-decoration: none;
display: block;
margin-left: auto;
margin-right: auto;
width: fit-content;
}
</style>
</head>

<body>
<div class="email-container">

<h2>
Reset Password
</h2>
<pre>
Dear ${tempData.username},<br/>
We received a request to reset the password for your account associated with this email address. 
If you made this request, please click on the link below to reset your password:
</pre>
<a href="${resetLink}" class="link" style="color: #FFF;">
Reset Password
</a>
<pre>
If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.<br/>
You can reach us at inconnect.nfc@gmail.com<br><br/>

Thank you,
Instant connect
</pre>
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
                <a href="https://admin.instant-connect.in/login" style="color: #1E3A8A; text-decoration: none; font-weight: 600; border: 2px solid #1E3A8A; padding: 12px 20px; border-radius: 6px; display: inline-block; transition: background-color 0.3s;">
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
