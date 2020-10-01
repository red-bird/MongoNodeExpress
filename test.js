const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Worker = require('./models/worker');

const app = express();

// middleware & static files
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

//insert road to db
const dbURI = 'mongodb+srv://redbird:1945@nodemongo.dcwti.mongodb.net/cutawaySite?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.post('/add-worker', (req, res) => {
    const worker = new Worker({
        name: req.body.name
    });

    worker.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-workers', (req, res) => {
    Worker.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.delete('/delete-worker/:id', (req, res) => {
    Worker.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//add 3rd argument "{upsert: true}" if you want to add anyway
app.put('/update-worker', (req, res) => {
    const query = { name: req.body.name };
    const newdata = { name: req.body.newname };
    Worker.findOneAndUpdate(query, newdata)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})