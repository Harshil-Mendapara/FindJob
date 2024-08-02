const multer = require('multer');
const { extname } = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
createDirectory('public/upload');
createDirectory('public/Resume');

//* User profile upload
const ProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload");
    },
    async filename(req, file, cb) {
        const Id = uuidv4();
        const filePath = `upload/${Id}${extname(file.originalname)}`;
        req.body.profileImage = filePath;
        cb(null, `${Id}${extname(file.originalname)}`);
    }
});

const userProfileUpload = multer({
    storage: ProfileStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter(req, file, cb) {
        cb(null, extname(file.originalname));
    }
}).single("profileImage");


//* Candidate resume upload
const ResumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Resume");
    },
    async filename(req, file, cb) {
        const Id = uuidv4();
        const filePath = `Resume/${Id}${extname(file.originalname)}`;
        req.body.resume = filePath;
        cb(null, `${Id}${extname(file.originalname)}`);
    }
});

const resumeUpload = multer({
    storage: ResumeStorage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter(req, file, cb) {
        cb(null, extname(file.originalname));
    }
}).single("resume");


module.exports = { userProfileUpload, resumeUpload };
