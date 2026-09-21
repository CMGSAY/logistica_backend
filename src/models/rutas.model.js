const pool = require("../config/db");

class RutasModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = RutasModel;
