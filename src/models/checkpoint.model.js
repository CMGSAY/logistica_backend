const pool = require("../config/db");

class CheckpointModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = CheckpointModel;
