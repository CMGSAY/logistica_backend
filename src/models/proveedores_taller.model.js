const pool = require("../config/db");

class Proveedores_tallerModel {
    static async query(text, params) {
        return pool.query(text, params);
    }
}

module.exports = Proveedores_tallerModel;
