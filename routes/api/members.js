const express = require('express');
const uuid = require('uuid');
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

// Creates Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
      return  res.status(400).send('Please include a name and email');
    } 
    // mongodb: members.save(newMember)
    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Updates member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;   
                
                res.json( {
                    message: "Member was updated", members
                });
            }
        });
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
    
});

// Deletes member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            message: "Member deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
    
});


module.exports = router;