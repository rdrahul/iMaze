var AWS = require('aws-sdk');
var fs = require('fs');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
var bucketName = 'imaze';

var UploadToS3 = function( filename , file ){

    var keyName = file;

    var body = fs.createReadStream(filename);
    var params = {Bucket: bucketName, Key: keyName, Body: body , ACL:"public-read"};
    s3.upload(params, function(err, data) {
        if (err)
            console.log(err)
        else
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
}

module.exports = UploadToS3;