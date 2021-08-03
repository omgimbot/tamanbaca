"use strict";
const auth = require("basic-auth")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const userController = require("../controller/user_controller")
const toko = require("../controller/toko_controller")
const barang = require("../controller/barang_controller")
var config = require("../config/config.json")
const fs = require("fs")
const uploadConf = require("../config/uploadImg")
const { requestResponse } = require("../setup")
const fields = uploadConf.upload.single('fotoBarang')

module.exports = (router) => {

  router.get("/", (req, res) => res.end("Market Api!"))

  router.post("/barangs/addbarang", fields, (req, res) => {
    let data = req.body
    data.fotoBarang = uploadConf.cekNull(req.file)
    barang
      .addBarang(data)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  router.get("/barangs/getall", (req, res) => {
    barang
      .getBarang()
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  router.put("/barangs/update/:id", fields, (req, res) => {
    let id = req.params.id
    let data = req.body
    let newFotoBarang = uploadConf.cekNull(req.file)
    barang
      .updateBarang(id, data, newFotoBarang)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      });
  });

  router.delete("/barangs/deletebyid/:id", (req, res) => {
    barang
      .deleteBarang(req.params.id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  router.get("/barangs/getbarangbyid/:id", (req, res) => {
    barang
      .getBarangById(req.params.id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      });
  });

}