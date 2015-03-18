console.log("If modules not found, run `npm install` in /example folder!"); // git subtree push -P examples heroku master
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 80;

var express = require('express');
var app = express();

var Gun = require('gun');
var gun = Gun({
	s3: {
		key: process.env.AWS_ACCESS_KEY_ID,
		secret: process.env.AWS_SECRET_ACCESS_KEY,
		bucket: process.env.S3_BUCKET_NAME,
    region: process.env.S3_BUCKET_REGION
	}
});

gun.attach(app);
app.use(express.static(__dirname)).listen(port);

console.log('Server started on port ' + port + ' with /gun');
