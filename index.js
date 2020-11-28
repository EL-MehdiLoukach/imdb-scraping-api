const express = require('express')
const server = express()
const PORT = process.env.PORT || 3333
const helmet = require('helmet')
const cors = require('cors')
const scraper = require('./scraper')

server.use(helmet());
server.use(cors())
server.use(express.urlencoded({ extended: false }));
server.use(express.json());


// api routes
server.get('/movie/:searchTerm', (req, res) => {
    scraper.searchMovies(req.params.searchTerm)
    .then(response => {
      return (
        res.json(response)
      )
    })
});




server.get('/movie/details/:imdbID', (req, res) => {
    scraper
      .getMovie(req.params.imdbID)
      .then(movie => {
        res.json(movie);
      });
  });
  

server.listen(PORT,()=>{
    console.log(`Magic is happening on port : ${PORT}`)
})