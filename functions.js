const bdAnimals = require("./modelAnimal");

const Animal = {

    get: async(req, res) =>{
        const { id } = req.params;
        const getE = await bdAnimals.findOne({_id: id});
        res.status(200).send(getE);
    },

    list: async (req, res) =>{
        const getEt = await bdAnimals.find();
        res.status(200).send(getEt);
    },

    create: async (req, res) =>{
        console.log(req.body);
        const creaEt = new bdAnimals(req.body);
        const saveEt = await creaEt.save();
        res.status(201).send(saveEt._id);
       
    },

    update: async  (req, res)=>{
        const {id} = req.params;
        const getE  =  await bdAnimals.findOne({_id: id});
        Object.assign(getE, req.body);
        await getE.save();
        res.sendStatus(204);
    },

    destroy: async (req, res) =>{
        const {id} = req.params;
        const getE  =  await bdAnimals.findOne({_id: id});
        if(getE){
            getE.remove();
        }
        res.sendStatus(204);
    }

    /*
    list: async (req, res) =>{
        console.log(req.body);
        const getE  = await bdWindo.find(); 
        res.status(200).send(getE);
    }

    el: async (req, res) =>{
        const {id} = req.params;
        const getE  =  await bdWindo.findOne({_id: id});
        res.status(200).send(getE);
    },

    create: async (req, res) =>{
        const creaE = new bdWin(req.body);
        const eSave = await creaE.save();
        res.status(201).send(eSave._id);
    },

    update: async  (req, res)=>{
        const {id} = req.params;
        const getE  =  await bdWindo.findOne({_id: id});
        Object.assign(getE, req.body);
        await getE.save();
        res.sendStatus(204);
    },

    destroy: async (req, res) =>{
        const {id} = req.params;
        const getE  =  await bdWindo.findOne({_id: id});
        if(getE){
            getE.remove();
        }
        res.sendStatus(204);
    },
    */

}

module.exports = Animal;