const user = require("../model/user_model")
const toko = require("../model/toko_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.daftarToko = (data) =>
  new Promise((resolve, reject) => {
    toko
      .find({ idUser: data.idUser })
      .then(datas => {
        if (datas.length > 1) {
          reject(requestResponse.already_exists);
        } else {
          toko
            .create(data)
            .then(() => {
              toko
                .find({ idUser: data.idUser })
                .then((res) => {
                  let respMsg = Object.assign(requestResponse.common_success);
                  respMsg["result"] = res[0];
                  resolve(respMsg);
                })
              // resolve(requestResponse.common_success)
            })
            .catch(() => {
              reject(requestResponse.common_error)
            })
        }
      })
      .catch(err =>
        reject(requestResponse.common_error)
      )
  })

exports.getAllToko = () =>
  new Promise((resolve, reject) => {
    toko
      .find()
      .then(datas => {
        let respMsg = Object.assign(requestResponse.common_success);
        respMsg["result"] = datas;
        resolve(respMsg);
      })
      .catch(err => reject(requestResponse.common_error))
  })

exports.hasToko = (id) =>
  new Promise((resolve, reject) => {
    console.log(id)
    toko
      .find({ idUser: id })
      .then(datas => {
        if (datas.length > 0) {
          datanya = {
            status: true,
            rc: '0000',
            message: 'Sudah Ada Toko'
          }
          let respMsg = Object.assign(datanya);
          respMsg["result"] = datas[0];
          resolve(respMsg);
        } else {
          reject({
            status: false,
            rc: '0000',
            message: 'Belum Ada Toko'
          })
        }
      })
      .catch(err => reject(requestResponse.common_error))
  })

