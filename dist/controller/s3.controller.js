/* eslint-disable @typescript-eslint/naming-convention */
import { v4 as uuidv4 } from "uuid";
import { errorWrapper } from "../middleware/errorWrapper.js";
import aws from "aws-sdk";
import { responseUtils } from "../utils/response.utils.js";
import { appConfig } from "../config/appConfig.js";
const region = appConfig.awsBucketRegion;
const accessKeyId = appConfig.awsAccessKey;
const secretAccessKey = appConfig.awsSecretKey;
const bucket = appConfig.awsBucketName;
const folder = appConfig.awsFolder;
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
const getS3Urls = errorWrapper(async (req, res, next) => {
    const { file_names } = req.body; // array of file names with extension
    const urls = []; // array of objects {file_name, url, file_type}
    for (let i = 0; i < file_names.length; i++) {
        const uniqueCode = uuidv4();
        const params = {
            Bucket: bucket,
            Key: `${folder}/bb_${uniqueCode}`,
            Expires: 60,
        };
        const url = await s3.getSignedUrlPromise("putObject", params);
        let file_type = file_names[i].split(".");
        file_type = file_type[file_type.length - 1];
        urls.push({ file_name: `STD_${uniqueCode}`, file_type, url });
    }
    return responseUtils.success(res, {
        data: urls,
        status: 200,
    });
});
const deleteS3 = async ({ bucketName = bucket, key, }) => {
    console.log(key, "key", bucketName);
    // Ensure that AWS region and credentials are properly configured
    aws.config.update({
        region,
        accessKeyId,
        secretAccessKey,
        signatureVersion: "v4",
    });
    // Create an instance of the S3 client
    const s3 = new aws.S3();
    const params = {
        Bucket: bucketName,
        Key: `businessBazaar/${key}`,
    };
    try {
        // Delete the image
        const result = await s3.deleteObject(params).promise();
        console.log("File deleted successfully:", result);
        return result; // Ensure you return the result
    }
    catch (error) {
        console.error("Error deleting image:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
export { getS3Urls, deleteS3 };
