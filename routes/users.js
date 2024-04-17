const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/veterinaria',['users']);
const ObjectId = require('mongodb').ObjectId;


router.get('/user',(req,res,next)=>{
    db.user.find((err,user) => {
        if(err) return next(err);
        res.json(user);
    });
});

router.get('/user/:id', (req, res, next) => {
    db.user.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, user) => {
        if (err) return next(err);

        if (!user) {

            return res.status(404).json({ error: 'user not found' });
        }

        res.json(user);
    });
});

router.post('/user', (req, res, next) => {
    const user = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!user.username) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.user.save(user, (err, userSaved) => {
            if (err) return next(err);
            res.json(userSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/user/:id', (req, res, next) => {
    const UserID = req.params.id;

    if (!ObjectId.isValid(UserID)) {
        return res.status(400).json({ error: 'Invalid pais id' });
    }

    db.user.remove({ _id: ObjectId(UserID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'user not found' });
        }

        res.json({ message: 'user deleted successfully' });
    });
});

router.put('/user/:id', (req, res, next) => {
    const UserID = req.params.id;
    const {username, email,password} = req.body;

    if (!ObjectId.isValid(UserID)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const query = { _id: ObjectId(UserID) };
    const update = {
        $set: {
            username,
            email,
            password,
        }
    };

    db.user.updateOne(query, update, (err, result) => {
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