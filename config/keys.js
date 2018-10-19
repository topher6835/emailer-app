// keys.js

if(process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

//  prod
//  1047435571736-vpbs5lt4h96eco98ba0dvodffsbi6hjs.apps.googleusercontent.com
//  FbtLz4gva6o6-4JP1NpgWJtA
