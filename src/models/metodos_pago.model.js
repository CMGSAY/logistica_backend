const pool = require("../config/db");

class Metodos_pagoModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Metodos_pagoModel;
