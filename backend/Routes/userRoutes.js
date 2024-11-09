const express = require('express');
const { Users,Accounts } = require('../db');
const { z } = require('zod');
const router = express.Router();  
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

singupSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})
router.post('/signup', async (req, res) => {
    const singupPayload = req.body;
    const parsedPayload = singupSchema.safeParse(singupPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"wrong inputs",
        })
        return;
    }
    const existingUser = await Users.findOne({ username: singupPayload.username });
console.log(existingUser)
    if(existingUser){
        res.status(411).json({
            msg:"user already exists",
        })
        return;
    }
    const users = await Users.create({
        username: singupPayload.username,
        password: singupPayload.password,
        firstName: singupPayload.firstName,
        lastName: singupPayload.lastName
    });
    user_id = users._id
    const acccouts  = await Accounts.create({
        userId: user_id,
        balance : 1+Math.random()*1000

    })
    console.log(acccouts)
    console.log(JWT_SECRET)
    const token = jwt.sign({user_id},  JWT_SECRET)
    res.json({
        msg: "user created",
        jwt: token
    });
})

const loginSchema = z.object({
    username: z.string().email(),
    password: z.string()
})
router.post('/singin', async (req, res) => {
    const loginPayload = req.body;
    const parsedPayload = loginSchema.safeParse(loginPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "wrong inputs",
        })
        return;
    }
    const existingUser = await Users.findOne({ username: loginPayload.username });
    if (!existingUser) {
        res.status(411).json({
            msg: "user not found",
        })
        return;
    }
    console.log(existingUser)
    if (existingUser.password !== loginPayload.password) {
        res.status(411).json({
            msg: "wrong password",
        })
        return;
    }
    console.log(existingUser._id._id)
    const token = jwt.sign({user_id : existingUser._id},  JWT_SECRET)
    res.json({
        msg: "user logged in",
        jwt: token
    });
})
const userSchema = z.object({
    password : z.string(),
    firstName : z.string(),
    lastName  : z.string()
})
router.put('/user', authMiddleware, async (req, res) => {
userPayload = req.body
    const parsedPayload = userSchema.safeParse(userPayload)
    if (!parsedPayload.success)
    {
        res.status(411).json({
            "msg" :"wrong inputs"
        })
        return;
    }
    console.log(req.userId)
    await Users.updateOne({ _id: req.user_id }, userPayload);
    res.json({
        "msg" : "updated sucessfully"
    })
})
router.get('/user/bulk',async (req, res) => {
    const filter = req.query.filter || ""
    const users = await Users.find({
        $or: [{
            firstName: { "$regex": filter } 
        }, {
            lastName : {"$regex" : filter}
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
                firstname : user.firstname,
                lastname : user.lastname
        }))

    })
})

module.exports = router