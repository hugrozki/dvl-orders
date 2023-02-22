export function dateToString(date) {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
}

export function dateToStringISO(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}
