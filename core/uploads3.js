var AWS = require('aws-sdk');
var fs = require('fs');

// Create an S3 client
var s3 = new AWS.S3();


var bucketName = 'imaze';

//takes a filename and a keyname and uploads it into the amazon s3. 
var UploadToS3 = function( filename , file ){

    var keyName = file;
    //create a stream of the file to be uploaded
    var body = fs.createReadStream(filename);
    var params = {Bucket: bucketName, Key: keyName, Body: body , ACL:"public-read"};
    
    //upload the file log if any error occurs
    s3.upload(params, function(err, data) {
        if (err)
            console.log(err)
        else
            console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
}

module.exports = UploadToS3;