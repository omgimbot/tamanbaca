"use strict";
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userController = require("../controller/user_controller");
const toko = require("../controller/toko_controller");
var config = require("../config/config.json");
const fs = require("fs");
const uploadConf = require("../utilities/uploadImg");
const { requestResponse } = require("../setup");
const reqResponse = require("../setup");
const e = require("express");
const fields = uploadConf.upload.single('logoToko');

module.exports = (router) => {

  router.get("/", (req, res) => res.end("Market Api!"))

  router.post("/toko/daftar", fields, (req, res) => {
    let data = req.body
    data.logoToko = req.file.filename;
    console.log(data.idUser)
    console.log(data)
    toko
      .daftarToko(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.post("/toko/cektoko/:id", (req, res) => {
    toko
      .hasToko(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/toko/getall", (req, res) => {
    toko
      .getAllToko()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });


};
