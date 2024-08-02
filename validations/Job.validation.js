const { checkSchema } = require('express-validator');
const checkRouteSchema = require("../utils/checkRouteSchema");

const JobValidation = checkSchema({
    position: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide a title'
        }
    },
    company: {
        in: ['body'],
        optional: true,
        notEmpty: {
            errorMessage: 'Please provide a company name'
        }
    },
    location: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide a location'
        }
    },
    salary: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide a salary'
        }
    },
    skills: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide required skills'
        }
    },
    job_type: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide an employment type'
        }
    },
    experience: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide an experience level'
        }
    },
    qualifications: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide qualifications'
        }
    },
    description: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please provide a description'
        }
    },
});

module.exports = {
    JobValidation: [JobValidation, checkRouteSchema],
};
