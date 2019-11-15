var express = require('express');
var schema = require('../schema');
var ImageRouter = express.Router();
const multer = require('multer');
var fs=require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
    //console.log(destination);
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype==='image/jpg') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage


});

/*
    stores image in uploads folder
    using multer and creates a reference to the
    file
*/
ImageRouter.post("/uploadmulter/:id",upload.single('imageData'), (req, res, next) => {
        console.log(req.body);
        const newImage = new schema.imgs({
            imageName: req.body.imageName,
            imageData: req.file.path,
            userid:req.params.id
        });

        newImage.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });
    ImageRouter.post('/getpic/:id',(req,res)=>{
      schema.imgs.find(
        {
          userid:req.params.id
        },(err,data)=>{
          if(err)
          {
           console.log(err)
           res.send(err);
          }
          else {
            console.log(data[0].imageData+"kkk");
            res.status(200).json({
              imageData:data[0].imageData
            });
          }
        })
    });

/*
    upload image in base64 format, thereby,
    directly storing it in mongodb datanase
    along with images uploaded using firebase
    storage
*/
// ImageRouter.route("/uploadbase")
//     .post((req, res, next) => {
//         const newImage = new Image({
//             imageName: req.body.imageName,
//             imageData: req.body.imageData,
//             userid:req.params.id
//         });
//
//         newImage.save()
//             .then((result) => {
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
//     });

module.exports = ImageRouter;
