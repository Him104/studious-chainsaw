const express = require('express');
const router = require("./route")
const { default: mongoose } = require('mongoose');
require('dotenv').config();


const app = express();

app.use(express.json());

app.use(router)

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});