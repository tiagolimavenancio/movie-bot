const config = require('../config');
const { discoverMovie } = require('./movieApi');

function loadMovieRoute(app) {
  app.post('/discover-movies', (req, res) => {    
    const kind = req.body.conversation.memory['recording'].type;

    const genreId = req.body.conversation.memory['genre'].id;

    const language = req.body.conversation.memory['language'];
    const nationality = req.body.conversation.memory['nationality'];

    const isoCode = language
      ? language.short.toLowerCase()
      : nationality.short.toLowerCase();

    return discoverMovie(kind, genreId, isoCode)
      .then((carouselle) => {
        res.json({
          replies: carouselle,
          conversation: {
            memory: {
              'name': 'PE',
            }
          }
        });
      })
      .catch((err) => {
        console.error('movieApi::discoverMovie error: ', err);
      });
  });
}

module.exports = loadMovieRoute;