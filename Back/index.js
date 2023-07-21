const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadRouter = require('./router');

app.get('/', (req, res) => {
  res.json("Está tudo bem!")
});

app.use("/upload", uploadRouter);

app.listen(8080, () => {
  console.log('Form running on port 8080');
});
