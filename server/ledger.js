const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const {urlencoded} = require('body-parser');
//==============================================
const connectDB = require('./config/connectDB.js');
const db = connectDB.init();
connectDB.open(db);
//==============================================
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
//==============================================
const ledger = () => {
  app.get('/ledger', (req, res) => {
    const sqlQuery = "select * from ledger"
    db.query(sqlQuery, (err, result) => {
      res.send(result);
      console.log('result', result);
    })
  });
};


module.exports = ledger;