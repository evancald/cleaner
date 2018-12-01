require('dotenv').config();
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2',
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4'
})

const sign = (filename, filetype) => {
  let s3 = new aws.S3();
  

  let params = {
    Bucket: 'cleaner-test',
    Key: filename,
    Expires: 60,
    ContentType: filetype
  };

  return s3.getSignedUrl('putObject', params);
}

const getSignedUrl = (req, res) => {
  let { filename, filetype } = req.body;
  if (filename && filetype) {
    let signedUrl = sign(filename, filetype);
    res.send({
      url: signedUrl
    })
  }
}

module.exports = { getSignedUrl };