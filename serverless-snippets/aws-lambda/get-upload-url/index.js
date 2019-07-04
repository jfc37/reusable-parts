const jwtLib = require('jsonwebtoken');
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-southeast-2',
  signatureVersion: 'v4',
});

const s3 = new AWS.S3();
exports.handler = async event => {
  return await getUploadURL(event);
};
const getUploadURL = async event => {
  return new Promise((resolve, reject) => {
    const jwt = event.headers.Authorization.replace('Bearer ', '');
    const decodedJwt = jwtLib.decode(jwt);

    if (!decodedJwt || !decodedJwt.sub) {
      reject();
    } else {
      const s3Params = {
        Bucket: 'vallum-dev',
        Key: decodedJwt.sub + '/' + event.queryStringParameters.filename,
      };

      let uploadURL = s3.getSignedUrl('putObject', s3Params);
      resolve({
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          uploadURL: uploadURL,
        }),
      });
    }
  });
};
