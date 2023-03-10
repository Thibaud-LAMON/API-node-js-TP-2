const bcrypt = require('bcrypt');
const Agent = require('../models/Agent');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)//on hash le password qui est dans le body de agent
        .then(hash => {

            const agent = new Agent({
                numAgent: req.body.numAgent,
                grade: req.body.grade, //on prend le email dans le body de Agent
                password: hash
            });

            agent.save()
                .then(() => {
                    res.status(201).json({ agentId: agent._id })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));// erreur 500 = erreur serveur

}

exports.login = (req, res, next) => {

    Agent.findOne({
        numAgent: req.body.numAgent,
        grade: req.body.grade,
    })
        .then(agent => {
            if (!agent) {
                console.log('agent introuvable')
                return res.status(401).json({ message: "Agent introuvable" })
            }
            bcrypt.compare(req.body.password, agent.password)
                .then(valid => {
                    if (!valid) {
                        console.log('mdp invalide')
                        return res.status(401).json({ message: "mot de passe incorrect" })
                    }
                    console.log('houra')
                    res.status(200).json({
                        agentId: agent._id,
                        token: jwt.sign(
                            { agentId: agent._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));

}

exports.update = (req, res, next) => {

    Agent.updateOne({ _id: req.params.grade }, { ...req.body, _id: req.params.grade })
        .then(agent => {
            if (!agent) {
                console.log('pas autoris??')
                return res.status(401).json({ message: "Pas autoris??" })
            }
            bcrypt.compare(req.body.password, agent.password)
                .then(valid => {
                    if (!valid) {
                        console.log('mdp invalide')
                        return res.status(401).json({ message: "mot de passe incorrect" })
                    }
                    console.log('houra')
                    res.status(200).json({ success: "Agent modifi??" })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));

}