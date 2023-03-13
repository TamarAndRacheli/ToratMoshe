const db = require('../models/index');
const bcrypt= require('bcrypt')
const mailer = require('../services/mail');
const jwt= require('jsonwebtoken')
const { Op } = require('sequelize');

const User = db.users;
const Comment = db.comments;
const Peirush = db.peirushim;
const Correction = db.corrections;



function sendEmailToUser(to, subject, body) {
    mailer.sendEmail(to, subject, body)
        .then(info => {
            console.log('Email sent: ', info.response);
        })
        .catch(error => {
            console.log('Error sending email: ', error);
        });
}

class UsersController {
    getAllUsers = async(req, res)=>{
        const obj = await User.findAll({attributes: { exclude: ['password','email']}});
        if (obj) 
            return res.status(201).json(obj) 
        return res.status(404).json({ message: 'error' }) 
    }
    
    logIn = async(req, res)=>{
        if (!req.body.email || !req.body.password) 
            return res.status(400).json({ message: 'All fields are required'})
        const foundUser = await User.findOne({ where: { email: req.body.email }, attributes: ['id','first_name', 'last_name','password']});
        if (foundUser) {
            if (await bcrypt.compare(req.body.password, foundUser.password)){
                const userInfo= {id:foundUser.id,first_name:foundUser.first_name, last_name:foundUser.last_name}
                const accessToken= jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
                return res.status(201).json({accessToken:accessToken})
            }  
            return res.status(406).json({ message: 'password not ok' }) 
        } 
        return res.status(404).json({ message: 'user not exist' }) 
    }

    sendEmailToUsers = async(req, res)=>{
        const obj = await User.findAll({  where: {
            email_confirm: 1,
            authorization:{
               [Op.or]: [1,2] 
            }
            
          },attributes:["first_name","last_name","email"]});
        // if(req.body.withusername)
        obj.forEach(element => {
            const text1 = `הי ${element.first_name} ${element.last_name}\n` + req.body.text;
            sendEmailToUser(element.email,req.body.title,text1);
        });
        if (obj) 
            return res.status(201).json(obj)
        return res.status(404).json({ message: 'error' })    
    }

    sendEmailToManger = async(req, res)=>{
        const managers = await User.findAll({  where:{authorization: 2 },attributes:["email"]});
        const user = await User.findOne({  where:{email:req.body.email  },attributes:["first_name","last_name","email", "authorization"]});
        var text1 = `נשלחה אליך הודעה ממשתמש ${user.first_name} ${user.last_name}, אימייל: ${user.email}\n\n` + req.body.text;
        if(user.authorization==0)
            text1= "לתשומת לבך משתמש זה הינו משתמש חסום\n"+text1;
        if (managers) {
            managers.forEach(element => {
                    sendEmailToUser(element.email,req.body.title,text1); 
            }); 
            return res.status(201).json(managers)
        }
        return res.status(404).json({ message: 'error' }) 
    }

    updatePassword1 =async(req,res)=>{
        const chars = "qwertyuiopasdfghjklzxcvbnm0123456789";
        var password = "";
        for (let index = 0; index < 6; index++)
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        await User.update({"password":password},{
            where: {email:req.body.email}
        })
        const userEmail = await User.findOne({where:{email:req.body.email}, attributes:['first_name','last_name',"password"]})
        if(userEmail &&  userEmail.password == password){
            const text = `שלום ${userEmail.first_name} ${userEmail.last_name} הסיסמה החדשה שלך היא ${password} .נשמח תמיד לעזור לך! ד"ש מרחלי ותמר...😂`
            sendEmailToUser(req.body.email,"הי, סיסמתך מאתר כתבי יד המהריל",text);
            return res.status(201).json(password);
        }
        return res.status(404).json({message:"error can not update password"});
    }


    updatePassword2 =async(req,res)=>{
        const user1 = await User.findOne({where:{email: req.body.email}, attributes:["password"]});
        if (user1 && user1.password == req.body.password)
            return res.status(201).json({message: "OK"});
        return res.status(400).json({message: "NOT"});
    }

    updatePassword3 = async(req,res)=>{
        await User.update({"password":req.body.password},{
            where: {email:req.body.email}
        })
        const obj = await User.findOne({where:{email:req.body.email},attributes:["password"]})
        if(obj && obj.password === req.body.password)
            return res.status(201).json(obj);
        return res.status(400).json({message:"error"});
    }

    cancelReceiptEmails = async(req, res)=>{
        const obj = await User.findOne({ where: {id:req.params.id},attributes:["email_confirm"]})
        if(obj){
            if(obj.email_confirm == 1){
                await User.update({"email_confirm":0},{where: {id:req.params.id}})
                const obj1 = await User.findOne({where:{id:req.body.id},attributes:["email_confirm"]})
                if(obj1 && obj1.email_confirm==0)
                    return res.status(201).json(obj1,);
                return res.status(400).json({message:"error"});
            }
            return res.status(201).json(obj);
        }
        return res.status(400).json({message:"user not exist"});
    }

    confirmReceiptEmails = async(req, res)=>{
        const obj = await User.findOne({ where: {id:req.params.id},attributes:["email_confirm"]})
        if(obj){
            if(obj.email_confirm == 0){
                await User.update({"email_confirm":1},{where: {id:req.params.id}})
                const obj1 = await User.findOne({where:{id:req.body.id},attributes:["email_confirm"]})
                if(obj1 && obj1.email_confirm==1)
                    return res.status(201).json(obj1,);
                return res.status(400).json({message:"error"});
            }
            return res.status(201).json(obj);
        }
        return res.status(400).json({message:"user not exist"});

    }

    register = async(req,res) => {
        const obj = await User.findOne({ where: { email: req.body.email } });
        if(obj)
            return res.status(406).json({ message: 'email exist' }) 
        if (!req.body.first_name ||!req.body.last_name ||  !req.body.email ||  !req.body.password) 
            return res.status(400).json({ message: 'All fields are required' })
        const hashedPwd = await bcrypt.hash(req.body.password, 10)

        const userObject = {first_name: req.body.first_name, last_name: req.body.last_name,email: req.body.email, email_confirm: req.body.email_confirm, password:hashedPwd}

        const user = await User.create(userObject)
        if (user){ 
            sendEmailToUser(req.body.email,`${req.body.first_name}Welcome to our app`,"Thank you for registering")////////כתיבה יפה של מייל
            return res.status(201).json(user)
        }
        else 
            return res.status(400).json({ message: 'error cannt register' }) 
    }

    updateUserAuthorization = async(req, res)=>{
        await User.update({"authorization" : req.body.authorization},{
            where: {id:req.body.id}
        })
        const obj = await User.findOne({ where: { id: req.body.id },attributes: ['authorization']});
        if (obj && obj.authorization=== req.body.authorization){
            if(req.body.authorization==0){
                Comment.destroy({
                    where: {user_id: req.body.id, permission:0}
                })
                Peirush.destroy({
                    where: {user_id: req.body.id, permission:0}
                })
                Correction.destroy({
                    where: {user_id: req.body.id}
                })
            }
            return res.status(201).json({obj});
        }   
        return res.status(404).json({ message: 'error' }) ////id שגוי     
    }
}

const usersController = new UsersController();
module.exports = usersController;
