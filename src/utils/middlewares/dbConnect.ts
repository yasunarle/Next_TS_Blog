import mongoose from 'mongoose'

console.log('--- dbConnect.ts')

const { MONGO_TEST_URL } = process.env
const options = { useNewUrlParser: true, useUnifiedTopology: true }
let db: mongoose.Connection | null = null

if (!MONGO_TEST_URL) {
  throw new Error(
    'Please define the MONGO_TEST_URI environment variable inside .env.local'
  )
}

const dbConnect = async () => {
  if (db) {
    return db
  }
  db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('--- Mongo First Connected')
  })

  await mongoose.connect(MONGO_TEST_URL, options)
  return db
}

export default dbConnect
