const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const apiRouter = require('./routes');
const errorHandler = require('./middlewares/errorsHandling');
require('dotenv').config();

//mongoDb connect
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority` 
).then(() => {
  console.log("successfully connect to database")
}).catch(err=>console.log(err))

//Middlewares & routes
app.use(cors());
app.use(bodyParser.json())
app.use("/api/v1", apiRouter)
app.use(errorHandler);

// start app
app.listen(process.env.PORT, function () {
  console.log("Server launch");
}); 