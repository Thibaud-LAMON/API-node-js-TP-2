const Intervention = require("../models/Intervention");

exports.createStuff = (req, res, next) => {

    const intervention = new Intervention({
        ...req.body //on prend tous les éléments du body de Intervention
    });

    intervention.save()
        .then(() => res.status(201).json({ message: "Intervention enregistrée !!" }))//code 201 = donnée créée
        .catch(error => res.status(400).json({ error }));//erreur 400 = erreur humaine

}

exports.getOneStuff = (req, res, next) => {

    Intervention.findOne({
        numAgent: req.body.numAgent,
        grade: req.body.numAgent,
        password: req.body.password
    })
        .then(intervention => res.status(200).json(intervention)) //ref dans find
        .catch(error => res.status(400).json({ error }));

}

exports.getAllStuff = (req, res, next) => {

    Intervention.find()
        .then(interventions => res.status(200).json(interventions))
        .catch(error => res.status(400).json({ error }));

};

exports.deleteStuff = (req, res, next) => {

    Intervention.deleteOne({ _id: req.params.id }) //"_id" = paramètre de la requête ; "id" = champs dans la base de données
        .then(agent => {
            if (!agent) {
                return res.status(401).json({ message: "Ce n'est pas votre intervention" })
            }
            bcrypt.compare(req.body.password, agent.password)
                .then(() => res.status(200).json({ success: "Intervention supprimée" }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));

}