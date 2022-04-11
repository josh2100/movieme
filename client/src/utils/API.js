export const movieSearch = async () => {
  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/550?api_key=20de5a88f2545243e1111f80833e5b2e`
    );
    const jsonMovie = await movie.json();

    console.log(jsonMovie);
    return jsonMovie;
  } catch (error) {
    console.log(error);
  }
};

export const movieSearchByQuery = async (genre) => {

  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=20de5a88f2545243e1111f80833e5b2e&query=${genre}`
    );
    const jsonMovie = await movie.json();

    console.log("json movies", jsonMovie);
    console.log("movie results from api", jsonMovie.results);
    let returnedMovies = jsonMovie.results;
    return returnedMovies;
  } catch (error) {
    console.log(error);
  }
};
