const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');

const router = express.Router();

const petsSchema = Joi.object({
    name: Joi.string().required(),
    dob: Joi.string().required(),
    client_email: Joi.string().required(),
    archived: Joi.boolean().required()

});

router.get("/", async (req, res) => {
    try{
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query("SELECT * FROM pets WHERE archived = false");
        
        con.end();
        res.send(response);
    }catch(err){
        res.status(500).send(err);        
    }
});



router.get("/archived", async (req, res) => {
    try{
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query("SELECT *  FROM pets WHERE archived = true");
        
        con.end();
        res.send(response);
    }catch(err){
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    let pet = req.body

    try {
        pet = await petsSchema.validateAsync(pet);      
    } catch (err) {
        res.status(400).send(err);       
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [createPet] = await con.query(`
        INSERT INTO pets SET ?
        `, [pet]);
        
        con.end();
        res.send(createPet)

        
    }catch(err){
        res.status(500).send(err);
        
    }
});

router.delete("/:petId", async (req, res) => {
    const petId = req.params.petId;
    try {
        const con = await mysql.createConnection(dbConfig);
        const [deletePet] = await con.query(`UPDATE pets SET archived = true WHERE id = ?`, [petId]);
        con.end();
        res.send(deletePet)
    }catch(err) {
        res.status(500).send(err);
    }
})



module.exports = router;