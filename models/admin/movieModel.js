const movie = require("../../configs/config.js");

/* Phim */

movie.getAllMovie = async function () {
    return await movie.query(`SELECT m.*, d."StatusDescription"
      FROm "Movie" as m
      LEFT OUTER JOIN "DesStatus" as d ON m."MovieStatus" = d."StatusCode"`);
  }
movie.insUpd_Movie = async function(movieISN,movieName,plot,kindOfMovie,director,premiere,movieTime,country,poster,movieStatus,trailer,updatedBy){
    return movie.query(`SELECT fn_movie_insupd($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,[movieISN,movieName,plot,kindOfMovie,director,premiere,movieTime,country,poster,movieStatus,trailer,updatedBy])
  }
movie.deleteMovie = async function(MovieISN){
    return movie.query(`SELECT fn_movie_del($1)`,[MovieISN]);
  }

module.exports = movie;