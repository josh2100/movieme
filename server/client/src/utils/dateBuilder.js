const buildDate = (addedDays) => {
    //https://stackoverflow.com/questions/3572561/set-date-10-days-in-the-future-and-format-to-dd-mm-yyyy-e-g-21-08-2010
    // Based the link found above, with "added days" argument for flexibility
    // Input 0 as argument for today
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + addedDays);
  
    const dd = targetDate.getDate();
    const mm = targetDate.getMonth() + 1;
    const yyyy = targetDate.getFullYear();
  
    const dateString = `${mm}/${dd}/${yyyy}`;
  
    return dateString;
  };

  export default buildDate;