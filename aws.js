const aws = require('aws-sdk');
require("dotenv").config()  

aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.accessSecret,
  region: process.env.region
});

const uploadFile = async (file) => {
  const s3 = new aws.S3({ apiVersion: '2006-03-01' });

  const uploadParams = {

    Bucket: process.env.bucket, 
    Key: "abc/" + file.originalname,
    Body: file.buffer
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log("File has been successfully uploaded");
    console.log(data);
    return data.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

module.exports = { uploadFile };
