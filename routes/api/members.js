const express = require('express');
const router = express.Router();
const members = require('../../Members');


// gets all members
router.get('/', (req, res) => res.json(members));

//Gets Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
    
});

// Creat Member
router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;