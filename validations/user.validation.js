const { checkSchema } = require("express-validator");
const checkRouteSchema = require("./../utils/checkRouteSchema");

const createUserValidation = checkSchema({
    username: {
        in: ["body"],
        isString: {
            bail: true,
            errorMessage: "Username is required"
        },
        notEmpty: {
            bail: true,
            errorMessage: "Username cannot be empty"
        }
    },
    email: {
        in: ["body"],
        isEmpty: {
            negated: true,
            bail: true,
            errorMessage: "Email cannot be empty"
        },
        isEmail: {
            bail: true,
            errorMessage: "Invalid email value"
        }
    },
    password: {
        in: ["body"],
        isEmpty: {
            negated: true,
            bail: true,
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password must be at least 5 characters"
        }
    },
    role: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Role cannot be empty"
        },
        isIn: {
            options: [['candidate', 'admin', 'recruiter']],
            errorMessage: "Invalid role value"
        }
    }
});

const loginUserValidation = checkSchema({
    usernameOrEmail: {
        in: ["body"],
        isEmpty: {
            negated: true,
            bail: true,
            errorMessage: "Username or Email cannot be empty"
        },
        isEmail: {
            bail: true,
            errorMessage: "Invalid email value"
        }
    },
    password: {
        in: ["body"],
        isEmpty: {
            negated: true,
            bail: true,
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Password must be at least 5 characters"
        }
    }
});

module.exports = {
    createUserValidation: [createUserValidation, checkRouteSchema],
    loginUserValidation: [loginUserValidation, checkRouteSchema],
};
