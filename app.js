const express = require('express');
const mongoose = require('mongoose');
const agentRoutes = require('./routes/agent');
const interventionRoutes = require('./routes/intervention');

const app = express();

mongoose.connect('mongodb+srv://Thalom:QqngXeBBO8gY2CPF@cluster0.ehp2nwf.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/agent', agentRoutes);
app.use('/api/intervention', interventionRoutes);

module.exports = app;