const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['mascotas']);
const ObjectId = require('mongodb').ObjectId;


router.get('/mascotas',(req,res,next)=>{
    db.mascotas.find((err,mascotas) => {
        if(err) return next(err);
        res.json(mascotas);
    });
});

router.get('/mascotas/:id', (req, res, next) => {
    db.mascotas.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, mascotas) => {
        if (err) return next(err);

        if (!mascotas) {

            return res.status(404).json({ error: 'animal not found' });
        }

        res.json(mascotas);
    });
});

router.post('/mascotas', (req, res, next) => {
    const mascotas = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!mascotas.tipoAnimal) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.mascotas.save(mascotas, (err, mascotasSaved) => {
            if (err) return next(err);
            res.json(mascotasSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/mascotas/:id', (req, res, next) => {
    const mascotasID = req.params.id;

    if (!ObjectId.isValid(mascotasID)) {
        return res.status(400).json({ error: 'Invalid animal id' });
    }

    db.mascotas.remove({ _id: ObjectId(mascotasID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/mascotas/:id', (req, res, next) => {
    const mascotasID = req.params.id;
    const {duenio,
            nombreMascota,
            tipoAnimal,
            nombreRaza} = req.body;

    if (!ObjectId.isValid(mascotasID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(mascotasID) };
    const update = {
        $set: {
            duenio,
            nombreMascota,
            tipoAnimal,
            nombreRaza
        }
    };

    db.mascotas.updateOne(query, update, (err, result) => {
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