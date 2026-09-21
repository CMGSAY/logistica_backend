const pool = require("../config/db");

class PagosModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = PagosModel;
