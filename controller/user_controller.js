const user = require("../model/user_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const { requestResponse } = require("../setup")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

exports.loginUser = (email, password) =>
  new Promise((resolve, reject) => {
    console.log(email + " " + password)
    user
      .find({ email: email })
      .then(users => {
        if (users.length == 0) {
          reject(requestResponse.account_not_found)
        } else {
          const hashed_password = users[0].password
          if (bcrypt.compareSync(password, hashed_password)) {
            resolve({ message: email })
          } else {
            reject(requestResponse.account_not_found)
          }
        }
      })
      .catch(err => reject(requestResponse.common_error))
  })

exports.registerUser = (data) =>
  new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(data.password, salt)
    user
      .find({ email: data.email })
      .then((users) => {
        if (users.length > 0) {
          reject(requestResponse.email_already_use)
        } else {
          data.password = hash
          user
            .create(data)
            .then((result) => resolve(requestResponse.commonSuccessWithData(result)))
            .catch((err) => reject(requestResponse.commonError))
        }
      })
      .catch((err) => reject(requestResponse.common_error));
  })

// exports.checkToken = (nik, token) =>
//   new Promise((resolve, reject) => {
//     user
//       .find({ nik: nik })
//       .then((users) => {
//         if (users.length == 0) {
//           reject(requestResponse.token_invalid)
//         } else {
//           return users[0]
//         }
//       })
//       .then((user) => {
//         const user_token = user.token;
//         if (user_token == token) {
//           let respMsg = Object.assign(requestResponse.common_signin_success);
//           respMsg["result"] = user;
//           resolve(respMsg);
//         } else {
//           reject(requestResponse.token_invalid);
//         }
//       })
//       .catch((err) => reject(requestResponse.common_error));
//   })

exports.getProfile = (email) =>
  new Promise((resolve, reject) => {
    user
      .find({ email: email })
      .select("-hashed_password")
      .then((users) => {
        resolve(requestResponse.commonSuccessWithData(users[0]))
      })
      .catch((err) => {
        console.log(err)
        reject(requestResponse.common_error)
      }
      );
  });

exports.getTamanBaca = () =>
  new Promise((resolve, reject) => {
    user
      .find({ role: "TamanBaca" })
      .then((users) => {
        resolve(requestResponse.commonSuccessWithData(users))
      })
      .catch((err) => {
        console.log(err)
        reject(requestResponse.common_error)
      }
      );
  });

exports.getDonatur = () =>
  new Promise((resolve, reject) => {
    user
      .find({ role: "Donatur" })
      .then((users) => {
        resolve(requestResponse.commonSuccessWithData(users))
      })
      .catch((err) => {
        console.log(err)
        reject(requestResponse.common_error)
      }
      );
  });

exports.deleteUser = (id) =>
  new Promise((resolve, reject) => {
    user
      .deleteOne({ _id: ObjectId(id) })
      .then((users) => {
        resolve(requestResponse.common_success)
      })
      .catch((err) => {
        console.log(err)
        reject(requestResponse.common_error)
      }
      );
  });

exports.updateProfile = (id, data) =>
  new Promise((resolve, reject) => {
    try {
      user
        .updateOne(
          { _id: ObjectId(id) },
          { $set: data }
        ).then(() => {
          user
            .find({ _id: ObjectId(id) })
            .then((users) => {
              resolve(requestResponse.commonSuccessWithData(users[0]))
            })
        })
        .catch((err) => {
          reject(requestResponse.common_error)
        })
    } catch (err) {
      console.log(err)
    }
  })

exports.getUserRole = () =>
  new Promise((resolve, reject) => {
    user
      .find({ role: 1 })
      .then((result) => {
        resolve(requestResponse.commonSuccessWithData(result))
      }).catch((err) => {
        reject(requestResponse.common_error)
      })
  })
