module.exports = {
  // Ruta MongoDB
  db: 'mongodb://localhost/medicalhistory',
  // String de cifrado de contraseña
  sessionSecret: 'developmentSessionSecret',
  // Credenciales de acceso como api de google
  google: {
    clientID: '917353860358-5mtvjoa0p88qlmsiu17vmbhar4bj9336.apps.googleusercontent.com',
    clientSecret: 'EYJUHFYVh01V4C7LBVFSczhw',
    callbackURL: 'http://localhost:3000/oauth/google/callback'
  }
};
