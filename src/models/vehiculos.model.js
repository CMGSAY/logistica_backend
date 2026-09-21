const pool = require("../config/db");

class VehiculosModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = VehiculosModel;
