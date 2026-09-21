const pool = require("../config/db");

class TarifasModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = TarifasModel;
