const pool = require("../config/db");

class DireccionesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = DireccionesModel;
