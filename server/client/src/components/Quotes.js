function Quotes() {
  const randomQuote = () => {
    const generatedNumber = Math.floor(Math.random() * 7);

    const quotes = [
      "It always seems impossible until it's done. -Nelson Mandela",
      "Start where you are. Use what you have. Do what you can. -Arthur Ashe",
      "When something is important enough, you do it even if the odds are not in your favor. -Elon Musk",
      "Life is 10% what happens to you and 90% how you react to it. -Charles R. Swindoll",
      "It does not matter how slowly you go as long as you do not stop. -Confucius",
      "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. -Helen Keller",
      "There is only one corner of the universe you can be certain of improving, and that's your own self. -Aldous Huxley" 
    ];

    return quotes[generatedNumber];
  };

  return (
    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 mb-4 ms-1 no-gutters">
      <h3>
        <strong>Positive Quote of the Day</strong>
      </h3>
      <p className="">{randomQuote()}</p>
    </div>
  );
}

export default Quotes;
