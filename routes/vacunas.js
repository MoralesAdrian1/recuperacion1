const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['vacuna']);
const ObjectId = require('mongodb').ObjectId;


router.get('/vacuna',(req,res,next)=>{
    db.vacuna.find((err,vacuna) => {
        if(err) return next(err);
        res.json(vacuna);
    });
});

router.get('/vacuna/:id', (req, res, next) => {
    db.vacuna.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, vacuna) => {
        if (err) return next(err);

        if (!vacuna) {

            return res.status(404).json({ error: 'animal not found' });
        }

        res.json(vacuna);
    });
});

router.post('/vacuna', (req, res, next) => {
    const vacuna = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!vacuna.nombreVacuna) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.vacuna.save(vacuna, (err, vacunaSaved) => {
            if (err) return next(err);
            res.json(vacunaSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/vacuna/:id', (req, res, next) => {
    const vacunaID = req.params.id;

    if (!ObjectId.isValid(vacunaID)) {
        return res.status(400).json({ error: 'Invalid animal id' });
    }

    db.vacuna.remove({ _id: ObjectId(vacunaID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/vacuna/:id', (req, res, next) => {
    const vacunaID = req.params.id;
    const {nombreVacuna} = req.body;

    if (!ObjectId.isValid(vacunaID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(vacunaID) };
    const update = {
        $set: {
            nombreVacuna
        }
    };

    db.vacuna.updateOne(query, update, (err, result) => {
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