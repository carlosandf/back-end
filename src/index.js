const app = require('./app.js');
const http = require('http');
const { PORT } = require('../utils/config.js');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports = server;