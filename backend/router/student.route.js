const studentController =require ('../controller/student.controller')
const { validatelogin } = require('../lib/auth');

const express =require("express");
const multer = require('multer');
const path = require('path');

const studentRouter = express.Router(); 





const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images")
    },
    filename:(req,file,cb)=>{
      
        return cb(null,`${file.originalname.replace(path.extname(file.originalname),"")}${path.extname(file.originalname)}`)
    }
})
 

const upload = multer({
    storage:storage
})
const multiupload = multer({
    storage:storage
}) 





studentRouter.post('/postmultiimage',multiupload.array('images',10),studentController.postmultiimage);
studentRouter.get('/getmultiimage', studentController.getmultiimage);
studentRouter.post('/postimage',upload.single('image'),studentController.postimage);
studentRouter.get('/getimage', studentController.getimage);
studentRouter.get('/', studentController.getStudents);
studentRouter.post('/',studentController.postStudents);
studentRouter.put('/:id', studentController.updateStudents);
studentRouter.delete('/:id',validatelogin, studentController.deleteStudents);
studentRouter.post('/login', studentController.loginme);
 
module.exports = studentRouter;

