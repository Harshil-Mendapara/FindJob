const express = require('express');
const app = express();
const role = require('../middleware/role.middleware');
const { fetchUser } = require('../middleware/auth.middleware');
const { adminController, adminMamageUser, updateUserRole, deleteUser } = require('../controller/Admin.controller');

app.get("/", fetchUser, role('admin'), adminController);
app.get("/manage-user", fetchUser, role('admin'), adminMamageUser);
app.post("/update-role/:userId", fetchUser, role('admin'), updateUserRole);
app.post("/delete-user/:userId", fetchUser, role('admin'), deleteUser);

module.exports = app
