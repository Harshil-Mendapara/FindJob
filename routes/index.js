const router = require('express').Router();
const { fetchUser, Authenticated } = require('../middleware/auth.middleware');
const { findJob, getAllJob } = require("../controller/job.controller")
const { getAppliedJob } = require("../controller/Candidate.controller")
const { adminController, adminMamageUser } = require('../controller/Admin.controller');
const { getRecruiterAllJob, getCandidateAppliedJob } = require("../controller/Recruiter.controller")

const usersRouter = require('./user.routes');
const jobRouter = require('./job.routes');
const Recruiterouter = require('./recruiter.routes');
const adminRouter = require('./admin.routes');

router.use('/user', usersRouter);

router.get("/", fetchUser, (req, res) => { res.render('index') })

router.get("/signup", Authenticated, (req, res) => { res.render('register') });
router.get("/login", Authenticated, (req, res) => { res.render('login') });

//* recruiter profile page
router.get("/signup/recruiter-profile", (req, res) => { res.render('recruiter_profile') })
router.get("/all-jobs", fetchUser, getAllJob, (req, res) => { res.render('all-jobs', { user: req.user }) })

router.use('/job', jobRouter);

//* Recruiter Router
router.use('/recruiter', jobRouter);


router.get('/dashboard', fetchUser, (req, res) => {
    res.render('dashboard', { user: req.user });
});

router.get('/dashboard/edit-profile', fetchUser, (req, res) => {
    res.render('edit-profile', { user: req.user });
});

//* candidate all application
router.get('/dashboard/my-applications', fetchUser, getAppliedJob, (req, res) => {
    res.render('my-applications', { user: req.user });
});

//* recruiter Dashboard
router.use('/recruiter', Recruiterouter);
router.use('/user', Recruiterouter);

router.get('/dashboard/add-job', fetchUser, (req, res) => {
    res.render('create-job', { user: req.user });
});


router.get('/dashboard/manage-job', fetchUser, getRecruiterAllJob, (req, res) => {
    res.render('ManageJob');
});


router.get('/dashboard/manage-job/edit-job/:jobId', fetchUser, findJob, (req, res) => {
    res.render('edit-job', { user: req.user, job: req.job })

});

router.get('/dashboard/applications', fetchUser, getCandidateAppliedJob, (req, res) => {
    res.render('Application');
});

router.get('/dashboard/applications/candidate-detail', fetchUser, (req, res) => {
    res.render('candidate-detail', { user: req.user });
});


//* Candidate Apply job
router.use('/candidate', jobRouter);

//* Admin routes
router.use('/admin', adminRouter)
router.get('/dashboard/admin', fetchUser, adminController, (req, res) => {
    res.render('admin', { user: req.user });
});
router.get('/dashboard/manage-user', fetchUser, adminMamageUser, (req, res) => {
    res.render('admin-manage-user', { user: req.user });
});

module.exports = router;