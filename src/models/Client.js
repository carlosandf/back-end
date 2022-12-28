const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clientSchema = new Schema({
  firstName: { type: String, required: true },
  lastname: { type: String, required: true },
  fullName: { type: String },
  documentNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  date: Date
})

clientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

clientSchema.plugin(uniqueValidator, { message: 'invalid {PATH}' });
const Client = model('Client', clientSchema);

module.exports = Client;