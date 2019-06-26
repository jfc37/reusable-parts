const jwtLib = require('jsonwebtoken');

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION || 'ap-southeast-2' });
const s3 = new AWS.S3();

exports.handler = async event => {
  return await getFileMetadata(event);
};
const getFileMetadata = async event => {
  return new Promise((resolve, reject) => {
    const jwt = event.headers.Authorization.replace('Bearer ', '');
    const decodedJwt = jwtLib.decode(jwt);

    if (!decodedJwt || !decodedJwt.sub) {
      reject();
    } else {
      const s3Params = {
        Bucket: 'vallum-dev',
        Prefix: decodedJwt.sub + '/',
      };
      s3.listObjectsV2(s3Params, function(err, data) {
        if (err) {
          reject();
        } else {
          resolve({
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
              'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(data.Contents),
          });
        }
      });
    }
  });
};
