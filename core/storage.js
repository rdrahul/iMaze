var fs = require('fs');
var path = require('path');
var config = require('../config');
var async = require('async');
var request = require('request');
var ImageOptimizer = require('./optimizer');
var needle = require('needle');
var IMAGE_STORAGE = config['IMAGE_STORAGE'] ;

//extracts  the extension from an image
var ExtractExtension = function(image){
        return image.ity;
}

//function to dowload a file and save to hard disk
var download = function(url, filename, callback){
    console.log("dowloading image  -- ", filename);
    var req_callback = function(err, res, body){
        if (err){
            console.log("Error While Downloading :: ", err);
            callback(err, null);
        }
    }
    request.get(url,req_callback).pipe( fs.createWriteStream(filename) ).on('close', callback);
    //request.get(url,req_callback ).pipe(  ).on('close', callback);
}



/**
 * DownloadImages - downloads the images and optimizes the asynchronously  
 * params images : tne array of images to dowload and optimize
 *        query : the name if the search query 
 *        down_image_callback : callback after images are dowloaded.
 */
var DownloadImages = function( images, query , down_image_callback ){

    
    var dir = path.join(IMAGE_STORAGE , `${query}`);
    
    //create the directory if doesn't exists'
    if( !fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    else{
        return;
    }


    //once all the images are downloaded and optimized calls save to database callback
    var callback = function(e, image){
        if(e){
            console.log("error while downloading and optimizing images  ", e);
        }
        else{
            console.log("Done !!");
            down_image_callback(null, query, images);
        }            
    } 

    //helper function - doewnloads images and then optimizes them  asynchronously
    //params : image - takes an image, async_callback - callback function(async provides this)
    var helper = function(image ,async_callback ){
        
        //var extension  = image.ity !='' ? image.tty : "jpg";  
        var extension = ExtractExtension(image);
        var filename = path.join( dir  , ( +new Date ) + image.count + '.' + extension);
        image.filename = filename;
        
        //extract image download url
        var image_url = image.ou;
        download(image_url , filename, function(err, other){
            if (err){
                console.log(err);
                async_callback(err, null);
            }
            else{
                // optimize the images
                   ImageOptimizer(image); 
                   async_callback(null, image);
               } 
            
        });
    }

    //asynchronously download all the images
    async.each( images , helper, callback);
}

module.exports = DownloadImages;