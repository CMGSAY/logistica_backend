const pool = require("../config/db");

class Seguros_envioModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Seguros_envioModel;
