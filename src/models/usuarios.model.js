const pool = require("../config/db");

class UsuariosModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = UsuariosModel;
