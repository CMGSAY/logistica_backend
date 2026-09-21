const pool = require("../config/db");

class AlmacenesModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = AlmacenesModel;
