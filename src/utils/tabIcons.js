import { stack } from "./screenName";

const ordersSheet = {
  [stack.orders.ordersList.name]: "clipboard-text",
  [stack.orders.orderDetail.name]: "clipboard-text",
  [stack.orders.ordersNavigation.name]: "clipboard-text",
  [stack.charges.charges.name]: "currency-usd",
  [stack.totals.totals.name]: "table",
};

export const iconNames = {
  ordersSheet,
};
