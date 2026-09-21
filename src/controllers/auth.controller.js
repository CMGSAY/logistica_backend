const AuthModel = require("../models/auth.model.js");

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const result = await AuthModel.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password_hash = $2', 
      [email, password]
    );
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Eliminar el password_hash antes de enviarlo
      delete user.password_hash;
      res.json({ success: true, mensaje: 'Bienvenido', usuario: user }); 
    } else {
      res.status(401).json({ success: false, mensaje: 'Correo o contraseña incorrectos' }); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };