import { createContext, useReducer } from "react";

import { globalReducer } from "./globalReducer";

export const INITIAL_GLOBAL_STATE = {
  currentOrdersSheet: {
    id: null,
    name: "",
    date: null,
    orders: [],
    chargedTotal: 0,
    chargeTotal: 0,
    orderTotal: 0,
    pieceTotal: 0,
  },
  ordersSheets: [],
  settings: {
    prices: [],
    types: [],
  },
  clients: [],
  counter: 0,
};

export const GlobalContext = createContext({});
export const GlobalDispatch = createContext(null);

export function GlobalState({ children }) {
  const [state, dispatch] = useReducer(globalReducer, INITIAL_GLOBAL_STATE);

  function setState(data) {
    const { currentOrdersSheet = null } = data;

    if (currentOrdersSheet) {
      data.currentOrdersSheet = {
        id: currentOrdersSheet.id,
        name: currentOrdersSheet.name,
        date: currentOrdersSheet.date,
        orders: currentOrdersSheet.orders,
        chargedTotal: currentOrdersSheet.chargedtotal,
        chargeTotal: currentOrdersSheet.chargetotal,
        orderTotal: currentOrdersSheet.ordertotal,
        pieceTotal: currentOrdersSheet.piecetotal,
      };
    }

    dispatch({
      type: "SET_STATE",
      payload: {
        ...data,
        ordersSheets: data.ordersSheets.map((item, index) => ({
          ...item,
          current: index === 0,
        })),
      },
    });
  }

  function createNewSheet(id, name, date) {
    dispatch({
      type: "CREATE_NEW_SHEET",
      payload: {
        id,
        name,
        date,
        orders: [],
        chargedTotal: 0,
        chargeTotal: 0,
        orderTotal: 0,
        pieceTotal: 0,
      },
    });
  }

  function setCurrentSheet(payload) {
    dispatch({
      type: "SET_CURRENT_SHEET",
      payload: {
        id: payload.id,
        name: payload.name,
        date: payload.date,
        orders: payload.orders,
        chargedTotal: payload.chargedtotal,
        chargeTotal: payload.chargetotal,
        orderTotal: payload.ordertotal,
        pieceTotal: payload.piecetotal,
      },
    });
  }

  function setPrices(prices) {
    dispatch({
      type: "SET_PRICES",
      payload: prices,
    });
  }

  function setTypes(types) {
    dispatch({
      type: "SET_TYPES",
      payload: types,
    });
  }

  function setClients(clientList) {
    dispatch({
      type: "SET_CLIENTS",
      payload: clientList,
    });
  }

  function addClient(clientName) {
    dispatch({
      type: "ADD_CLIENT",
      payload: clientName,
    });
  }

  function addOrder(id, clientName, totals) {
    dispatch({
      type: "ADD_ORDER",
      payload: {
        id,
        name: clientName,
        chargeTotal: 0,
        chargedTotal: 0,
        pieceTotal: 0,
        payApplied: 0,
        ordersSheetTotals: totals,
      },
    });
  }

  function updateOrder(ordersSheet) {
    dispatch({
      type: "UPDATE_ORDER",
      payload: {
        id: ordersSheet.id,
        name: ordersSheet.name,
        date: ordersSheet.date,
        orders: ordersSheet.orders,
        chargeTotal: ordersSheet.chargetotal,
        orderTotal: ordersSheet.ordertotal,
        pieceTotal: ordersSheet.piecetotal,
      },
    });
  }

  function changeOrderCharge(
    sheetChargedTotal,
    orderId,
    orderCharged,
    orderApplied
  ) {
    dispatch({
      type: "UPDATE_ORDER_CHARGE",
      payload: {
        sheetChargedTotal,
        orderId,
        orderCharged,
        orderApplied,
      },
    });
  }

  function deleteOrder(orderId, ordersSheetTotals) {
    dispatch({
      type: "DELETE_ORDER",
      payload: {
        orderId,
        ordersSheetTotals,
      },
    });
  }

  return (
    <GlobalContext.Provider value={{ ...state }}>
      <GlobalDispatch.Provider
        value={{
          setState,
          setCurrentSheet,
          createNewSheet,
          setPrices,
          setTypes,
          setClients,
          addClient,
          addOrder,
          updateOrder,
          changeOrderCharge,
          deleteOrder,
        }}
      >
        {children}
      </GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
}
