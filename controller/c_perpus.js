const mongoose = require("mongoose")
const m_perpus = require("../model/m_perpus")
const { requestResponse } = require("../setup")
const ObjectId = mongoose.Types.ObjectId

exports.daftarPerpus = (data) =>
    new Promise((resolve, reject) => {
        m_perpus
            .find({ idUser: ObjectId(data.idUser) })
            .then(datas => {
                if (datas.length > 0) {
                    reject(requestResponse.common_have_perpus);
                } else {
                    m_perpus
                        .create(data)
                        .then(() => {
                            resolve(requestResponse.common_success)
                        })
                        .catch(() => {
                            reject(requestResponse.common_error)
                        })
                }
            })
            .catch(err => reject(requestResponse.common_error))
    })

exports.getPerpusByOwner = (idUser) =>
    new Promise((resolve, reject) => {
        m_perpus
            .find({ idUser: ObjectId(idUser) })
            .then((datas) => {
                resolve(requestResponse.commonSuccessWithData(datas))
            })
            .catch(err => reject(requestResponse.common_error))
    })

exports.getAllPerpus = () =>
    new Promise((resolve, reject) => {
        m_perpus
            .find({})
            .then((datas) => {
                resolve(requestResponse.commonSuccessWithData(datas))
            })
            .catch(err => reject(requestResponse.common_error))
    })

exports.deletePerpus = (o_id) =>
    new Promise((resolve, reject) => {
        m_perpus
            .deleteOne({_id: ObjectId(o_id)})
            .then(() => {
                resolve(requestResponse.common_delete)
            })
            .catch(err => reject(requestResponse.common_error))
    })

