const express = require('express')
const router = express.Router()
const connection = require('./../config/config')
const model= require("../models");
const User = model.User;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');



//Login Admin

router.post('/login',async(req,res,next)=>{
 const user = await User.findOne({ where : {email : req.body.email }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
        token = jwt.sign({ "id" : user.id,"email" : user.email,"firstname":user.firstname },process.env.SECRET);
        res.status(200).json({ token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  

  
  });
  
//Get All Users From Database
router.get('/', async function(req, res, next){
    
    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
      } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
      }
      },
      async(req,res,next)=>{
        let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
        if(user === null){
          res.status(404).json({'msg':"User not found"});
        }
        
    await User.findAll().then(function(item){
        res.json({
          "Message" : "User Lists.",
          "User" : item
        });
      }).catch(function (err) {
            res.status(500).send(err.message || "Internal Server Error!")
    });

})

/** Store Data From Database*/
router.post('/store', async function(req, res, next) {
   
    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
      } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
      }
      },
      async(req,res,next)=>{
        let usered = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
        if(usered === null){
          res.status(404).json({'msg':"User not found"});
        }

    const data = req.body;
    const salt = await bcrypt.genSalt(10);

     await User.create({ 
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        postcode: data.postcode,
        contact: data.contact,
        email: data.email,
        username: data.username,
        password : await bcrypt.hash(data.password, salt)
     }).then(function(item){
        res.json({
          "Message" : "User Created Successfully.",
          "User" : item
        });
      }).catch(function (err) {
            res.status(500).send(err.message || "Internal Server Error!")
      });
   
});

/** Update Data From Database*/
router.put('/update/:id', async function(req, res, next) {

    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
      } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
      }
      },
      async(req,res,next)=>{
        let usered = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
        if(usered === null){
          res.status(404).json({'msg':"User not found"});
        }

    const user_id = req.params.id;
    const data = req.body;


      await User.update({ 
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        postcode: data.postcode,
        contact: data.contact,
        email: data.email,
        username: data.username,
        password: data.password,
    
    }, {
        where: {
            id: user_id
        }
      }).then(function(item){
        res.json({
          "Message" : "User Updated Successfully.",
        });
      }).catch(function (err) {
            res.status(500).send(err.message || "Internal Server Error!")
      });
   
});



/** Delete Data From Database*/
router.delete('/delete/:id',  async function(req, res, next){

    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
      } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
      }
      },
      async(req,res,next)=>{
        let usered = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
        if(usered === null){
          res.status(404).json({'msg':"User not found"});
        }

    const user_id = req.params.id;

    await User.destroy({
        where: {
            id: user_id
        }
    }).then(function(item){
        res.json({
          "Message" : "User Delete Successfully.",
        });
      }).catch(function (err) {
            res.status(500).send(err.message || "Internal Server Error!")
      });
});

/** Bulk Delete Data From Database*/
router.delete('/bulkDelete/:id',  async function(req, res, next){
 
    try {
        let token = req.headers['authorization'].split(" ")[1];
        let decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
      } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
      }
      },
      async(req,res,next)=>{
        let usered = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
        if(usered === null){
          res.status(404).json({'msg':"User not found"});
        }

    const user_ids = JSON.parse(req.params.id);
    const user = User.destroy({ where: { id: user_ids }}).then(function(item){
        res.json({
          "Message" : "User Delete Successfully.",
        });
      }).catch(function (err) {
            res.status(500).send(err.message || "Internal Server Error!")
      });
});


module.exports = router