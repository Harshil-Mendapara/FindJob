const { Jobs, Recruiters } = require("../model");

const createJob = async (req, res) => {
    const jobBody = req.body;
    const { id: userId } = req.user;

    try {
        const recruiterProfile = await Recruiters.findOne({
            where: { userId: userId },
        });

        if (!recruiterProfile) {
            return res.status(404).json({ error: true, message: "Recruiter profile not found" });
        }

        const job = await Jobs.create({ ...jobBody, userId: userId, recruiterId: recruiterProfile.id });

        if (!job) {
            return res.status(500).json({ error: true, message: "Failed to create job" });
        }
        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Job Created Successfully')}`);

    } catch (error) {
        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Internal Server Error')}`);
    }
};


const updateJob = async (req, res) => {
    const jobBody = req.body
    const { jobId } = req.params;
    const { id: userId } = req.user;


    try {
        const [job] = await Jobs.update(jobBody, { where: { id: jobId, userId: userId } });

        if (job === 0) {
            return res.status(500).json({ error: true, message: "Failed to update job", job });
        }

        const updatedJob = await Jobs.findOne({
            where: { id: jobId, userId: userId },
            attributes: { exclude: ['jobId', 'createdAt', 'updatedAt', 'userId', 'recruiterId'] }
        });

        if (!updatedJob) {
            return res.status(404).json({ error: true, message: "Job not found or not authorized to update" });
        }

        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Job Updated Successfully')}`);
    } catch (error) {
        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Internal Server Error')}`);
    }
};


const findJob = async (req, res) => {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    try {
        const job = await Jobs.findOne({
            where: { id: jobId, userId: userId },
            attributes: { exclude: ['userId', 'recruiterId', 'createdAt', 'updatedAt'] }
        });

        if (!job) {
            return res.status(404).json({ error: true, message: "Job not found" });
        }
        // res.send(job)
        res.render('edit-job', { user: req.user, job });
    } catch (error) {
        console.error("Error fetching job:", error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}


const deleteJob = async (req, res) => {
    const { jobId } = req.params;
    const { id: userId } = req.user;

    try {
        const job = await Jobs.destroy({
            where: { id: jobId, userId: userId }
        });

        if (!job) {
            return res.status(404).json({
                error: true,
                message: "Job not found or not authorized to delete"
            });
        }
        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Job deleted Successfully')}`);

    } catch (error) {
        return res.redirect(`/dashboard/manage-job?message=${encodeURIComponent('Internal Server Error')}`);
    }
};


const getAllJob = async (req, res) => {

    try {
        const jobs = await Jobs.findAll();
        if (!jobs) {
            return res.status(404).json({ error: true, message: 'Job not found' });
        }
        res.render('all-jobs', {user:req.user,  jobs });

    } catch (error) {
        console.error("eror", error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}


module.exports = {
    createJob,
    updateJob,
    deleteJob,
    findJob,
    getAllJob
}