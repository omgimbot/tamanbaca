"use strict";
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userController = require("../controller/user_controller");
const toko = require("../controller/toko_controller");
const barang = require("../controller/barang_controller");
const transaksi = require("../controller/transaksi_controller");
var config = require("../config/config.json");
const fs = require("fs");
const uploadConf = require("../utilities/uploadImg");
const { requestResponse } = require("../setup");
const reqResponse = require("../setup");
const e = require("express");
const fields = uploadConf.upload.single('foto');
module.exports = (router) => {

  router.get("/", (req, res) => res.end("Market Api!"))

  router.post("/transaksi/addkeranjang", (req, res) => {
    let data = req.body
    transaksi
      .addKeranjang(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put("/transaksi/buktibayar", fields, (req, res) => {
    let data = req.body
    data.foto = req.file.filename
    transaksi
      .uploadBuktiBayar(data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/transaksi/buktibayar", (req, res) => {
    transaksi
      .getBuktiBayar()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/transaksi/toko/:id", (req, res) => {
    let id = req.params.id
    transaksi
      .getBarangByToko(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      });
  });

  router.get("/transaksi/cart/:id", (req, res) => {
    let id = req.params.id
    transaksi
      .getBarangByCust(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      });
  });

  router.delete("/transaksi/cart/:id", (req, res) => {
    let id = req.params.id
    transaksi
      .deleteBarang(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put("/transaksi/cart/:id", (req, res) => {
    let id = req.params.id
    let data = req.body
    // console.log(data, id)
    transaksi
      .changeStatus(id, data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.put("/transaksi/toko/:id", (req, res) => {
    let id = req.params.id
    transaksi
      .changeStatusByToko(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });

}