const pool = require("../config/db");

class EnviosModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = EnviosModel;
