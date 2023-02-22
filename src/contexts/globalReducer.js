import { dateToString } from "../utils/date";

export function globalReducer(state, action) {
  const { type, payload } = action;

  function setCurrentSheetbyId(list, id) {
    return list.map((x) => {
      x.current = id == x.id;
      return x;
    });
  }

  switch (type) {
    case "SET_STATE": {
      return Object.assign({}, state, payload);
    }

    case "CREATE_NEW_SHEET": {
      const concatSheetsList = [
        {
          id: payload.id,
          name: payload.name,
          date: dateToString(payload.date),
          current: true,
        },
      ].concat(state.ordersSheets);

      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign(
          {},
          state.currentOrdersSheet,
          payload
        ),
        ordersSheets: setCurrentSheetbyId(concatSheetsList, payload.id),
      });
    }

    case "SET_CURRENT_SHEET": {
      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign(
          {},
          state.currentOrdersSheet,
          payload
        ),
        ordersSheets: setCurrentSheetbyId(state.ordersSheets, payload.id),
      });
    }

    case "SET_PRICES": {
      return Object.assign({}, state, {
        settings: Object.assign({}, state.settings, { prices: payload }),
      });
    }

    case "SET_TYPES": {
      return Object.assign({}, state, {
        settings: Object.assign({}, state.settings, { types: payload }),
      });
    }

    case "SET_CLIENTS": {
      return Object.assign({}, state, {
        clients: payload.slice(),
      });
    }

    case "ADD_CLIENT": {
      return Object.assign({}, state, {
        clients: state.clients.concat([payload]),
      });
    }

    case "ADD_ORDER": {
      const { ordersSheetTotals, ...rest } = payload;

      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign({}, state.currentOrdersSheet, {
          orders: [rest].concat(state.currentOrdersSheet.orders),
          orderTotal: ordersSheetTotals.orderTotal,
          pieceTotal: ordersSheetTotals.pieceTotal,
          chargedTotal: ordersSheetTotals.chargedTotal,
          chargeTotal: ordersSheetTotals.chargeTotal,
        }),
      });
    }

    case "UPDATE_ORDER": {
      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign(
          {},
          state.currentOrdersSheet,
          payload
        ),
      });
    }

    case "UPDATE_ORDER_CHARGE": {
      const { sheetChargedTotal, orderId, orderCharged, orderApplied } =
        payload;

      const stateOrders = state.currentOrdersSheet.orders.slice();
      const foundIndex = stateOrders.findIndex((item) => item.id == orderId);

      stateOrders[foundIndex].chargedTotal = orderCharged;
      stateOrders[foundIndex].payApplied = orderApplied;

      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign({}, state.currentOrdersSheet, {
          chargedTotal: sheetChargedTotal,
          orders: stateOrders,
        }),
      });
    }

    case "DELETE_ORDER": {
      const { ordersSheetTotals, orderId } = payload;

      const stateOrders = state.currentOrdersSheet.orders.slice();
      const deletedIndex = stateOrders.findIndex((item) => item.id == orderId);

      stateOrders.splice(deletedIndex, 1);

      return Object.assign({}, state, {
        currentOrdersSheet: Object.assign({}, state.currentOrdersSheet, {
          orderTotal: ordersSheetTotals.orderTotal,
          chargedTotal: ordersSheetTotals.chargedTotal,
          chargeTotal: ordersSheetTotals.chargeTotal,
          pieceTotal: ordersSheetTotals.pieceTotal,
          orders: stateOrders,
        }),
      });
    }

    default:
      return state;
  }
}
