const pool = require("../config/db");

class AuthModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = AuthModel;
