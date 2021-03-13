const express = require('express');
const router = express.Router();
const userVerify = require('../configs/userVerify.config');
const mongoose = require('mongoose');
const Todo = require('../models/Todo.model');

router.get('/items/list/:skip/:limit', userVerify, async (req, res) => {
    const userId = req.user._id;
    if(!userId) return res.status(400).json({message: 'User ID Not Attatched'});
    if(mongoose.Types.ObjectId.isValid(userId) == false) return res.status(400).json({message: 'User ID Not Valid'});

    try{
        const todos = await Todo.find({userId: userId});
        res.status(200).json(todos);
    }catch(error){
        res.status(500).json({message: '500 Internal Server Error', error: error});
    }
});


module.exports = router;