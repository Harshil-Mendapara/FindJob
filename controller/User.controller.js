const { Users, Roles } = require("../model");
const { compare } = require('bcrypt');
const { Op } = require('sequelize');
const path = require('path');
const { promises: fsPromises } = require('fs');


//* Register new user
const signUp = async (req, res) => {
    const userBody = req.body;

    try {
        //* Create new user
        const role = await Roles.create({ name: userBody.role });
        const user = await Users.create({ ...userBody, roleId: role.id });
        const { id, username, email, gender, contactNo, location, profileImage } = user;
        req.session.user = { id, username, email, gender, contactNo, location, profileImage, role: role.name };
        if (role.name === 'recruiter') {
            return res.redirect("/signup/recruiter-profile")
        }
        req.session.save(() => {
            return res.redirect(`/?message=${encodeURIComponent('Register Successfully')}`);
        });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};


const signIn = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const loginUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            },
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        });

        if (!loginUser) {
            return res.redirect(`/login?message=${encodeURIComponent('Invalid username or email')}`);
        }

        const passwordMatch = await compare(password, loginUser.password);

        if (!passwordMatch) {
            return res.redirect(`/login?message=${encodeURIComponent('Incorrect password')}`);
        }

        const { id, username, email, gender, contactNo, location, profileImage, role } = loginUser;

        req.session.user = { id, username, email, gender, contactNo, location, profileImage, role: role.name };
        req.session.save(() => {
            res.redirect(`/?message=${encodeURIComponent('Login Successfully')}`);
        });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};


const updateUser = async (req, res) => {
    const userBody = req.body;
    const { id: userId } = req.user;

    try {
        const user = await Users.update(
            { ...userBody },
            { where: { id: userId } }
        );

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }


        const updatedUser = await Users.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        });

        const { id, username, email, gender, contactNo, location, profileImage, role } = updatedUser
        req.session.user = { id, username, email, gender, contactNo, location, profileImage, role: role.name };
        req.session.save(() => {
            return res.redirect(`/dashboard?message=${encodeURIComponent('Profile updated')}`);
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

const deleteUserProfileImage = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        const profileImagePath = user.profileImage;
        if (!profileImagePath) {
            return res.status(400).json({ error: true, message: 'No profile image to delete' });
        }

        const fullPath = path.join(__dirname, '..', 'public', profileImagePath);
        try {
            await fsPromises.unlink(fullPath)
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: 'Error deleting profile image' });
        }

        await Users.update({ profileImage: null }, { where: { id: userId } });
        return res.status(200).json({ error: false, message: 'Profile image deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};


const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        res.redirect(`/login?message=${encodeURIComponent('Logout Done')}`);
    });
};

module.exports = {
    signUp,
    signIn,
    updateUser,
    deleteUserProfileImage,
    logout,
};

