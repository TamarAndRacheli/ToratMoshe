const db = require('../models/index');
const Correction = db.corrections;
const Peirush = db.peirushim;
const Comment = db.comments;
const Handwriting = db.handwritings;
const { Op } = require('sequelize');


class ApprovalsController {
    getAllCorrection = async(req, res)=>{////////מביא גם את מי שאין לו תיקונים או פירושים
        const corrections = await Handwriting.findAll({
            include:[{
                model: Correction
            }]
            // ,whrere:{ handwriting_id: !null}
        })       
        if (corrections){
            var tmp =[];
            corrections.forEach(element => {
                if( element.corrections.length >0 )
                tmp.push(element)
            });
             return res.status(201).json(tmp)
        } 
            
        return res.status(404).json({ message: 'error' })
    }

    getAllPeirushim = async(req, res)=>{
        const obj = await Peirush.findAll({where:{permission: 0}});
        if (obj) 
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' }) 
    }

    getAllComments = async(req, res)=>{/// האם לעשות כמו בפירושים?
        const obj = await Comment.findAll({where:{permission: 0}});
        if (obj) 
            return res.status(201).json(obj)
        else 
            return res.status(404).json({ message: 'error' })
    }

    getHandwritingByIdWithPeirushim = async(req, res)=>{//////נתיבים/ קבצים?????????????????????????????????????
        const obj = await Handwriting.findOne({ where: { id: req.params.id } });
        const details = {description: obj.description, path_id: obj.path_id};
        if (obj) {
            const base64String =   'data:image/png;base64,iVBORw0KGgo...';
            var imagePath;
            var handwritingPath;
            // create an image with the a given name ie 'image'
            try {
                imagePath = await base64toFile(base64String, { filePath: 'M:', fileName: "sssssss" , types: ['png'], fileMaxSize: 3145728 });
                // imagePath = await base64toFile(base64String, { filePath: obj.image_path, fileName: obj.image_name , types: [obj.image_type], fileMaxSize: 3145728 });
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
            
            const prshm = await Peirush.findAll({ where: {
                 handwriting_id: req.params.id,
                 permission:{
                 [Op.or]: [0,1]
                }
            } });  
            return res.status(200).json({details:details,image:imagePath, handwriting:handwritingPath,peirushim:prshm}) 
        } 
        return res.status(404).json({ message: 'error' }) 
    } 

    getComment = async(req, res)=>{///לאחר לחיצה של המנהל על תגובות בתוך דף התמלול או על בחירת תגובה מתוך רשימת התגובות
        const cmmnt = await Comment.findAll({ where: {
             peirush_id: req.params.id,
             permission:{
             [Op.or]: [0,1]
            } } });
        if(cmmnt)
            return res.status(200).json(cmmnt) 
        return res.status(507).json({message:"not success"}) 
    }

    updateHandwriting = async(req, res)=>{




        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///// אחרי כפתור אישור
        ///אם אנו רוצות לעדכן קובץ טקסט השמור בנתיב ששמור בטבלה - הכיצד?!
         Correction.destroy({
             where: {handwriting_id: req.params.id}
         })

    }

    approvePeirush = async(req, res)=>{
        const id1 = req.params.id;
        await Peirush.update({"permission": 1},{
            where: {id:id1}
        });
        const obj = await Peirush.findOne({where:{id: id1}});
        if (obj && obj.permission == 1)
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })
    }

    approveComment = async(req, res)=>{
        const id1 = req.params.id;
        await Comment.update({"permission": 1},{
            where: {id:id1}
        });
        const obj = await Comment.findOne({where:{id: id1}});
        if (obj && obj.permission == 1)
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })
    }
    
    deletePeirush = async(req, res)=>{
        const id1 = req.params.id;
        Peirush.destroy({
            where: {id: id1}
        })  
    } 

    deleteComment = async(req, res)=>{
        const id1 = req.params.id;
        Comment.destroy({
            where: {id: id1}
        }) 
    }
}

const approvalsController = new ApprovalsController();
module.exports = approvalsController;