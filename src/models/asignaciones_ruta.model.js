const pool = require("../config/db");

class Asignaciones_rutaModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Asignaciones_rutaModel;
