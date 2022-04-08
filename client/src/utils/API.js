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
