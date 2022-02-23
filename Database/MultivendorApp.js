const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Geeksdoor:Geeksdoor@cluster0.8f2it.mongodb.net/MultivendorApp?retryWrites=true&w=majority')
  .then((res) =>
  {
  console.log('Database connected')
  }).catch((err) =>
  {
  console.log(err)
})