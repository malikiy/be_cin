const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config/constantConfig');

// //call for routers
const userRouter = require('./src/router/userRoute').router;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use ((req, res, next) => {
    res.jsonf = (code, status, message, response)=> {
      res.json({
        code:code,
        status:status,
        message:message,
        response : response
      }).status(code)
    }
  
    res.jsond = (httpStatus, code, status, message, response)=> {
      res.json({
        code:code,
        status:status,
        message:message,
        response : response
      }).status(httpStatus)
    }
    next()
  });

//Health check
app.get('/api/health-check', (req, res) => {
  res.json({ message:"Health check success" }).status(200)
})

//prefix declaration

app.use("/api/user",
    userRouter,
);

app.listen(config.port, () => {
    console.log('service started on port', config.port);
})