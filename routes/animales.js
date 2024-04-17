const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['animal']);
const ObjectId = require('mongodb').ObjectId;


router.get('/animal',(req,res,next)=>{
    db.animal.find((err,animal) => {
        if(err) return next(err);
        res.json(animal);
    });
});

router.get('/animal/:id', (req, res, next) => {
    db.animal.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, animal) => {
        if (err) return next(err);

        if (!animal) {

            return res.status(404).json({ error: 'animal not found' });
        }

        res.json(animal);
    });
});

router.post('/animal', (req, res, next) => {
    const animal = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!animal.tipoAnimal) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.animal.save(animal, (err, animalSaved) => {
            if (err) return next(err);
            res.json(animalSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/animal/:id', (req, res, next) => {
    const animalID = req.params.id;

    if (!ObjectId.isValid(animalID)) {
        return res.status(400).json({ error: 'Invalid animal id' });
    }

    db.animal.remove({ _id: ObjectId(animalID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/animal/:id', (req, res, next) => {
    const animalID = req.params.id;
    const {tipoAnimal} = req.body;

    if (!ObjectId.isValid(animalID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(animalID) };
    const update = {
        $set: {
            tipoAnimal
        }
    };

    db.animal.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'user not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'user updated successfully' });
    });
});
module.exports=router;