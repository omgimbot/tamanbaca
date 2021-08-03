const user = require("../model/user_model")
const toko = require("../model/toko_model")
const barang = require("../model/barang_model")
const keranjang = require("../model/keranjang_model")
const transaksi = require("../model/transaksi_model")
const buktiBayar = require("../model/bukti_transaksi_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.addKeranjang = (data) =>
  new Promise((resolve, reject) => {
    // console.log(data)
    transaksi
      .create(data)
      .then((r) => {
        // console.log(r)
        if (r) {
          keranjang
            .create(data)
            .then(() => {
              resolve(requestResponse.common_success)
            }).catch((err) => {
              reject(requestResponse.common_error)
            })
        } else {
          reject(requestResponse.common_error)
        }
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

// exports.changeStatus = (id, data) =>
//   new Promise((resolve, reject) => {
//     transaksi
//       .updateOne({ _id: ObjectId(id) }),
//       { $set: data }
//         .then((r) => {
//           if (r) {
//             keranjang
//               .create(data)
//               .then(() => {
//                 resolve(requestResponse.common_success)
//               }).catch((err) => {
//                 reject(requestResponse.common_error)
//               })
//           } else {
//             reject(requestResponse.common_error)
//           }
//         })
//         .catch(() => {
//           reject(requestResponse.common_error)34 1234 12
//         })34 1234
//   })

exports.changeStatus = (id, data) =>
  new Promise((resolve, reject) => {

    let update, status
    if (data.key === "1") {
      update = { status: Number(1) }
      status = 0
    } else if (data.key === "2") {
      update = { status: Number(2) }
      status = 1
    } else if (data.key === "3") {
      update = { status: Number(3) }
      status = 2
    } else if (data.key === "4") {
      update = { status: Number(4) }
      status = 3
    } else if (data.key === "5") {
      update = { status: Number(5) }
      status = 4
    }

    transaksi
      .updateMany(
        {
          idPembeli: ObjectId(id),
          status: status
        },
        {
          $set: update
        }
      ).then(() => {
        resolve(requestResponse.common_success);
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.changeStatusByToko = (id) =>
  new Promise((resolve, reject) => {
    transaksi
      .updateOne(
        {
          idToko: ObjectId(id),
          status: 3
        },
        {
          $set: { status: Number(4) }
        }
      ).then(() => {
        resolve(requestResponse.common_success);
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.uploadBuktiBayar = (data) =>
  new Promise((resolve, reject) => {
    buktiBayar
      .create(data)
      .then((r) => {
        if (r) {
          transaksi
            .updateMany({ idPembeli: ObjectId(r.idPembeli), status: 1 },
              { $set: { updated_at: r.created_at }, status: Number(2) }
            ).then(() => {
              let respMsg = Object.assign(requestResponse.common_success);
              resolve(respMsg);
            }).catch((err) => {
              reject(requestResponse.common_error)
            })
        } else {
          reject(requestResponse.common_error)
        }
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

exports.deleteBarang = (id) =>
  new Promise((resolve, reject) => {
    try {
      keranjang
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          let respMsg = Object.assign(requestResponse.common_success);
          resolve(respMsg);
        })
        .catch(() => {
          reject(requestResponse.common_error)
        })
    } catch (err) {
      console.log(err)
    }
  })

exports.getBarangByToko = (id) =>
  new Promise((resolve, reject) => {
    try {
      transaksi
        .aggregate([
          { $match: { "idToko": id } },
          {
            $lookup: {
              from: "barangs",
              localField: "idBarang",
              foreignField: "_id",
              as: "items"
            }
          },
          {
            $lookup: {
              from: "tokos",
              localField: "idToko",
              foreignField: "idUser",
              as: "toko"
            }
          },
          {
            $unwind: { path: "$items", preserveNullAndEmptyArrays: true }
          },
          {
            $unwind: { path: "$toko", preserveNullAndEmptyArrays: true }
          }
        ])
        .then((res) => {
          if (res) {
            resolve(requestResponse.commonSuccessWithData(res))
          } else {
            reject(requestResponse.common_nodata)
          }
        })
        .catch((error) => {
          reject(requestResponse.common_error)
        })
    } catch (error) {
      console.log(error)
    }
  })

exports.getBarangByCust = (id) =>
  new Promise((resolve, reject) => {
    try {
      transaksi
        .aggregate([
          { $match: { "idPembeli": ObjectId(id) } },
          {
            $lookup: {
              from: "barangs",
              localField: "idBarang",
              foreignField: "_id",
              as: "items"
            }
          },
          {
            $lookup: {
              from: "tokos",
              localField: "idToko",
              foreignField: "idUser",
              as: "toko"
            }
          },
          {
            $unwind: { path: "$items", preserveNullAndEmptyArrays: true }
          },
          {
            $unwind: { path: "$toko", preserveNullAndEmptyArrays: true }
          }
        ])
        .then((res) => {
          if (res) {
            resolve(requestResponse.commonSuccessWithData(res))
          } else {
            reject(requestResponse.common_nodata)
          }
        })
        .catch((error) => {
          reject(requestResponse.common_error)
        })
    } catch (error) {
      console.log(error)
    }
  })

exports.getBuktiBayar = () =>
  new Promise((resolve, reject) => {
    buktiBayar
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "idPembeli",
            foreignField: "_id",
            as: "pelanggan"
          }
        },
        {
          $unwind: { path: "$pelanggan", preserveNullAndEmptyArrays: true }
        }
      ])
      .then((result) => {
        if (result.length > 0) {
          let respMsg = Object.assign(requestResponse.common_success)
          respMsg["result"] = result
          resolve(respMsg)
        } else {
          reject(requestResponse.common_nodata)
        }
      })
      .catch(() => {
        reject(requestResponse.common_error)
      })
  })

// exports.getBuktiBayar = () =>
//   new Promise((resolve, reject) => {
//     try {
//       transaksi
//         .aggregate([
//           {
//             $lookup: {
//               from: "barangs",
//               localField: "idBarang",
//               foreignField: "_id",
//               as: "items"
//             }
//           },
//           {
//             $lookup: {
//               from: "buktibayars",
//               localField: "idPembeli",
//               foreignField: "idPembeli",
//               as: "buktibayar"
//             }
//           }, {
//             $lookup: {
//               from: "users",
//               localField: "idPembeli",
//               foreignField: "_id",
//               as: "pelanggan"
//             }
//           },
//           {
//             $unwind: { path: "$items", preserveNullAndEmptyArrays: true }
//           },
//           {
//             $unwind: { path: "$buktibayar", preserveNullAndEmptyArrays: true }
//           },
//           {
//             $unwind: { path: "$pelanggan", preserveNullAndEmptyArrays: true }
//           }
//         ])
//         .then((res) => {
//           if (res) {
//             // let respMsg = Object.assign(requestResponse.common_success);
//             // respMsg["result"] = res;
//             // resolve(requestResponse.commonSuccessWithData(res))
//             let newArr = []
//             for (i in res) {
//               const dataTransaksi = res[i]
//               // console.log(cekExist(newArr, dataTransaksi.idPembeli, dataTransaksi.updated_at))
//               if (cekExist(newArr, dataTransaksi.idPembeli, dataTransaksi.updated_at)) {
//                 newArr = appendItems(newArr, dataTransaksi.idPembeli, dataTransaksi.updated_at, dataTransaksi)
//               } else {
//                 newArr.push({
//                   updated_at: dataTransaksi.updated_at,
//                   idPembeli: dataTransaksi.idPembeli,
//                   items: [
//                     dataTransaksi.items
//                   ]
//                 })
//               }
//             }
//             resolve(newArr)
//           } else {
//             reject(requestResponse.common_nodata)
//           }
//         })
//         .catch((error) => {
//           console.log(error)
//           reject(requestResponse.common_error)
//         })
//     } catch (error) {
//       console.log(error)
//     }
//   })

const cekExist = (arr, idPembeli, updatedAt) => {
  const hasil = arr.filter(r => {
    // console.log(r.idPembeli.toString() === idPembeli.toString())
    return r.idPembeli.toString() === idPembeli.toString() && r.updated_at.toString() === updatedAt.toString()
  })
  return hasil.length > 0 ? true : false
}

const appendItems = (arr, idPembeli, updatedAt, dataTransaksi) => {
  let newHasil = []
  for (i in arr) {
    const r = arr[i]
    if (r.idPembeli.toString() === idPembeli.toString() && r.updated_at.toString() === updatedAt.toString()) {
      r.items.push(dataTransaksi.items)
    }
    newHasil.push(r)
  }
  return newHasil
}