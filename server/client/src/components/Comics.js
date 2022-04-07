import comic0 from "../comics/comic0.png";
import comic1 from "../comics/comic1.png";
import comic2 from "../comics/comic2.png";
import comic3 from "../comics/comic3.png";
import comic4 from "../comics/comic4.png";
import comic5 from "../comics/comic5.png";

const Comics = () => {
  const randomComic = () => {
    const comicArray = [comic0, comic1, comic2, comic3, comic4, comic5];
    const generatedNumber = Math.floor(Math.random() * 5);

    return comicArray[generatedNumber];
  };

  return (
    <img
      src={randomComic()}
      className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 d-flex justify-content-center"
    ></img>
  );
};

export default Comics;
