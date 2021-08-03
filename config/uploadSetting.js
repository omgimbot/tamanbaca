const multer = require('multer')
const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, './static');
		},
		filename: function(req, file, cb) {
			let filename = file.originalname ;
			if(file.originalname.lastIndexOf('.')< 1){
				filename = filename+".pdf"
			}
			cb(null, new Date().toISOString().replace(/:/g, '-') + Math.ceil(Math.random() * 1000000) + filename)
		}
	});


	const fileFilter = (req, file, cb) => {
		// reject a file
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	};

	const upload = multer({
		storage: storage,
		limits: {
			fileSize: 1024 * 1024 * 500
		},
		//fileFilter: fileFilter
	});

module.exports = {multer,upload}
