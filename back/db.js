const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://goalUser:' +
  process.env.MONGO_ATLAS_PW +
  '@goals-app-p9rxi.mongodb.net/goalUserDB?retryWrites=true&w=majority',
  {
    useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Mongodb connected...............')
  })

mongoose.Promise = global.Promise;