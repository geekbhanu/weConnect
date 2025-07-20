const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true, // Ensure emailId is stored in lowercase
        required: true, // Ensure emailId is required
        unique: true, // Ensure emailId is unique
        trim: true, // Remove any leading or trailing whitespace
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid :" + value );
            }

        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                throw new Error("Password is not strong enough");
            }   
        }    
    },
    age: {
        type: Number,
        min: 18,
        max: 50,        
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
        }
    },
},
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISuukVSb_iHDfPAaDKboFWXZVloJW9XXiwGYFab-QwlAYQ3zFsx4fToY9ijcVNU5ieKk&usqp=CAU", // Default profile picture URL
        validate(value) {
        if (!validator.isURL(value)) {
            throw new Error("Photo URL is not valid: " + value);
        }
        },
    },
    about: {
        type: String,
        default: "This is a default about the user"
    },
    skills: {
        type: [String],
    }
},
{
    timestamps: true // Automatically manage createdAt and updatedAt fields
}
);
userSchema.methods.getJWT = async function() {
    const user = this; // 'this' refers to the current user instance
const token = await jwt.sign({_id: user._id}, "dev@weconnect2323", {
    expiresIn: "7d" // Token expiration time)
});
return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    // Use the variable, not the string
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
// Mongoose Model
module.exports = mongoose.model("User", userSchema);