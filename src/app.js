require('dotenv').config()

const http = require('http');
const router = require('./routes/index');
const server = http.createServer(async (request, response) => router.routes(request, response));
server.listen(process.env.APP_PORT || 3000, () => console.log(`Server started on port ${process.env.APP_PORT || 3000}`));

