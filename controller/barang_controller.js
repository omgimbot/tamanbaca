const user = require("../model/user_model")
const barang = require("../model/barang_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.addBarang = (data) =>
  new Promise((resolve, reject) => {
    barang
      .create(data)
      .then(() => {
        barang
          .find({})
          .then((res) => {
            resolve(requestResponse.commonSuccessWithData(res))
          })
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.getBarang = () =>
  new Promise((resolve, reject) => {
    barang
      .find({}).sort({ created_at: 'desc' })
      .then((res) => {
        if (res.length == 0) {
          reject(requestResponse.common_nodata)
        } else {
          resolve(requestResponse.commonSuccessWithData(res))
        }
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.updateBarang = (id, data, newFotoBarang) =>
  new Promise((resolve, reject) => {

    let newData
    if (newFotoBarang === null) {
      newData = data
    } else {
      newData = data
      newData.fotoBarang = newFotoBarang
    }

    barang
      .updateOne(
        { _id: ObjectId(id) },
        { $set: newData }
      ).then(() => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.deleteBarang = (id) =>
  new Promise((resolve, reject) => {
    try {
      barang
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          resolve(requestResponse.common_success)
        })
        .catch(() => {
          reject(requestResponse.common_error)
        })
    } catch (err) {
      console.log(err)
    }
  })

exports.getBarangById = (id) =>
  new Promise((resolve, reject) => {
    barang
      .find({ _id: ObjectId(id) })
      .then(datas => {
        if (datas.length > 0) {
          resolve(requestResponse.commonSuccessWithData(datas[0]))
        } else {
          reject(requestResponse.common_nodata)
        }
      })
      .catch(err => reject(requestResponse.common_error))
  })
