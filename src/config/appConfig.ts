import { config } from "dotenv";

config();

export const appConfig = {
  mongoUrl: process.env.MONGO_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  port: process.env.PORT ?? 5000,
  nodeEnv: process.env.NODE_ENV ?? "",
  whiteList: process.env.WHITELIST ?? "",
  sibKey: process.env.SIB_KEY ?? "",
  sibUrl: process.env.SIB_URL ?? "",
  sibSource: process.env.SIB_SOURCE ?? "",
  webUrl: process.env.WEB_URL ?? "",
  assessmentId: process.env.ASSESSMENT_ID ?? "",
  awsBucketRegion: process.env.AWS_BUCKET_REGION ?? "",
  awsAccessKey: process.env.AWS_ACCESS_KEY ?? "",
  awsSecretKey: process.env.AWS_SECRET_KEY ?? "",
  awsBucketName: process.env.AWS_BUCKET_NAME ?? "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? "",
  razorpaySecret: process.env.RAZORPAY_SECRET ?? "",
  awsFolder: process.env.AWS_S3_FOLDER,
  awsUrl: process.env.AWS_S3_URL ?? "",
  webHookSecret: process.env.WEBHOOK_SECRET ?? "",
  freePlanId: process.env.FREE_PLAN_ID ?? "",
  adminUrl: process?.env?.ADMIN_URL ?? "https://superadmin.enconnect.in",
};
