const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const uploadConfig = require('./config/upload');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files',express.static(uploadConfig.localArmazenamento));
app.use(routes);

app.listen(3333,() => {
  console.log("Server in http://localhost:3333");
});
