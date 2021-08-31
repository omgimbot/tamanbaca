const user = require("../model/user_model")
const model = require("../model/donasi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const ObjectID = require('mongodb').ObjectID;

exports.create = (data) =>
  new Promise((resolve, reject) => {
    let newData = new model(data)
    console.log(data)
    newData.save()
      .then(() => {
        resolve(requestResponse.common_success)
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.RiwayatDonasi = (id) =>
  new Promise((resolve, reject) => {
    console.log(ObjectId(id))
    model
      .aggregate([
        {
          $match: { idUser: ObjectId(id) }
        },
        {
          $lookup: {
            from: "bukus",
            localField: "idBuku",
            foreignField: "_id",
            as: "buku",
          },
        },
      ])
      .then((res) => {
        resolve(requestResponse.commonSuccessWithData(res))

      })
      .catch((err) => {
        console.log(err)
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
