const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/config.js');

const mongoDbConnect = async () => {
  mongoose.set('strictQuery',false);
  const resp = await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

  try {
    console.log(`MongoDB Connected: ${resp.connection.host}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongoDbConnect;