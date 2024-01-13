const express = require('express')
const router = express.Router()
const {createUser, loginUser} = require('../controllers/authController')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const User = require('../models/userModel')
const UserDetails = require('../models/userDetails')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, 'showcase', { expiresIn: '200d'})
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

router.post("/photo", upload.single("photo"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const path = url + "/files/" + req.file.filename;
  const filename = req.file.filename;
  const {email, username, password, type, experience,} = req.body
  try{
    if(!email || !password){
        throw Error('please fill in email and password')
    }

    const exists = await User.findOne({email})

    if(exists){
        throw Error('email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({email,username, password: hash,})
        const userdetails = await UserDetails.create({        user_id: user._id,
          type,
          experience,
          website:'website',
          location:'locat',
          repo:'hhhdhd',photo:path})
    const token = createToken(user._id)

    res.status(200).json({user, token,userdetails})
    console.log(user, token)
    
}catch(error){
    res.status(400).json({error: error.message})
    console.log(error.message)
}
});


//login user
router.post('/login', loginUser)

//signin user
router.post('/create', createUser)

module.exports = router