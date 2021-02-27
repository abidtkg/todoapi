const express = require('express');
const router = express.Router();
const { loginValidator } = require('../validator/auth.validaor');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
* @swagger
*   /auth/login:
*   post:
*       description: Authorize Account
*       summary: 
*       tags:
*           - Authentication
*       responses:
*           '200':
*               description: JWT auth token
*               schema:
*                 type: object
*                 properties:
*                   name:
*                       type: string
*                   token:
*                       type: string
*           '401':
*               description: Auth Error Responses
*               schema:
*                 type: object
*                 properties:
*                   message:
*                       type: string
*       parameters:
*         - in: body
*           name: auth info
*           schema:
*              type: object
*              properties:
*                  email:
*                      type: string
*                  password:
*                      type: string
*/
router.post('/login', async (req, res) => {
    const { error } = loginValidator(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    let user;
    try{
        user = await User.findOne({email: req.body.email});
    }catch(error){
        res.status(500).json({message: '500 Internal Server Error', error: error});
    }

    if(!user) return res.status(404).json({message: 'User Not Found'});

    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if(!verifyPassword) return res.status(401).json({message: 'Passowrd Not Matched'});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.status(200).json({name: user.name, token: token});
});

module.exports = router;