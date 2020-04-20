const express = require('express');
const users = require('../models/profile');

const router = express.Router();

router
    .get('/', (req, res) => res.send({
        CurrentDRI: users.CurrentDRI
    }))

    .get('/currentUser', (req, res) => {
        try {
            const cUser = users.CurrentUser;
            res.send( cUser );
        }
        catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/login', (req, res) => {
        try {
            const user = users.Login(req.body.email, req.body.password);
            const cDri = users.currentDRI();
            res.send( { ...user, Password: undefined } );
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('getDRI', (req, res) => {
        try {
            const cDri = users.currentDRI();
            res.send( { ...cDri } );
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/makeChanges', (req, res) => {
        try {
            const newDri = users.SubmitChanges(req.body.changes);
            res.send( newDri );
        }
        catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    //Food

    .post('/getFood', (req, res) => {
        try {
            const AddedFood = users.getUserFood(req.body.currentEmail);
            res.send( AddedFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

    //post food, new food
    .post('/newFood', (req, res) => {
        try {
            const addFood = users.AddFood(req.body.foodList);            
            res.send( addFood );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })


    //Exercise

    .post('/getExercise', (req, res) => {
        try {
            const ex = users.getUserExercises(req.body.currentEmail);
            res.send( ex );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })

    //post Exercise, new Exercise
    .post('/newExercise', (req, res) => {
        try {
            const addExercise = users.AddExercise(req.body.exerciseList);            
            res.send( addExercise );
        }
        catch (error) {
            res.status(401).send( { message: error.message });
        }
    })


    .get('/getDri', (req, res) => {
       let dri = users.currentDRI2();
       res.send(dri);
    })


module.exports = router;    