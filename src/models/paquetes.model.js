const pool = require("../config/db");

class PaquetesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = PaquetesModel;
