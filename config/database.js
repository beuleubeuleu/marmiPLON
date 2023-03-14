const mongoose      = require('mongoose');
const { MONGO_URI } = process.env;
exports.connect     = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    /*  useCreateIndex    : true,
      useFindAndModify  : false*/
  })
      .then(() => {
        console.log("connected to the future")
      })
      .catch((err) => {
        console.log("database connection error")
        console.error(err)
        process.exit(1)
      })
}