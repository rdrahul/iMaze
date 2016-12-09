var express = require('express');
var router = express.Router();
var request = require('request');
var path =  require('path');
var fs = require('fs');

//local modules
var Config = require('../config'); 
var Image = require('../models/image');
var ScrapeImages = require('../core/scraper');
var DownloadImages = require('../core/storage');
var UploadToS3 = require('../core/uploads3');

//function to save all the optimioze images to the database
var SaveToDatabase = function(err, query ,modified_images){
                    if (!err){
                        var image = new Image(); 
                            image.query = query;   
                        var image_paths = [];

                        //extract the new optimized image path
                        modified_images.forEach(function(image){
                            if (image.newfilename != "" && image.newfilename != undefined){
                                var filename = image.newfilename.split('/');
                                filename = path.join ( Config['CLIENT_IMAGE_PREFIX'] ,query, filename[ filename.length - 1] );
                                console.log(filename);
                                image_paths.push( filename );
                                UploadToS3( image.newfilename , filename );
                            }
                            //console.log("removing the files - " , image.filename);
                            
                        })
                        image.image_paths = image_paths;
                        //save the images
                        image.save(function(err){
                            if(err){
                                console.log(err);
                            }
                        });
                    }
                    else{
                        console.log("Error - > " , err);
                    }
                    
                }



//route for getting all the images
router.get('/images', function(req , res ){
    Image.find( function(err, images){
         if (err)
            return res.json("Error ", err);
         res.json(images);
    })

});

router.post('/images', function(req, res){

    var query = req.body.query;
    
    //set the url and required headers
    var options = { url : `https://www.google.co.in/search?q=${query}&source=lnms&tbm=isch&sa=X`,
                    headers: {
                             'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36'
                             },
                    forever : true,
                    pool : false
                  };

    
    //make a request to given url
    request(  options , function(err, response, html ){
        
        if ( !err && response.statusCode == 200){
            console.log("here");
            
            var selector = "#rg_s .rg_meta";
            
            //extract all the information about images
            ScrapeImages(html, selector , function(err,images){
                if (err){
                    return res.json("Error Ocurred ", err);
                }
                //send the response
                res.status(200).json(images);
                
                //start saving images
                DownloadImages( images , query ,SaveToDatabase ); 
            });                              
        }
        else{
            return res.status(400).json({'err' : err});
        }
  
     });
});

//route for a specific query- return all images related to that query
router.get('/images/:query', function(req, res){
    var query = req.params.query;
    Image.find({"query" : query}, function(err, images){
        if(err)
            return res.json(err);
        res.json(images);
    })
})
module.exports = router;