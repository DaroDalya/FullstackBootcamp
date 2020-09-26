const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get tasklist
router.get('/', async(req, res) => {
    const tasklist = await loadTasksCollection();
    res.send(await tasklist.find({}).toArray());
});

//Add tasklist
router.post('/', async (req, res) => {
    const tasklist = await loadTasksCollection();
    await tasklist.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    });
    res.status(201).send();
})

//Delete tasklist
router.delete('/:id', async (req, res) => {
    const tasklist = await loadTasksCollection();
    await tasklist.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
});

async function loadTasksCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dalya:1234@my-tasklist.ljxnm.mongodb.net/my-tasklist?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('my-tasklist').collection('mytasks');
}

module.exports = router;