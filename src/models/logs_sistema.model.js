const pool = require("../config/db");

class Logs_sistemaModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Logs_sistemaModel;
