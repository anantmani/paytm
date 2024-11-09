const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@paytmdb.tqeqs.mongodb.net/"
);
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    balance : Number
})
const Users = mongoose.model("User", UserSchema);
const Accounts = mongoose.model("Accounts", AccountSchema);

module.exports = { Users,Accounts };