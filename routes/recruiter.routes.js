const express = require('express');
const app = express();
const { fetchUser } = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { createRecruiter, getRecruiterAllJob, getCandidateAppliedJob, updateJobStatus } = require("../controller/Recruiter.controller")


app.post("/recruiter-profile", fetchUser, role('recruiter'), createRecruiter)
app.put("/updatejobstatus/:candidateId", fetchUser, role('recruiter'), updateJobStatus)
app.get("/get-all-job", fetchUser, role('recruiter'), getRecruiterAllJob);
app.get("/find-candidate-aplly-job", fetchUser, role('recruiter'), getCandidateAppliedJob);

module.exports = app;
