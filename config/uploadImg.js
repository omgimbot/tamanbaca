const multer = require('multer')
const path = require('path')
const MAX_SIZE = 20000000
const fs = require('fs')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './statics')
  },
  filename: (req, file, cb) => {
    cb(null, generateName() + path.extname(file.originalname))
  }
})

function generateName () {
  return crypto.randomBytes(20).toString('hex')
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/.png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE
  }
})

const cekNull = (fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null
  } else {
    return fileUpload.filename
  }
}

const deleteImage = (image) => {
  fs.unlinkSync(`./statics/${image}`)
}

module.exports = { multer, upload, cekNull, deleteImage }