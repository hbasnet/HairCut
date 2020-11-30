const express = require('express')
const bodyParser = require("body-parser")
const InitiateMongoServer = require("./db.js")
const User = require("./model.js")
const auth = require('./auth.js');
//const { use } = require('../nephacks/NepHacks/AuthApp/routes/user.js')
const app = express()
const port = 4000

//Database connection
InitiateMongoServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// User Register Route
app.post('/register', async (req, res) => {
  try {
    let user = await User.findOne({ Phone: req.body.phone });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    user = new User({
      Name: req.body.Name,
      Phone: req.body.Phone,
      Visited: 0 // visited first time
    });
    await user.save();
    const token = await user.generateAuthToken();
    //res.send({ user, token });

    //const token = await user.generateAuthToken();
    //res.send({ user, token });
    res.send({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }

})
//login route
app.post('/login', async (req, res) => {
  const phone = req.body.Phone;
  const user = await User.findOne({ Phone: req.body.Phone });
  if (user) {
    const token = await user.generateAuthToken();
    res.send({ token, phone });
  } else {
    res.send('User does not exist!');
  }

})
//get all user route
app.post('/getUser', async (req, res) => {
  const admin = req.body.Phone;

  const allUser = await User.find();
  let data = []
  if (admin === "000-000-0000") {
    for (i = 0; i < allUser.length; i++) {
      if (allUser[i].Phone == admin) {
        continue
      } else {
        data.push(allUser[i])
      }
    }

  }
  res.send(data);
})
//Appointment route
app.post('/visited', auth, async (req, res) => {
  //const Phone = req.body.Phone
  console.log(req.headers.authorization);
  const user = await User.findOne({ Phone: req.user.Phone });
  //console.log(user);
  //user.update()
  //let Visited = 0;
  if (user) {
    if (user.Visited == 5) {
      user.update(
        { $set: { Visited: 0 } },
        function (err, success) {
          if (err) {
            //console.log(err);
          } else {
            //console.log(success);
          }
        }
      )
      const updated_user = await User.findOne({ Phone: req.user.Phone });
      res.send({ updated_user });
      //Visited = 10;
      //res.send({ Visited, token });
    } else {
      Visited = user.Visited + 1;
      user.update(
        { $set: { Visited: Visited } },
        function (err, success) {
          if (err) {
            //console.log(err);
          } else {
            //console.log(success);
          }
        }
      )
      setTimeout(async () => {
        const updated_user = await User.findOne({ Phone: req.user.Phone });
        res.send({ updated_user });
      }, 2000)

      //await user.save()

    }

  }
}
)


app.listen(port, () => {
  console.log(`Loyalty app listening at http://localhost:${port}`)
})