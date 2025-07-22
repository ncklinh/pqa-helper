export function formatToGMT7(isoString: string): string {
  const date = new Date(isoString);

  // Create options for formatting
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Format date
  const formatted = new Intl.DateTimeFormat("en-GB", options).format(date);

  // Replace commas and format manually to match expected format
  const [day, month, year, time] = formatted.replace(",", "").split(/[/\s]/);
  return `${day}-${month}-${year} ${time} GMT+7`;
}
