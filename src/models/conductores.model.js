const pool = require("../config/db");

class ConductoresModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = ConductoresModel;
