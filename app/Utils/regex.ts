export const getDate = (date: string): number => {
    const regex = /\/Date\((\d+)\)\//;
    const match = date.match(regex);
    if (match) {
        const extractedValue = match[1];
        return Number(extractedValue);
      } else {
        return 0;
      }
}