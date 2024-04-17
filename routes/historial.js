const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['historial']);
const ObjectId = require('mongodb').ObjectId;


router.get('/historial',(req,res,next)=>{
    db.historial.find((err,historial) => {
        if(err) return next(err);
        res.json(historial);
    });
});

router.get('/historial/:id', (req, res, next) => {
    db.historial.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, historial) => {
        if (err) return next(err);

        if (!historial) {

            return res.status(404).json({ error: 'animal not found' });
        }

        res.json(historial);
    });
});

router.post('/historial', (req, res, next) => {
    const historial = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!historial.tipoAnimal) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.historial.save(historial, (err, historialSaved) => {
            if (err) return next(err);
            res.json(historialSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/historial/:id', (req, res, next) => {
    const historialID = req.params.id;

    if (!ObjectId.isValid(historialID)) {
        return res.status(400).json({ error: 'Invalid animal id' });
    }

    db.historial.remove({ _id: ObjectId(historialID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/historial/:id', (req, res, next) => {
    const historialID = req.params.id;
    const {
        duenio,
        nombreMascota,
        tipoAnimal,
        nombreRaza,
        nombreVacuna,
        fechaVacuna,
        tipoConsulta,
        observaciones
    } = req.body;

    if (!ObjectId.isValid(historialID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(historialID) };
    const update = {
        $set: {
            duenio,
            nombreMascota,
            tipoAnimal,
            nombreRaza,
            nombreVacuna,
            fechaVacuna,
            tipoConsulta,
            observaciones
        }
    };

    db.historial.updateOne(query, update, (err, result) => {
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