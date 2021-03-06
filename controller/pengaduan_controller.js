const user = require("../model/user_model")
const model = require("../model/pengaduan_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.create = (data) =>
  new Promise((resolve, reject) => {
    let newData = new model(data)
    console.log(newData)
    newData.save()
      .then(() => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.getPengaduan = (id) =>
  new Promise((resolve, reject) => {
    model
      .find({ idUser: ObjectId(id) })
      .then((res) => {
        console.log(res[0])
        resolve(requestResponse.commonSuccessWithData(res))

      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.getAllPengaduan = () =>
  new Promise((resolve, reject) => {
    model
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "idUser",
            foreignField: "_id",
            as: "client"
          }
        }
      ])
      .then((res) => {
        console.log(res[0])
        resolve(requestResponse.commonSuccessWithData(res))

      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.konfirmasi = (id, data) =>
  new Promise((resolve, reject) => {
    model
      .updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      )
      .then((res) => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.deletePengaduan = (id) =>
  new Promise((resolve, reject) => {
    model
      .deleteOne({ _id: ObjectId(id) })
      .then((res) => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.updateBuku = (id, data) =>
  new Promise((resolve, reject) => {
    model
      .updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      ).then(() => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.deleteBuku = (id) =>
  new Promise((resolve, reject) => {
    try {
      model
        .deleteOne({ _id: ObjectId(id) })
        .then((res) => {
          console.log
          resolve(requestResponse.common_success)
        })
        .catch(() => {
          reject(requestResponse.common_error)
        })
    } catch (err) {
      reject(requestResponse.common_error)
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
