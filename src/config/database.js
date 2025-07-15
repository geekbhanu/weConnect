const mongoose = require("mongoose")

const connectDB = async() =>{
    await mongoose.connect(
    "mongodb+srv://bhanusri:EtmjSrISL3AEBz5J@bhanuproject.lm7iv4t.mongodb.net/weConnect"
    )
}
module.exports = connectDB;
