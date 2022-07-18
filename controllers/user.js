const pool = require('../database/postgresql');

const addUser = async (req, res) => {
    try {
        const { nombre, edad, fecha } = req.body;
        await pool.query(`INSERT INTO usuario (nombre,edad,fecha_nacimiento) VALUES('${nombre}',${edad},'${fecha}')`);
        return res.status(201).json({
            ok: true,
            msg: 'Se agrego correctamente',
            user:{nombre,fecha,edad}
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: `Error ${e}`
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario");
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: `Error ${e}`
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, nombre, edad, fecha } = req.body;
        await pool.query("UPDATE usuario SET nombre=$1,edad=$2,fecha_nacimiento=$3 WHERE usuario.id=$4", [nombre, edad, fecha, id]);
        return res.status(201).json({
            ok: true,
            msg: 'Se actualizo correctamente',
            user:{id,nombre,edad,fecha}
        });
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: `Error ${e}`
        });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query(`SELECT * FROM usuario WHERE id=${id}`);
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: `Error ${e}`
        });
    }
}

module.exports = { addUser, getUsers, updateUser, getUser }