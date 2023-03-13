// ///create folder
// const folderPath = '/path/to/folder';

// if (fs.existsSync(folderPath)) {
//   console.log(`Folder '${folderPath}' exists.`);
// } else {
// //create new folder
//     const folderName = 'myFolder';

// if (!fs.existsSync(folderName)) {
//   fs.mkdir(folderName, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Folder ${folderName} created successfully.`);
//     }
//   });
// } else {
//   console.log(`Folder ${folderName} already exists.`);
// }

//   console.log(`Folder '${folderPath}' does not exist.`);
// }



const db = require('../models/index');
const Handwriting = db.handwritings;
const Peirush = db.peirushim;
const Comment = db.comments;
const User = db.users;
const Correction = db.corrections;
const base64toFile = require('node-base64-to-file');
const { where } = require('sequelize');

class HandWritingController {

    getHandwritingByIdWithPeirushim = async(req, res)=>{//////נתיבים/ קבצים?????????????????????????????????????
        const obj = await Handwriting.findOne({ where: { id: req.params.id } });
        const details = {id: obj.id, description: obj.description, path_id: obj.path_id};
        if (obj) {
            const base64String =   'data:image/png;base64,iVBORw0KGgo...';
            var imagePath;
            var handwritingPath;
            // create an image with the a given name ie 'image'
            try {
                // imagePath = await base64toFile(base64String, { filePath: 'D:', fileName: "sssssss" , types: ['png'], fileMaxSize: 3145728 });
                imagePath = await base64toFile(base64String, { filePath: obj.image_path, fileName: obj.image_name , types: [obj.image_type], fileMaxSize: 3145728 });
                console.log(imagePath)
              } catch (error) {
                console.log(error)
              }
            //   try {
            //     handwritingPath = await base64toFile(base64String, { filePath: obj.transcription_path, fileName: obj.transcription_name , types: obj.transcription_type, fileMaxSize: 3145728 });
            //     console.log(handwritingPath)
            //   } catch (error) {
            //     console.log(error)
            //   }
            
            const prshm = await Peirush.findAll({ where: { handwriting_id: req.params.id, permission:1 } });  
            return res.status(200).json({details:details,image:imagePath, handwriting:handwritingPath,peirushim:prshm}) 
        } 
        return res.status(404).json({ message: 'error' }) 
    } 

    getAllComments = async(req,res)=>{
        const cmmnt = await Comment.findAll({ where: { peirush_id: req.body.id, permission:1 } });
        if(cmmnt)
            return res.status(200).json(cmmnt) 
        return res.status(507).json({message:"not success"}) 
    }

    getHandwritingsDesByFolderId = async(req, res)=>{
        if(req.params.id){
            const obj = await Handwriting.findAll({ where: { path_id: req.params.id }, attributes: ["id", "description"]});/////נתיבים/ קבצים???????????????????????????????????????
            if (obj) 
                return res.status(200).json(obj) 
        }
        return res.status(404).json({ message: 'error' }) 
    } 

    addHandwriting = async(req, res)=>{
            const obj = await Handwriting.create(req.body);
            if (obj) 
                return res.status(201).json(obj)
            return res.status(507).json({message:"not succcess"})
    } 

    addPeirush = async(req, res)=>{
        if(!req.body.user_id)
            return res.status(406).json({ message: 'user not connected' }) 
        const user = await User.findOne({ where: { id: req.body.user_id }, attributes:["authorization"]});
        if(user.authorization==0)
            return res.status(406).json({ message: 'blocked user' }) 
        var permission = 0;
        if(user.authorization==2)
              permission = 1;
        const obj = await Handwriting.findOne({ where: { id: req.body.handwriting_id }});
        if(obj)
           {
            const p = {
                 "handwriting_id":req.body.handwriting_id,
                 "user_id":req.body.user_id,
                 "peirush_text":req.body.peirush_text,
                 "permission": permission
            }
            const perush = await Peirush.create(p);
            if (perush) 
                return res.status(201).json(perush)
            return res.status(507).json({message: "not success"})
           } 
        return res.status(400).json({ message: 'error' }) 
    } 

    addComment = async(req, res)=>{
        if(!req.body.user_id)
            return res.status(406).json({ message: 'user not connected' }) 
        const user = await User.findOne({ where: { id: req.body.user_id }, attributes:["authorization"]});
        if(user.authorization==0)
            return res.status(406).json({ message: 'blocked user' }) 
        var permission = 0;
        if(user.authorization==2)
              permission = 1;
        const obj = await Peirush.findOne({ where: { id: req.body.peirush_id }}); 
        if(obj)
           {
            const p = {
                    "peirush_id":req.body.peirush_id,
                    "user_id":req.body.user_id,
                    "comment_text":req.body.comment_text,
                    "permission": permission
            }
            const cmmnt = await Comment.create(p);
            if (cmmnt) 
                return res.status(201).json(cmmnt)
            return res.status(507).json({message: "not success"})
           }
        else 
            return res.status(400).json({ message: 'error not find a handwriting' }) 
    }

    addCorrections = async(req,res)=>{
        if(!req.body.user_id)
            return res.status(406).json({ message: 'user not connected' }) 
        const user = await User.findOne({ where: { id: req.body.user_id }, attributes:["authorization"]});
        if(user.authorization==0)
            return res.status(406).json({ message: 'blocked user' }) 
        const obj = await Handwriting.findOne({ where: { id: req.body.handwriting_id }}); 
        if(obj){
            const crrct = await Correction.create(req.body);
            if (crrct) 
                return res.status(201).json(crrct)
            return res.status(507).json({message: "not success"})
           }
        else 
            return res.status(400).json({ message: 'error not find a handwriting' }) 
    }

    updatePath = async(req, res)=>{// אפשר לשלוח שתי םרמטרים בנתיב?
        await Handwriting.update({"path_id": req.params.path},{
            where: {id:req.params.id}
        });
        const obj = await Handwriting.findOne({where:{id: req.params.id}});
        if (obj && obj.path_id==req.params.path_id)
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })
    }

    updateDescription = async(req, res)=>{
        await Handwriting.update({"description": req.body.description},{
            where: {id:req.params.id}
        });
        const obj = await Handwriting.findOne({where:{id: req.params.id}});
        if (obj && obj.description==req.body.description)
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })
    }

    updateImage = async(req, res)=>{
        await Handwriting.update({"image_path": req.body.image_path,"image_name": req.body.image_name,"image_type": req.body.image_type },{
            where: {id:req.params.id}
        });
        const obj = await Handwriting.findOne({where:{id: req.params.id}});
        if (obj && obj.description==req.body.description)
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })
    }

    deleteHandwrting = async(req, res)=>{
        console.log("i was 111111111111111");
        if(await Handwriting.findOne({where:{id: req.params.id}})){
            await Peirush.destroy({
                include:[{model: Comment}],
                where: {handwriting_id:req.params.id}
            }) 
            console.log("i was 22222222222");
            const check = await Peirush.findAll({where:{handwriting_id: req.params.id}});
            if (!check.length){
                const flag = await Handwriting.destroy({where: {id: req.params.id}})  
                console.log("dfghjkkkkkjhgfdfghjk",flag,Peirush.findAll({where:{handwriting_id: req.params.id}}));
                if(flag){
                    return res.status(201).json({ message: 'ok' }) 
                }
            }
            return res.status(404).json({ message: 'error' })
        }
        return res.status(201).json({ message: 'not exist such file' }) 
    }
}

const handWritingController = new HandWritingController();
module.exports = handWritingController;