var path = require('path');

var config = {
    'IMAGE_STORAGE' :  path.join( __dirname , 'client' ,'images' ),
    'CLIENT_IMAGE_PREFIX' : 'images',
    'MONGO_URL' : {
       'development': 'mongodb://admin:admin123@localhost:27017/admin',
       'production' : 'mongodb://admin:admin123@ds127968.mlab.com:27968/imaze'
    },
    'PORT'      : '8080'
}

module.exports = config;