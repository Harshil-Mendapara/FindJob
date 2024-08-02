const express = require('express');
const app = express();
const { fetchUser } = require('../middleware/auth.middleware');
const { resumeUpload } = require('../middleware/fileUpload.middleware');
const role = require('../middleware/role.middleware');
const { JobValidation } = require('../validations/Job.validation');
const { createJob, updateJob, deleteJob, getAllJob } = require("../controller/job.controller")
const { CandidateapplyJob, getAppliedJob, searchJob } = require("../controller/Candidate.controller")


//* recruiter routes
app.post("/add", fetchUser, role('recruiter'), JobValidation, createJob)
app.post("/edit-job/:jobId", role('recruiter'), fetchUser, updateJob);
app.post('/dashboard/manage-job/delete-job/:jobId', fetchUser, deleteJob);


//* candidate route
app.post("/apply-job/:id", fetchUser, role('candidate'), resumeUpload, CandidateapplyJob)
app.get("/getjob", fetchUser, role('candidate'), getAppliedJob)
app.get("/all-job", fetchUser, role(['candidate', 'recruiter', 'admin']), getAllJob)
app.get("/search/:query", fetchUser, role(['candidate', 'recruiter', 'admin']), searchJob)

module.exports = app;   
