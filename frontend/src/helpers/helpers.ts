export const parseDate = (timeLeft: number) => {
  // convert javascript date number to seconds, minutes, hours and days left
  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) {
    return `${seconds} seconds left!`;
  }
  if (minutes < 60) {
    return `${minutes} minutes left!`;
  }
  if (hours < 24) {
    return `${hours} hours left!`;
  }
  return `${days} days left!`;
};
