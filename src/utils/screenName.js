const ordersSheet = {
  noOrdersSheet: { name: "NoOrdersSheet", title: "No hoja de pedido" },
  newOrdersSheet: { name: "NewOrdersSheet", title: "Crear hoja de pedido" },
  ordersSheet: { name: "OrdersSheet", title: "Hoja de pedido actual" },
  orderSheetNavigation: { name: "OrderSheetNavigation", title: "" },
};

const ordersSheetSelection = {
  ordersSheetList: {
    name: "OrdersSheetList",
    title: "Seleccionar hoja de pedido",
  },
};

const orders = {
  ordersNavigation: { name: "OrdersNavigation", title: "" },
  ordersList: { name: "OrdersList", title: "Órdenes" },
  ordersSelectClient: {
    name: "OrdersSelectClient",
    title: "Seleccionar cliente",
  },
  ordersAddClient: {
    name: "OrdersAddClient",
    title: "Agregar cliente",
  },
  orderDetail: {
    name: "OrderDetail",
    title: "Detalle de órden",
  },
};

const charges = {
  charges: { name: "Charges", title: "Cobros" },
};

const totals = {
  totals: { name: "Totals", title: "Totales" },
};

const settings = {
  settingsNavigation: { name: "SettingsNavigation", title: "" },
  settings: { name: "Settings", title: "Configuraciones" },
  settingsPrice: { name: "SettingsPrice", title: "Precios" },
  settingsType: { name: "SettingsTypes", title: "Tipos" },
};

export const stack = {
  ordersSheet,
  ordersSheetSelection,
  orders,
  charges,
  totals,
  settings,
};
