const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Storage config for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save to uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// File filter for PDF and image types  -- new added 
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else 
//     cb(new Error('Only PDF and image files are allowed'), false);
//   }
// };

// const fileFilter = (req, file, cb) => {
//   const mime = file.mimetype;
//   console.log("Received mimetype:", mime);

//   // Allow if it's definitely PDF or image
//   if (
//     mime === 'application/pdf' ||
//     mime.startsWith('image/')
//   ) {
//     cb(null, true);
//   } else {
//     console.warn("File rejected due to type:", mime);
//     cb(new Error('Only PDF and image files are allowed'), false);
//   }
// };


//const upload = multer({ storage, fileFilter }); // new added 

// 🔸 In-memory array to store assignment info
const assignments = [];

//POST assignments - Upload assignments
router.post('/', authenticateToken, upload.single('assignment'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
    //return res.status(400).json({ message: 'No valid file uploaded (PDF/images only)' });
  }
var { title, description } = req.body;
if (!title) {
    title = file.originalname;
}
description = file.mimetype;

  assignments.push({
    userId: req.user.id,
    title: title || 'Untitled',
    description: description || '',
    filePath: file.path,
    originalFileName: file.originalname,
    createdAt: new Date()
  });

  res.status(201).json({ message: 'Assignment uploaded successfully' });
});

//GET /assignments list of assingmnets by logged in user
router.get('/', authenticateToken, (req, res) => {
  //const userAssignments = assignments.filter(a => a.username === req.user.username);
  const userAssignments = assignments.filter(a => a.userId === req.user.id);  // new added 
  res.json(userAssignments);
});

module.exports = router;
