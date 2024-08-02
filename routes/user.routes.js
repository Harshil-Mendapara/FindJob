const express = require('express');
const app = express();
const { signUp, signIn, logout, updateUser, deleteUserProfileImage } = require("../controller/User.controller")
const { fetchUser } = require('../middleware/auth.middleware');
const { userProfileUpload } = require('../middleware/fileUpload.middleware');


app.post("/signup", signUp);
app.post("/login", signIn);
app.post("/logout", fetchUser, logout);

app.post("/update", fetchUser, userProfileUpload, updateUser);
app.delete("/deleteProfileImage", fetchUser, deleteUserProfileImage);

module.exports = app;
