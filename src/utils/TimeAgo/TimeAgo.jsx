// Timestamp to Ago Time function
export const timeAgo = (timeStamp) => {
    // selecting the date to be modified
    const date = new Date(timeStamp);
    //format
    const dateFormat = new Intl.RelativeTimeFormat("en");
    // object used to calculate timestamp to ago time
    const timeRange = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const elapsed = (date.getTime() - Date.now()) / 1000;
    // looping through each key object and calculating until it results in a human readable time
    for (let key in timeRange) {
      if (timeRange[key] < Math.abs(elapsed)) {
        const difference = elapsed / timeRange[key];
        const relativeTime = dateFormat.format(Math.round(difference), key);
        return relativeTime;
      }
    }
  };
  