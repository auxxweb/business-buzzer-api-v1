import { v4 } from "uuid";
import { appConfig } from "../config/appConfig.js";

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
You can reach us at Kambikuttappan2024@gmail.com<br><br/>

Thank you,
KambiKuttappan
</pre>
</div>
</body>

</html>
  `;
};
