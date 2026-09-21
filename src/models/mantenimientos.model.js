const pool = require("../config/db");

class MantenimientosModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = MantenimientosModel;
