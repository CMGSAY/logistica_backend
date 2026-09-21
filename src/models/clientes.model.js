const pool = require("../config/db");

class ClientesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = ClientesModel;
