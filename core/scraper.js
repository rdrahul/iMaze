var xray = require('x-ray');
var xRay = xray();

/*
 * ScrapeImages - scrapes the images information from the given html on basis of selector provided
 * html - the html from where to parse the info
 * selector - a string to select an html element
 */
var ScrapeImages = function(html , selector , callback ){
    
    //use x-ray library to scrape images, saves them in an object ans returns that object
    return xRay(html, selector ,[{
            img_info : ''
    }])
    (function(err, img_objs){
            if (err){
                callback(err, null);
            }
            else{
                var images = [];
                var count = 0;
                img_objs.forEach( function(img_object){
                    image_info = JSON.parse(img_object["img_info"]);
                    if (count < 2 && image_info.ity != '' && image_info.ity != undefined && image_info.ity != 'gif' ) {
                        //fetch image info objects and save in images
                        image_info.count = count;
                        images.push(image_info);
                        count+=1;
                    }
                });
                
                callback(null, images);
            }
    });
}

module.exports = ScrapeImages;
