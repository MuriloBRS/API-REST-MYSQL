import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
});

async function cadastrar(nome, email) {
    const [result] = await pool.query(
        "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
        [nome, email]
    );

    return {
        id: result.insertId,
        nome,
        email
    };
}

async function listar() {
    const [rows] = await pool.query(
        "SELECT * FROM usuarios"
    );

    return rows;
}

async function atualizar(id, nome, email) {
    const [result] = await pool.query(
        `UPDATE usuarios
         SET nome = COALESCE(?, nome),
             email = COALESCE(?, email)
         WHERE id = ?`,
        [nome || null, email || null, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        id,
        nome,
        email
    };
}

async function deletar(id) {
    const [result] = await pool.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
}

export {
    cadastrar,
    listar,
    atualizar,
    deletar
};