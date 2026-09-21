const pool = require("../config/db");

class FacturasModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = FacturasModel;
