const { Recruiters, Users, Jobs, Candidates, JobProposals } = require("../model");

const createRecruiter = async (req, res) => {
    const recruiterBody = req.body;
    const { id: userId } = req.user;

    try {
        const recruiter = await Recruiters.create({ ...recruiterBody, userId: userId });

        if (!recruiter) {
            return res.redirect(`/signup/recruiter-profile?message=${encodeURIComponent('Failed to create Recruiter Profile')}`);
        }
        return res.redirect(`/?message=${encodeURIComponent('Register Successfully')}`);
    } catch (error) {
        console.error("eror", error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}


const getRecruiterAllJob = async (req, res) => {
    const { id: userId } = req.user;

    try {

        //*  Find the job created by recruiter
        const recruiter = await Users.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'roleId'] },
            include: [{
                model: Jobs,
                as: 'jobs',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
        });

        if (!recruiter) {
            return res.status(404).json({ error: true, message: 'Recruiter not found' });
        }

        return res.render('ManageJob', {
            user: req.user,
            jobs: recruiter.jobs,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

const getCandidateAppliedJob = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const job = await Jobs.findAll({
            where: { userId },
            attributes: ['id', 'position', 'company', 'location', 'salary', 'skills', 'job_type', 'experience', 'qualifications', 'description']
        });

        const jobIds = job.map(jobs => jobs.id);

        const candidateAppliedJob = await JobProposals.findAll({
            where: { jobId: jobIds },
            attributes: { exclude: ['candidateId', 'createdAt', 'updatedAt', 'userId'] },
            include: [
                {
                    model: Candidates,
                    as: 'candidate',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Jobs,
                    as: 'job',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'recruiterId'] },
                }
            ]
        });
        return res.render('Application', {
            user: req.user,
            candidate: candidateAppliedJob,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

const updateJobStatus = async (req, res) => {
    const { candidateId } = req.params;
    const { status } = req.body;

    try {
        const jobProposal = await JobProposals.findOne({ where: { candidateId } });

        if (!jobProposal) {
            return res.status(404).json({ error: true, message: "Job proposal not found" });
        }

        jobProposal.status = status;
        await jobProposal.save();

        return res.status(200).json({ error: false, message: "Job proposal updated successfully", jobProposal });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error:', error: error.message });
    }
}


module.exports = {
    createRecruiter,
    getRecruiterAllJob,
    getCandidateAppliedJob,
    updateJobStatus
}


