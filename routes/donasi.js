"use strict";
const auth = require("basic-auth")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const controller = require("../controller/donasi_controller")
var config = require("../config/config.json")
const fs = require("fs")
const uploadUtil = require("../config/uploadImg")
const fotoUser = uploadUtil.upload.single("fotoProfile")

module.exports = (router) => {
  router.get("/", (req, res) => res.end("Toko Api!"))



  router.post("/donasi/create", (req, res) => {
    let data = req.body
    controller
      .create(req.body)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      });
  });

  router.get("/donasi/:id", (req, res) => {
    controller
      .RiwayatDonasi(req.params.id)
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  })

  router.delete("/buku/delete/:id", (req, res) => {
    controller
      .deleteBuku(req.params.id)
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  })

  router.put("/buku/update/:id", (req, res) => {
    console.log(req.body)
    controller
      .updateBuku(req.params.id , req.body)
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  })
  

  router.post("/users/signin", (req, res) => {
    try {
      userController
        .loginUser(req.body.email, req.body.password)
        .then((result) => {
          let email = result.message
          userController
            .getProfile(email)
            .then((result) => {
              console.log(result)
              res.json(result)
            })
            .catch((err) => res.json(err))
        })
        .catch((err) => res.json(err))
    } catch (err) {
      console.log(err)
    }
  })

  router.put("/users/updateprofile/:id", fotoUser, (req, res) => {
    let id = req.params.id
    let data = req.body
    data.fotoProfile = uploadUtil.cekNull(req.file)
    // console.log(data)
    userController
      .updateProfile(id, data)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  router.get("/users/getusers", (req, res) => {
    userController
      .getUserRole()
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        res.json(err)
      })
  })

  // router.post("/users/checkToken", (req, res) => {
  //   const email = req.body.email;
  //   const token = req.headers["x-access-token"];
  //   userController
  //     .checkToken(email, token)
  //     .then((result) => {
  //       res.json(result);
  //     })
  //     .catch((err) => res.json(err));
  // });

  // router.get("/users/:key", (req, res) => {
  //   let key = req.params.key
  //   userController
  //     .getAllUSer(key)
  //     .then((result) => {
  //       res.json(result)
  //     })
  //     .catch((err) => {
  //       res.json(err)
  //     })
  // });

}
