const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const userVerify = require('../configs/userVerify.config');
const mongoose = require('mongoose');

/**
* @swagger
*   /user/profile:
*   get:
*       description: Get A User Profile
*       summary:
*       tags:
*           - User
*       security:
*           - APIKeyHeader: []
*       responses:
*           '200':
*               description: Response as array
*               schema:
*                 type: object
*                 properties:
*                   name:
*                       type: string
*                   email:
*                       type: string
*                   date:
*                       type: string
*           '403':
*               description: Unauthorized Access
*               schema:
*                 type: object
*                 properties:
*                   message:
*                       type: string
*           '400':
*               description: User Error
*               schema:
*                 type: object
*                 properties:
*                   message:
*                       type: string
*           '500':
*               description: Internal Server Error
*               schema:
*                 type: object
*                 properties:
*                   message:
*                       type: string
*                   error:
*                       type: string
*/
router.get('/profile', userVerify, async (req, res) => {
    const userId = req.user._id;
    if(!userId) return res.status(400).json({message: 'User ID Not Attatched'});
    if(mongoose.Types.ObjectId.isValid(userId) == false) return res.status(400).json({message: 'User ID Not Valid'});

    let user;
    try{
        user = await User.findOne({})
    }catch(error){
        return res.status(500).json({message: '500 Internal Server Error', error: error});
    }

    if(!user) return res.status(404).json({message: 'User ID Not Exist'});

    const userPayload = {
        name: user.name,
        email: user.email,
        date: user.date
    };

    res.status(200).json(userPayload);
});

module.exports = router;