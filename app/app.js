const Server = require('./server.js')
const port = (process.env.PORT || 8888)
const app = Server.app();
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser')

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://localhost:8888/profile'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var stateKey = 'spotify_auth_state';


if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.deployment.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(port);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/login', function(req, res) {
  
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/profile', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  
  if (state === null || state !== storedState) {
    
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        
        res.cookie('access_token', access_token)

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
      
        request.get(options, function(error, response, body) {
          res.cookie('user_id', body.id);
          res.redirect('/playlists');
        });
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          })
        );
      }
    });
  }
});

app.get('/playlists', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));  
});

app.get('/account', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));  
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));  
});

app.get('/playlists', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));  
});

app.get('/getPlaylists', function(req, res) {
  var x = req.cookies;
  var access_token = x.access_token;
  var user_id = x.user_id;
  console.log
  var options = {
    url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  request.get(options, function(error, response, body) {
    //console.log(body);
    res.send(JSON.stringify(body));
  });
});

app.get('/getPlaylistTracks', function(req, res) {
  var playlist_id = req.query.id;
  var x = req.cookies;
  var access_token = x.access_token;
  var user_id = x.user_id;
  
  var options = {
    url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.send(JSON.stringify(body));
  });
});

app.get('/getTrackFeatures', function(req, res) {
  var track_ids = req.query.ids;
  console.log(req.query);
  var x = req.cookies;
  var access_token = x.access_token;
  var user_id = x.user_id;
  
  var options = {
    url: 'https://api.spotify.com/v1/audio-features?ids=' + track_ids,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  request.get(options, function(error, response, body) {
    res.send(JSON.stringify(body));
  });
});

console.log(`Listening at http://localhost:${port}`)
