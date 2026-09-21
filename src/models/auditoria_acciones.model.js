const pool = require("../config/db");

class Auditoria_accionesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Auditoria_accionesModel;
