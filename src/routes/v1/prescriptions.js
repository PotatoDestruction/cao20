const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');


const router = express.Router();



router.get("/:id", async (req, res) => {
    let presctiontion = req.params.id
    try{
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query(`
        SELECT *
        FROM prescriptions
        LEFT JOIN medications ON medications.id = prescriptions.medication_id
        WHERE prescriptions.pet_id = ?
        `, [presctiontion]);
        con.end();
        res.send(response)
    }catch(err){
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    let presctiontion = req.body

    try{    
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query("INSERT INTO prescriptions SET ?", [presctiontion]);
        con.end();
        res.send(response)
    }catch(err){
        res.status(500).send(err);
        console.log(err)
    }
})

module.exports = router;