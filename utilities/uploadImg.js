const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './statics');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
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

module.exports = { multer, upload }
