const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['alimento']);
const ObjectId = require('mongodb').ObjectId;


router.get('/alimento',(req,res,next)=>{
    db.alimento.find((err,alimento) => {
        if(err) return next(err);
        res.json(alimento);
    });
});

router.get('/alimento/:id', (req, res, next) => {
    db.alimento.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, alimento) => {
        if (err) return next(err);

        if (!alimento) {

            return res.status(404).json({ error: 'user not found' });
        }

        res.json(alimento);
    });
});

router.post('/alimento', (req, res, next) => {
    const alimento = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!alimento.alimento) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.alimento.save(alimento, (err, alimentoSaved) => {
            if (err) return next(err);
            res.json(alimentoSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/alimento/:id', (req, res, next) => {
    const alimentoID = req.params.id;

    if (!ObjectId.isValid(alimentoID)) {
        return res.status(400).json({ error: 'Invalid pais id' });
    }

    db.alimento.remove({ _id: ObjectId(alimentoID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/alimento/:id', (req, res, next) => {
    const alimentoID = req.params.id;
    const {comida,alimento,porcion,categoria,calorias} = req.body;

    if (!ObjectId.isValid(alimentoID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(alimentoID) };
    const update = {
        $set: {
            comida,
            alimento,
            porcion,
            categoria,
            calorias
        }
    };

    db.alimento.updateOne(query, update, (err, result) => {
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