import AWS from "aws-sdk";

AWS.config.update({
  region: "YOUR_AWS_REGION",
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
});
