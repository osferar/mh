// Cargar las dependencias de módulos
var passport = require('passport'),
  url = require('url'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  config = require('../config'),
  users = require('../../app/controllers/users.server.controller');

// Crear la estrategia google del método de configuración
module.exports = function() {
  // Usar la estrategia Google de Passport
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    // Cargamos el perfil de google en el perfil de usuario
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'google',
      providerId: profile.id,
      providerData: providerData
    };
    // Guardamos el perfil de usuario de google
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
