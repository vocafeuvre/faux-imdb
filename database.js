const mongoose = require("mongoose")

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASS
const host = process.env.MONGO_HOST
const dbname = process.env.MONGO_DBNAME
const prefix = process.env.MONGO_PREFIX == undefined ? "" : process.env.MONGO_PREFIX

const credentials = (username && password) ? `${username}:${password}` : ""
const credAndHost = (credentials.length !== 0) ? `${credentials}@${host}` : host

const mongoURL = `mongodb${prefix}://${credAndHost}/${dbname}?retryWrites=true`

mongoose.connect(mongoURL, { useNewUrlParser: true });

module.exports = mongoURL