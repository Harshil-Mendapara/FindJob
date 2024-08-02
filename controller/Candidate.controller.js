const { Candidates, Users, Roles, JobProposals, Jobs, Recruiters } = require("../model");
const { Op } = require('sequelize');

const CandidateapplyJob = async (req, res) => {
    const candidateBody = req.body;
    const { id: userId } = req.user;
    const { id: jobId } = req.params;

    try {
        const appliedJob = await JobProposals.findOne({ where: { userId: userId, jobId: jobId } });

        if (appliedJob) {
            return res.redirect(`/all-jobs?message=${encodeURIComponent('Allready applied In this job')}`);
        }


        const candidate = await Candidates.create({ ...candidateBody, userId: userId });
        if (!candidate) {
            return res.redirect(`/all-jobs?message=${encodeURIComponent('Failed to applied In this job')}`);
        }

        const job = await Jobs.findOne({ where: { id: jobId } });
        if (!job) {
            return res.redirect(`/all-jobs?message=${encodeURIComponent('Job not found')}`);
        }

        const jobProposal = await JobProposals.create({
            status: 'Pending',
            userId: userId,
            candidateId: candidate.id,
            jobId: job.id,
        });

        if (jobProposal) {
            return res.redirect(`/all-jobs?message=${encodeURIComponent('Applied successfully')}`);
        }

        return res.redirect('/all-jobs');

    } catch (error) {
        return res.redirect(`/all-jobs?message=${encodeURIComponent('Internal Server Error')}`);
    }
}


const getAppliedJob = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const candidates = await JobProposals.findAll({
            where: { userId: userId },
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
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
                    include: [{
                        model: Recruiters,
                        as: "recruiter"
                    }]
                },
            ]
        });

        return res.render('my-applications', {
            user: req.user,
            candidate: candidates,
        });

    } catch (error) {
        const Message = 'Internal Server Error';
        return res.redirect(`/dashboard/my-applications?message=${encodeURIComponent(Message)}`);
    }
}



const searchJob = async (req, res) => {
    const { id: userId } = req.user;
    const { query } = req.params;

    try {
        const results = await Jobs.findAll({
            where: {
                [Op.or]: [
                    { position: { [Op.like]: `%${query}%` } },
                    { company: { [Op.like]: `%${query}%` } },
                    { location: { [Op.like]: `%${query}%` } },
                    { skills: { [Op.like]: `%${query}%` } },
                    { job_type: { [Op.like]: `%${query}%` } },
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'recruiterId'] },
        });

        const user = await Users.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        });
        res.json({ results, user: user.role });
    } catch (error) {
        return res.redirect(`/all-jobs?message=${encodeURIComponent('Internal Server Error')}`);
    }
}


module.exports = {
    CandidateapplyJob,
    getAppliedJob,
    searchJob
}