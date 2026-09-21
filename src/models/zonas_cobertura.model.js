const pool = require("../config/db");

class Zonas_coberturaModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Zonas_coberturaModel;
