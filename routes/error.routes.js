const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(404).json({message: '404 GET Request Path Not Found'});
});

module.exports = router;