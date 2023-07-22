const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const authenticate = require('./middleware/authenticate')
const userModel = require("./models/userModel")
const { body, validationResult } = require('express-validator')
const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || '8080'






//Database Connection

mongoose.connect("mongodb://127.0.0.1:27017/crudopration")
    .then(() => console.log("coonnect to db"))
    .catch((err) => console.log(err))






//read data
//"http://localhost:8080/"

app.get('/users'




    , async (req, res) => {


        const data = await userModel.find({})

        res.json({ success: true, data: data })

    })



//create data // save data in mongodb  with validation
app.post('/users',
    [
        body('name').isLength({ min: 3}),
        body('email').isEmail(),
        //validation
        body('password', "incorrect password").isLength({ min: 5 }),
        body('mobile', "please give the no..").isMobilePhone()
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        console.log(req.body)
        const data = new userModel(req.body)
        await data.save()

        res.send({ success: true, message: "data save done!" })
    })




//update data


app.put('/update',

    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        //validation
        body('password', "incorrect password").isLength({ min: 5 }),
        body('mobile', "please give the no..").isMobilePhone()
    ],


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        console.log(req.body)

        const { _id, ...rest } = req.body
        console.log(rest)
        const data = await userModel.updateOne({ _id: _id }, rest)



        res.send({ success: true, message: "update is done !", data: data })
    })



//delete  data Api

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "delete is done !", data: data })


})


app.listen(PORT, () => console.log('server is runing'))