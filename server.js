const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const bodyParserErrorHandler = require("express-body-parser-error-handler");
const glob = require("glob");
var cors = require("cors");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(bodyParser.json());

app.use(
  bodyParserErrorHandler({
    errorMessage: (errorMessage = (err) => {
      return err.message;
    }),
  })
);

require("./routers")(app, express);
app.use(function (req, res, next) {
  if (req.url.includes("/auth/")) return next();
  // res.locals._csrf = req.csrfToken();
  next();
});

//define error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.send("invalid path");
  }
});

app.listen(port, () => console.log(`@ http://localhost:${port}`));
