export const newsArticles = async () => {
  try {
    const filterArticles = (articles) => {
      const filteredArticles = articles.filter((articles) => {
        return (
          !articles.title.includes("Invasion", 0) &&
          !articles.title.includes("invasion", 0) &&
          !articles.title.includes("war", 0) &&
          !articles.title.includes("War", 0) &&
          !articles.title.includes("WAR", 0) &&
          !articles.title.includes("Ukraine", 0) &&
          !articles.title.includes("Putin", 0) &&
          !articles.title.includes("Russia", 0) &&
          !articles.title.includes("Russian", 0) &&
          !articles.title.includes("Russia-Ukraine", 0) &&
          !articles.title.includes("mask", 0) &&
          !articles.title.includes("Mask", 0) &&
          !articles.title.includes("covid", 0) &&
          !articles.description.includes("covid", 0) &&
          !articles.title.includes("Covid", 0) &&
          !articles.description.includes("Covid", 0) &&
          !articles.title.includes("Covid-19", 0) &&
          !articles.description.includes("Covid-19", 0) &&
          !articles.title.includes("COVID-19", 0) &&
          !articles.description.includes("COVID-19", 0) &&
          !articles.title.includes("Coronavirus", 0) &&
          !articles.description.includes("Coronavirus", 0) &&
          !articles.title.includes("href", 0) &&
          !articles.title.includes("Hospitalizations", 0) &&
          !articles.title.includes("hospitalizations", 0) &&
          !articles.title.includes("Pandemic", 0) &&
          !articles.title.includes("pandemic", 0) &&
          !articles.title.includes("Vaccine", 0) &&
          !articles.title.includes("vaccine", 0) &&
          !articles.title.includes("Pfizer", 0) &&
          !articles.title.includes("Moderna", 0) &&
          !articles.title.includes("Omicron", 0) &&
          !articles.title.includes("omicron", 0) &&
          !articles.title.includes("Vaccinating", 0) &&
          !articles.title.includes("vaccinating", 0) &&
          !articles.title.includes("deaths", 0) &&
          !articles.title.includes("Deaths", 0) &&
          !articles.title.includes("Dead", 0) &&
          !articles.title.includes("dead", 0) &&
          !articles.title.includes("Homicide", 0) &&
          !articles.title.includes("homicide", 0) &&
          !articles.title.includes(" inflation ", 0) &&
          !articles.title.includes(" Inflation ", 0) &&
          !articles.title.includes(" gift card ", 0) &&
          !articles.title.includes(" Gift Card ", 0) &&
          !articles.title.includes(" on sale for ", 0) &&
          !articles.title.includes(" Un ", 0) &&
          !articles.title.includes(" un ", 0) &&
          !articles.title.includes(" en ", 0) &&
          !articles.title.includes(" En ", 0) &&
          !articles.title.includes(" que ", 0) &&
          !articles.title.includes(" Que ", 0) &&
          !articles.title.includes(" dies ", 0) &&
          !articles.title.includes(" avec ", 0) &&
          !articles.title.includes(" Avec ", 0) &&
          !articles.title.includes(" Les ", 0) &&
          !articles.title.includes(" les ", 0) &&
          !articles.title.includes(" de ", 0) &&
          !articles.title.includes(" De ", 0) &&
          !articles.title.includes(" ehrt ", 0) &&
          !articles.title.includes(" Ehrt ", 0) &&
          !articles.title.includes(" das ", 0) &&
          !articles.title.includes(" mit ", 0) &&
          !articles.title.includes(" zu ", 0) &&
          !articles.title.includes(" Zu ", 0) &&
          !articles.title.includes(" und ", 0) &&
          !articles.title.includes(" Und ", 0) &&
          !articles.title.includes(" Sein ", 0) &&
          !articles.title.includes(" sein ", 0) &&
          !articles.title.includes(" Und ", 0) &&
          !articles.title.includes(" die", 0) &&
          !articles.title.includes("η", 0) &&
          !articles.title.includes("ത", 0) &&
          !articles.title.includes("雪", 0) &&
          !articles.title.includes("child porn", 0) &&
          !articles.title.includes("Child porn", 0) 
        );
      });
      return filteredArticles;
    };

    const filterDuplicates = (articles) => {
      const titles = articles.map((o) => o.title);
      const filtered = articles.filter(
        ({ title }, index) => !titles.includes(title, index + 1)
      );
    console.log("filtered duplicates", filtered);
    return filtered;
  }

    const tech = await fetch(
      `https://gnews.io/api/v4/search?q=technology&token=${process.env.REACT_APP_GNEWSAPI}`
    );
    const jsonTech = await tech.json();
    const techArray = jsonTech.articles;

    const sports = await fetch(
      `https://gnews.io/api/v4/search?q=sports&token=${process.env.REACT_APP_GNEWSAPI}`
    );
    const jsonSports = await sports.json();
    const sportsArray = jsonSports.articles;

    const techSports = techArray.concat(sportsArray);

    const science = await fetch(
      `https://gnews.io/api/v4/search?q=science&token=${process.env.REACT_APP_GNEWSAPI}`
    );
    const jsonScience = await science.json();
    const scienceArray = jsonScience.articles;
    const allArticles = techSports.concat(scienceArray);
    console.log("allArticles", allArticles);

    console.log("filteredArticles", filterArticles(allArticles));
    const filteredArticles = filterArticles(allArticles);
    return filterDuplicates(filteredArticles);
  } catch (error) {
    console.log(error);
  }
};
