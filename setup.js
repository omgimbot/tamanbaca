const config = require('./config/config.json')
const mongodbUri = config['database']['production']['uri']
const client = require('mongoose')

const options = {
  // useMongoClient: true,
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // buffemessageaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true
};


function dbConnect () {
  return new Promise((resolve, reject) => {
    client.Promise = global.Promise;
    client.connect(mongodbUri, options, (err, database) => {
      if (err) {
        console.log("Connected to mongodb server failed");
        reject(err);
      } else
      console.log("mongoDb connected!")
        resolve(database)
    });
  });
}

const requestResponse = {
  commonSuccessWithData: (result) => {
    return {
      status: true,
      rc: '0000',
      message: 'Berhasil Memuat permintaan',
      result: result
    }
  },
  common_have_perpus: {
    status: false,
    rc: '0000',
    message: 'Anda Sudah Memiliki Perpus!'
  },
  common_success: {
    status: true,
    rc: '0000',
    message: 'Berhasil memuat permintaan'
  },
  common_nodata: {
    status: false,
    rc: '0000',
    message: 'Tidak ada data'
  },
  common_delete: {
    status: true,
    rc: '0000',
    message: 'Berhasil menghapus data'
  },
  common_success_simple: {
    status: true,
    rc: '0000',
    message: 'Berhasil memuat permintaaan'
  },
  account_not_found: {
    status: false,
    rc: '401',
    message: 'Cek kembali username / password anda'
  },
  common_error: {
    status: false,
    rc: '5000',
    message: 'Server tidak merespon, silahkan hubungi call center untuk info lebih lanjut'
  },
  token_invalid: {
    success: false,
    rc: '0030',
    message: 'Akses ditolak! Sesi Anda telah berakhir atau tidak valid'
  },
  email_already_use: {
    status: false,
    rc: '0011',
    message: 'Email sudah digunakan'
  },
  username_already_use: {
    status: false,
    rc: '0011',
    message: 'Username sudah digunakan'
  },
  phone_number_already_use: {
    status: false,
    rc: '0012',
    message: 'Nomor telepon telah digunakan'
  },
  user_already_like: {
    status: true,
    rc: '0013',
    message: 'Like'
  },
  invalid_token: {
    status: false,
    rc: '0030',
    message: 'Sesi anda telah berakhir, Silahkan login kembali !'
  },
  sudah_ada_data: {
    status: false,
    rc: '0056',
    message: 'Sudah ada data'
  },
  gagal_memuat: {
    status: false,
    rc: '0058',
    message: 'Gagal Memuat'
  },
  tidak_ada_data: {
    status: false,
    rc: '0058',
    message: 'Tidak ada data'
  },
  lengkapi_data: {
    status: false,
    rc: '0105',
    message: 'Lengkapi data profile anda'
  },
  berhasil_transaksi: {
    status: true,
    rc: '0105',
    message: 'Berhasil transaksi'
  }
}

module.exports = { requestResponse, mongodbUri, dbConnect }
