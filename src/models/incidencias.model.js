const pool = require("../config/db");

class IncidenciasModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = IncidenciasModel;
