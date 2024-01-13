const express = require('express')
const router = express.Router()
const {getInfo, deleteUser, changePassword, editDetails, checkPassword} = require('../controllers/userController')
const Auth = require('../middlewear/requireAuth')
router.use(Auth)
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const UserDetails = require('../models/userDetails')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'files');
    },
    filename: function(req, file, cb) {   
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    /*const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];*/
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/details/photo/:id',upload.single('photo'), async(req, res) => {
    const id = req.params.id
    const url = req.protocol + '://' + req.get('host')
    const photo = url + '/files/' + req.file.filename;
try{
    const user = await UserDetails.findByIdAndUpdate(id, {photo})
    res.status(200).json(user)
}catch(error){
    res.status(400).json({error : error.message})
    console.log(error)
}
});

router.get('/details/:id', getInfo)

router.post('/details/:id', editDetails)

router.delete('/:id', deleteUser)

router.post('/passwordchange/:id', changePassword)

router.post('/password/check/:id', checkPassword)


module.exports = router
