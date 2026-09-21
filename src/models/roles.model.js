const pool = require("../config/db");

class RolesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = RolesModel;
