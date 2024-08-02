const { Users, Roles, Jobs, JobProposals } = require("../model");

const adminController = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        const roles = await Roles.findAll();

        const roleCounts = {};
        const roleIdMap = {};

        roles.forEach(role => {
            if (!roleIdMap[role.name]) {
                roleIdMap[role.name] = [];
            }
            roleIdMap[role.name].push(role.id);
        });

        for (const [roleName, ids] of Object.entries(roleIdMap)) {
            const roleCount = await Users.count({ where: { roleId: ids } });
            roleCounts[roleName] = roleCount;
        }


        const jobs = await Jobs.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        const statuses = ['Pending', 'Reviewed', 'Intreview', 'Selected', 'Rejected'];
        const statusCounts = {};

        for (const status of statuses) {
            const statusCount = await JobProposals.count({ where: { status } });
            statusCounts[status] = statusCount;
        }

        res.render('admin', {
            user: req.user,
            allUser: users.length,
            roles: roleCounts,
            jobs: jobs.length,
            jobStatus: statusCounts,
        });

    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error', error: error.message });
    }
}

const adminMamageUser = async (req, res) => {
    try {
        const allUser = await Users.findAll({
            attributes: ['id', 'username', 'email'],
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        });

        return res.render('admin-manage-user', {
            user: req.user,
            users: allUser,
            userId: req.user.id
        });

    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error', error: error.message });
    }
}

const updateUserRole = async (req, res) => {
    const { newRoleName } = req.body;
    const { userId } = req.params

    try {
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        const role = await Roles.findByPk(user.roleId);
        if (!role) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }
        role.name = newRoleName;
        await role.save();
        return res.redirect('/dashboard/manage-user')

    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user role', message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { userId } = req.params

    try {
        await Users.destroy({ where: { id: userId } });

        return res.redirect('/dashboard/manage-user')

    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error:', error: error.message });
    }
}

module.exports = {
    adminController,
    adminMamageUser,
    updateUserRole,
    deleteUser
}