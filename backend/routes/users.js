const express = require('express');
const User = require('../Models/UserModel');

const router = express.Router();

//Login
router.post('/login', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
 
    if (user) {
        res.json(user)
    }
    else {
        res.send("User not found");
    }
});

//Register
router.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })


    try {

        const user1 = await User.findOne({ email: user.email });
        if (user1) {

            res.json({
                message: "Username already exists",
            });
            return;
        }
        else {

            await user.save() //To add new user
            res.send("user created")
        }
    } catch (err) {
        res.send("error" + err)
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const user1 = user.remove()
        res.json(user1)
    } catch (err) {
        res.send("error" + err);
    }
})


//Home
router.get('/Home', (req, res) => {
    res.send('This is Home');
})


module.exports = router;
