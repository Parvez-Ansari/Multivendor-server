const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());

const SERVER_SECRET = "abdrakadabra"

require('./Database/MultivendorApp')

app.use(cors())

// signup Schema for users

const User = require("./Schema/UserSchema")

// regular expressions

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/



app.get('/', function (req, res)
{

  res.send("ohk")
})


// handing user login here

app.post('/login', async function (req, res)
{
  const { email, password } = req.body

  // declared user as null for checking condition
  let user = null

  try
  {
    // find user with his email 
    user = await User.findOne({ email })

    if (user)
    {
      // checking user password is correcr or not
      const verified = await bcrypt.compare(password, user.password)

      if (verified)
      {
        // generating token here
        var token = jwt.sign({ id: user.uniqueID }, SERVER_SECRET);

        //sanding response to clint side 
        res.send({ status: "OK", msg: "Login Successfully", token })
        console.log('success')
      } else
      {
        res.send({ status: "ERR", msg: "Invalid mobile or password" })
        console.log('failed');
      }
    } else
    {
      res.send({ status: "ERR", msg: "Invalid mobile or password" })
      console.log('failed');
    }
  } catch (err)
  {
    res.send('something went wrong with database')
    console.log(err)
  }


})

//user registration/signup handing here

app.post('/signup', async (req, res) =>
{
  const { name, email, password, uniqueID } = req.body

  // checking user email is valid or not here
  if (!emailRegex.test(email))
  {
    res.send('invalid credential')
  } else
  {
    // checking email ise already  taken o not 
    if (await User.findOne({ email }))
    {
      res.send('user already exist')
    } else
    {
      try
      {
        // encryping user  password
        const hash = await bcrypt.hash(password, saltRounds)

        // saving user data
        await User.create({ name, email, password: hash, uniqueID })

        // sending response to clint side 
        res.send({ msg: "user registered" })
      } catch (err)
      {
        res.send('something went wrong woth database')
        console.log(err)
      }
    }
  }
})





const port = 8080

app.listen(port, () =>
{
  console.log(`server is running at port ${ port }`)
})