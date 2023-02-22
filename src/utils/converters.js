export function numberToString(number) {
  const string = number.toString(10);
  return isNaN(string) ? "" : string;
}

export function stringToNumber(string) {
  const number = parseInt(string, 10);
  return isNaN(number) ? 0 : number;
}

export function stringToFloat(string) {
  const number = parseFloat(string);
  return isNaN(number) ? 0 : number;
}

export function slugify(string) {
  return string
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
