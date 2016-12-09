var sharp  = require('sharp');
var fs = require('fs');
var image_optimizer = function( image  ){
    //console.log( " compressing image .." + image.filename );
    
    var callback = function(err, info){
        if ( !err){
            image.newfilename = save_name;
            console.log("compressed - >" , image.newfilename);
            
            //Delete the old files once the image is optimized
            var deleteImages =  function(image){fs.stat(image.filename , function(err){
                if(!err){
                    fs.unlink(image.filename, function(err){
                        if(err)console.log("Error while deleting file : ",err);
                        else
                            console.log("file deleted");
                    });
                }
                else{
                    console.log("error occured " ,err);
                }
            });
            }

            //delay the deletion of files up until next loop
            process.nextTick(deleteImages(image));
        }
        else{
            image.newfilename = "";
            console.log("error =>" , err);
        }
    }
    
    //optimize the image , reduce the quality, convert to grayscale, compress to webp and then save
    var save_name  = image.filename.split('.')[0]  + '.webp';
    sharp(image.filename)
    .quality(85) 
    .greyscale()
    .webp()
    .toFile( save_name,callback);
}

module.exports = image_optimizer;