const clientsRouter = require('express').Router();
const Client = require('../models/Client.js');


clientsRouter.get('/', async (req, res) => {
  const Allclients = await Client.find({})
  res.json(Allclients.reverse());
});

clientsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    res.status(200).json(client);
  } catch (error) {
    next(error);
    return res.status(400).json(error);
  }
})

clientsRouter.post('/', async (req, res) => {
  const {
    firstName,
    lastname,
    identification,
    address,
    phone,
  } = req.body;

  try {
    const client = new Client({
      firstName,
      lastname,
      fullName: `${firstName} ${lastname}`,
      identification,
      address,
      phone,
      date: new Date()
    });

    const savedClient = await client.save();
    res.status(201).json(savedClient);

  } catch (error) {
    return res.status(400).json(error);
  }
});

clientsRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const clientToUpdate = {
    ...body,
    fullName: `${body.firstName} ${body.lastname}`
  }

  const updated = await Client.findByIdAndUpdate(id, clientToUpdate, { new: true });
  try {
    res.status(201).json(updated).end();
  } catch (error) {
    next(error);
    return res.status(400).json(error);
  }
});

clientsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    res.status(200).json(deletedClient);
  } catch (error) {
    next(error);
    return res.status(400).json(error);
  }
});

module.exports = clientsRouter;