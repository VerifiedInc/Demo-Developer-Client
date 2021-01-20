export const isValidJson = (maybeJson: string): boolean => {
  try {
    JSON.parse(maybeJson);
    return true;
  } catch (e) {
    return false;
  }
};
