const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['raza']);
const ObjectId = require('mongodb').ObjectId;


router.get('/raza',(req,res,next)=>{
    db.raza.find((err,raza) => {
        if(err) return next(err);
        res.json(raza);
    });
});

router.get('/raza/:id', (req, res, next) => {
    db.raza.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, raza) => {
        if (err) return next(err);

        if (!raza) {

            return res.status(404).json({ error: 'animal not found' });
        }

        res.json(raza);
    });
});

router.post('/raza', (req, res, next) => {
    const raza = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!raza.tipoAnimal) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.raza.save(raza, (err, razaSaved) => {
            if (err) return next(err);
            res.json(razaSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/raza/:id', (req, res, next) => {
    const razaID = req.params.id;

    if (!ObjectId.isValid(razaID)) {
        return res.status(400).json({ error: 'Invalid animal id' });
    }

    db.raza.remove({ _id: ObjectId(razaID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/raza/:id', (req, res, next) => {
    const razaID = req.params.id;
    const {tipoAnimal,nombreRaza} = req.body;

    if (!ObjectId.isValid(razaID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(razaID) };
    const update = {
        $set: {
            tipoAnimal,
            nombreRaza
        }
    };

    db.raza.updateOne(query, update, (err, result) => {
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