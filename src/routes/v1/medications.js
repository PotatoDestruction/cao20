const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');

const router = express.Router();

const medicationsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
});

router.get("/",async (rec,res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query(`SELECT * FROM medications`);
        con.end();
        res.send(response);
        console.log(1);
    }catch(err) {
        res.status(500).send(err);
        console.log(2);
    }
});

router.post("/", async (req, res) => {
    let medication = req.body

    try {
        medication = await medicationsSchema.validateAsync(medication);      
    } catch (err) {
        res.status(400).send(err);       
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query("INSERT INTO medications SET ?", [medication]);
        con.end();
        res.send(response)
    }catch(err) {
        res.status(500).send(err);
        console.log(err)
    }
});


module.exports = router;