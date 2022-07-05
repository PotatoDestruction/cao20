const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');


const router = express.Router();

const logsSchema = Joi.object({
    pet_id: Joi.number().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
});


router.get("/:petId", async (req, res) => {
    const petId = req.params.petId
    try {
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query(`
        SELECT logs.id, logs.pet_id, logs.description, logs.status, pets.name, pets.dob, pets.client_email, pets.archived
        FROM logs
        LEFT JOIN pets ON logs.pet_id = pets.id
        WHERE logs.pet_id = ?       
        `, [petId])
        con.end();

        if(!response.length) {
            res.send({ message: "This pet does not have any logs"})
            return
        }

        console.log(response[0].dob)

        var today = new Date(response[0].dob);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '.' + dd + '.' + yyyy;
        console.log(today)

        res.send(response)
    }catch(err) {
        res.status(500).send(err)
    }
});

router.post("/", async (req, res) => {
    let petLog = req.body

    try {
        petLog = await logsSchema.validateAsync(petLog);      
    } catch (err) {
        res.status(400).send(err);     
        console.log(err)  
        return;
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [response] = await con.query("INSERT INTO logs SET ?", [petLog]);
        con.end();
        res.send(response)

    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router;