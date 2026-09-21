const pool = require("../config/db");

class Tipos_empaqueModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Tipos_empaqueModel;
