"use strict"
const c_perpus = require("../controller/c_perpus")
const uploadConf = require("../config/uploadImg")
const fields = uploadConf.upload.single('logoPerpus')

module.exports = (router) => {

    router.post("/perpus/daftar", fields, (req, res) => {
        let data = req.body
        data.logoPerpus = uploadConf.cekNull(req.file)
        c_perpus
            .daftarPerpus(data)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
    })

    router.get("/perpus/getallperpus", (req, res) => {
        c_perpus
            .getAllPerpus()
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
    })

    router.get("/perpus/getperpusbyowner/:idUser", (req, res) => {
        c_perpus
            .getPerpusByOwner(req.params.idUser)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
    })

    router.delete("/perpus/delete/:id", (req, res) =>{
        c_perpus
            .deletePerpus(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
    })

}