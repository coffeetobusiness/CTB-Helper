const express = require('express');
const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');

const router = express.Router();


//logIn
router.post('/login', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user1 = await User.findOne({ email: user.email });
        if (!user1 || user1.password !== user.password) {
            res.send("Login failed plz register first")
            return;
        }
        else {
            res.send("Log In Suceess");
        }
    }
    catch (err) {
        res.send("error" + err)
    }
})

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
                message: "email already exists",
            });
            return;
        }
        else {

<<<<<<< HEAD
            await user.save() //To add new user
            res.send("user created-"+"name:"+user.firstName)
            res.json({
                message:"success",
             });
=======
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save()
                .then((user) => {

                    res.send("user created - name:" + user.firstName)
                })
>>>>>>> 82b8fc471f0ae94c52d116f67468f203580f14f7
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
        res.send("userdata remove  with email id of:" + user.email)
    } catch (err) {
        res.send("error" + err);
    }
})


//Home
router.get('/home', (req, res) => {
    res.send('This is Home');
})


module.exports = router;
