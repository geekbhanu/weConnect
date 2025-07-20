const validator = require("validator");
const { all } = require("../routes/auth");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
}
const validateEditProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedFields.includes(field); // Add 'return' here
    });
    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData
}
