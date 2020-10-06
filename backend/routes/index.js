var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require("cors");
var pgp = require("pg-promise")(/* options */);
var USER_ACCOUNTS = pgp("postgres://postgres:qwerty@127.0.0.1:5432/User");

router.use(cors());
// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));
let username = "";

const SELECT_ALL_QUERY = 'SELECT * FROM "USER_ACCOUNTS" ORDER BY username ASC';

router.post("/signUp", function (request, response) {
  let requestBodyData = request.body;
  let validatedData = makeData(requestBodyData);

  validatedData
    .then(function (resolve) {
      const INSERT_QUERY = pgp.helpers.insert(resolve, null, "USER_ACCOUNTS");
      USER_ACCOUNTS.none(INSERT_QUERY)
        .then(function () {
          response.status(200).json({
            status: true,
          });
        })
        .catch((error) => {
          response.send(`ERROR`);
        });
    })
    .catch((error) => {
      console.log(error, "ERROR IN DATA");
      response.send(error);
      return;
    });
});

let makeData = (data) => {
  if (data.length === 0) {
    Promise.reject("NO DATA TO MAKE");
  } else {
    return Promise.resolve(data.savePayLoad);
  }
};

router.post("/logIn", function (request, response) {
  let requestBodyData = request.body;
  makeAuthentication(requestBodyData, response);
});

let makeAuthentication = (requestBodyData, response) => {
  ({ username, password } = requestBodyData);
  const CHECK_USER_PRESENCE_QUERY = `SELECT exists (SELECT 1 FROM "USER_ACCOUNTS" WHERE username = '${username}' LIMIT 1)`;
  const GET_PASSWORD_QUERY = `(SELECT password FROM "USER_ACCOUNTS" WHERE username = '${username}' LIMIT 1)`;
  let valid_user = false;
  USER_ACCOUNTS.any(CHECK_USER_PRESENCE_QUERY).then(function (result) {
    if (result[0].exists) {
      USER_ACCOUNTS.any(GET_PASSWORD_QUERY).then(function (dbPassword) {
        if (dbPassword[0].password === password) {
          getAllData(response);
        }
      });
    }
  });
};

let getAllData = (response) => {
  USER_ACCOUNTS.any(SELECT_ALL_QUERY)
    .then(function (data) {
      response.status(200).json({
        status: "LOGIN SUCCESS",
        data: data,
        message: "Retrieved ALL puppies",
      });
    })
    .catch((error) => {
      response.send(`ERROR`);
    });
};
module.exports = router;
