import * as SQLite from "expo-sqlite";

import { dateToString } from "../utils/date";

const db = SQLite.openDatabase(
  "chnchorders.db",
  "1.0.2",
  "ChnchOrders App Database"
);

const isInitializatedDataBase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='OrderItems'",
        null,
        (_, results) => {
          const tableExists = results.rows.item(0)["count(*)"] > 0;
          resolve(tableExists);
        },
        reject
      );
    });
  });
};

export const dropDatabase = async () => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      async (tx) => {
        console.log("deleting database tables ...");

        tx.executeSql(
          "DROP TABLE OrderItems ",
          null,
          (transaction, result) => {
            console.log("OrderItems table deleted succesfully");
          },
          (_, error) => {
            console.log("Error on delete OrderItems table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "DROP TABLE Orders",
          null,
          () => {
            console.log("Orders table deleted succesfully");
          },
          (_, error) => {
            console.log("Error delete Orders table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "DROP TABLE OrdersSheets",
          null,
          () => {
            console.log("OrdersSheets deleted succesfully");
          },
          (_, error) => {
            console.log("Error on delete OrdersSheets table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "DROP TABLE Types",
          null,
          () => {
            console.log("Types deleted succesfully");
          },
          (_, error) => {
            console.log("Error on delete Types table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "DROP TABLE Prices",
          null,
          () => {
            console.log("Prices deleted succesfully");
          },
          (_, error) => {
            console.log("Error on delete Prices table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "DROP TABLE Clients",
          null,
          () => {
            console.log("Clients deleted succesfully");
          },
          (_, error) => {
            console.log("Error on delete Clients table", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        console.log("database tables deleted");
        resolve();
      }
    );
  });
};

export const dbInitialize = async () => {
  const isInitializated = await isInitializatedDataBase();

  if (isInitializated) return null;

  return new Promise(async (resolve, reject) => {
    db.transaction(
      async (tx) => {
        console.log("creating database tables ...");

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Types " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT UNIQUE)",
          null,
          () => {
            console.log("Types table created succesfully");
          },
          (_, error) => {
            console.log("Error on create Types table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Prices " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INTEGER UNIQUE, unitprice REAL)",
          null,
          () => {
            console.log("Prices table created succesfully");
          },
          (_, error) => {
            console.log("Error on create Prices table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "INSERT INTO Prices (quantity, unitprice) VALUES (?, ?)",
          [1, 0],
          () => {
            console.log("Initial price inserted succesfully");
          },
          (_, error) => {
            console.log("Error on insert initial price", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Clients " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)",
          null,
          () => {
            console.log("Clients table created succesfully");
          },
          (_, error) => {
            console.log("Error on create Clients table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "OrdersSheets " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, date TEXT, " +
            "chargedtotal REAL, chargetotal REAL, ordertotal INTEGER, piecetotal INTEGER)",
          null,
          () => {
            console.log("OrdersSheets table created succesfully");
          },
          (_, error) => {
            console.log("Error on create OrdersSheets table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Orders " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT, chargedtotal REAL, " +
            "chargetotal REAL, piecetotal INTEGER, payapplied INTEGER DEFAULT 0, orderssheet INTEGER, " +
            "FOREIGN KEY(orderssheet) REFERENCES OrdersSheets(id) ON DELETE CASCADE)",
          null,
          () => {
            console.log("Orders table created succesfully");
          },
          (_, error) => {
            console.log("Error on create Orders table", error);
            reject(error);
          }
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "OrderItems " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, quantity INTEGER, type TEXT, parentorder INTEGER, " +
            "FOREIGN KEY(parentorder) REFERENCES Orders(id) ON DELETE CASCADE)",
          null,
          (transaction, result) => {
            console.log("OrderItems table created succesfully");
          },
          (_, error) => {
            console.log("Error on create OrderItems table", error);
            reject(error);
          }
        );
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        console.log("finish on create database tables");
        resolve();
      }
    );
  });
};

const mapResults = (results) => {
  const records = [];
  const len = results.rows.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      records.push(results.rows.item(i));
    }
  }
  return records;
};

const getResultObject = (results) => {
  const { rows } = results;
  return rows.item(0);
};

const addRecord = async (table, valuesObj) => {
  const commandFields = [];
  const values = [];
  let commandValues = "";
  for (const field in valuesObj) {
    if (Object.hasOwnProperty.call(valuesObj, field)) {
      commandFields.push(field);
      values.push(valuesObj[field]);
      commandValues += "?,";
    }
  }
  commandValues = commandValues.slice(0, -1);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${table} (${commandFields.join()}) VALUES (${commandValues})`,
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const getRecords = async (table, fieldList = null) => {
  const commandFields = fieldList ? fieldList.join() : "*";
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${commandFields} FROM ${table}`,
        [],
        (_, results) => {
          resolve(mapResults(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const filterRecords = async (table, field, value) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${table} WHERE ${field} = ?`,
        [value],
        (_, results) => {
          resolve(this.mapResults(results));
        },
        reject
      );
    });
  });
};

const deleteRecord = async (table, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${table} WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const updateRecord = async (table, valuesObj, id) => {
  const commandFields = [];
  const values = [];
  for (const field in valuesObj) {
    if (Object.hasOwnProperty.call(valuesObj, field)) {
      commandFields.push(`${field}=?`);
      values.push(valuesObj[field]);
    }
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${table} SET ${commandFields.join()}  WHERE id = ${id}`,
        values,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const updateInBulk = async (table, valuesObjList, fieldList) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        valuesObjList.forEach((valuesObj) => {
          const commandFields = [];
          const values = [];
          for (const field of fieldList) {
            if (Object.hasOwnProperty.call(valuesObj, field)) {
              commandFields.push(`${field}=?`);
              values.push(valuesObj[field]);
            }
          }
          tx.executeSql(
            `UPDATE ${table} SET ${commandFields.join()}  WHERE id = ${
              valuesObj.id
            }`,
            values,
            null,
            (_, error) => {
              reject(error);
            }
          );
        });
      },
      reject,
      () => {
        resolve();
      }
    );
  });
};

const createInBulk = async (table, valuesObjList, fieldList) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        valuesObjList.forEach((valuesObj) => {
          const commandFields = [];
          const commandValues = [];
          const values = [];
          for (const field of fieldList) {
            if (Object.hasOwnProperty.call(valuesObj, field)) {
              commandFields.push(field);
              commandValues.push("?");
              values.push(valuesObj[field]);
            }
          }
          tx.executeSql(
            `INSERT INTO ${table} (${commandFields.join()}) VALUES (${commandValues.join()})`,
            values,
            null,
            (_, error) => {
              reject(error);
            }
          );
        });
      },
      reject,
      () => {
        resolve();
      }
    );
  });
};

const deleteInBulk = async (table, idList) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        idList.forEach((id) => {
          tx.executeSql(
            `DELETE FROM ${table} WHERE id = ?`,
            [id],
            null,
            (_, error) => {
              reject(error);
            }
          );
        });
      },
      reject,
      () => {
        resolve();
      }
    );
  });
};

const getOrderSheetsList = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, name, date FROM OrdersSheets ORDER BY ID DESC",
        null,
        (_, results) => {
          resolve(mapResults(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const getOrdersSheetById = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM OrdersSheets WHERE ID = ?",
        [id],
        (_, results) => {
          const orderSheet = getResultObject(results);

          if (typeof orderSheet !== "undefined") {
            //  get orders
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT id, client as name, chargedtotal as chargedTotal, " +
                  "chargetotal as chargeTotal, piecetotal as pieceTotal, payapplied as payApplied " +
                  "FROM Orders " +
                  "WHERE Orders.orderssheet = ? ORDER BY ID DESC",
                [orderSheet.id],
                (_, results) => {
                  const orders = mapResults(results);
                  resolve({
                    ...orderSheet,
                    orders: orders,
                  });
                },
                (_, error) => {
                  reject(error);
                }
              );
            }, reject);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const getOrdersSheetTotal = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT COUNT(*) as orderTotal, IFNULL(SUM(chargedtotal), 0) as chargedTotal, " +
          "IFNULL(SUM(chargetotal), 0) as chargeTotal, " +
          "IFNULL(SUM(piecetotal), 0) as pieceTotal FROM Orders " +
          "WHERE Orders.orderssheet = ?",
        [id],
        (_, results) => {
          resolve(getResultObject(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

const getOrderById = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT Orders.id as id, Orders.client as name, Orders.chargedtotal as chargedTotal, Orders.orderssheet as ordersSheetId, " +
          "Orders.chargetotal as chargeTotal, Orders.piecetotal as pieceTotal, Orders.payapplied as payApplied, " +
          "OrderItems.id as itemId, OrderItems.quantity as itemQuantity, OrderItems.type as itemType " +
          "FROM Orders " +
          "LEFT JOIN OrderItems ON Orders.id = OrderItems.parentorder " +
          "WHERE Orders.id = ?",
        [id],
        (_, results) => {
          resolve(mapResults(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

export const getQuantityByType = async (sheetId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT OrderItems.type as type, SUM(OrderItems.quantity) as quantity " +
          "FROM Orders " +
          "INNER JOIN OrderItems ON OrderItems.parentorder = Orders.id " +
          "WHERE Orders.orderssheet = ? GROUP BY type",
        [sheetId],
        (_, results) => {
          resolve(mapResults(results));
        },
        (_, error) => {
          reject(error);
        }
      );
    }, reject);
  });
};

export const getInitialData = async () => {
  const types = await getRecords("Types");
  const prices = await getRecords("Prices");
  const orderSheets = await getOrderSheetsList();

  let currentOrdersSheet = null;
  if (orderSheets.length > 0) {
    currentOrdersSheet = await getOrdersSheetById(orderSheets[0].id);
  }

  return {
    types,
    prices,
    orderSheets,
    currentOrdersSheet,
  };
};

export const addOrdersSheet = async (name, date) => {
  const response = await addRecord("OrdersSheets", {
    name,
    date: dateToString(date),
    chargedtotal: 0,
    chargetotal: 0,
    ordertotal: 0,
    piecetotal: 0,
  });

  return {
    success: true,
    data: {
      id: response.insertId,
    },
  };
};

export const getOrdersSheet = async (id) => {
  return await getOrdersSheetById(id);
};

export const updatePrices = async (priceList) => {
  await updateInBulk("Prices", priceList, ["quantity", "unitprice"]);
  return true;
};

export const addPrices = async (priceList) => {
  await createInBulk("Prices", priceList, ["quantity", "unitprice"]);
  return true;
};

export const deletePrices = async (priceIdList) => {
  await deleteInBulk("Prices", priceIdList);
  return true;
};

export const getPrices = async () => {
  return await getRecords("Prices");
};

export const updateTypes = async (typeList) => {
  await updateInBulk("Types", typeList, ["description"]);
  return true;
};

export const addTypes = async (typeList) => {
  await createInBulk("Types", typeList, ["description"]);
  return true;
};

export const deleteTypes = async (typeIdList) => {
  await deleteInBulk("Types", typeIdList);
  return true;
};

export const getTypes = async () => {
  return await getRecords("Types");
};

export const getClients = async () => {
  return await getRecords("Clients", ["name"]);
};

export const addClient = async (name) => {
  return await addRecord("Clients", { name });
};

export const addOrder = async (ordersSheetId, clientName) => {
  let response = null;
  const responseOrder = await addRecord("Orders", {
    client: clientName,
    orderssheet: ordersSheetId,
    chargedtotal: 0,
    chargetotal: 0,
    piecetotal: 0,
  });

  if (responseOrder.rowsAffected === 1) {
    const ordersSheetTotal = await getOrdersSheetTotal(ordersSheetId);
    await updateRecord(
      "OrdersSheets",
      { ordertotal: ordersSheetTotal.orderTotal },
      ordersSheetId
    );

    response = {
      id: responseOrder.insertId,
      name: clientName,
      totals: ordersSheetTotal,
    };
  }

  return response;
};

export const deleteOrder = async (orderId, ordersSheetId) => {
  let response = null;

  const deleteResponse = await deleteRecord("Orders", orderId);

  if (deleteResponse.rowsAffected === 1) {
    const totals = await getOrdersSheetTotal(ordersSheetId);

    await updateRecord(
      "OrdersSheets",
      {
        ordertotal: totals.orderTotal,
        chargedtotal: totals.chargedTotal,
        chargetotal: totals.chargeTotal,
        piecetotal: totals.pieceTotal,
      },
      ordersSheetId
    );

    response = totals;
  }

  return response;
};

export const getOrderDetails = async (id) => {
  let orderDetails = null;
  const orderDetailRows = await getOrderById(id);
  if (orderDetailRows.length > 0) {
    const [order] = orderDetailRows;
    const orderItems = {};

    orderDetailRows.forEach(({ itemId, itemQuantity, itemType }) => {
      if (itemId !== null) {
        orderItems[itemType] = {
          id: itemId,
          quantity: itemQuantity,
        };
      }
    });

    orderDetails = {
      id: order.id,
      name: order.name,
      chargeTotal: order.chargeTotal,
      chargedTotal: order.chargedTotal,
      payApplied: order.payApplied,
      pieceTotal: order.pieceTotal,
      ordersSheetId: order.ordersSheetId,
      items: orderItems,
    };
  }

  return orderDetails;
};

export const updateOrderDetails = async (order, items) => {
  const newItems = [];
  const updateItems = [];

  items.forEach((item) => {
    if (item.id === null) {
      newItems.push({
        quantity: item.value,
        type: item.name,
        parentorder: order.id,
      });
    } else {
      updateItems.push({
        id: item.id,
        quantity: item.value,
      });
    }
  });

  // add items to order
  if (newItems.length > 0) {
    await createInBulk("OrderItems", newItems, [
      "quantity",
      "type",
      "parentorder",
    ]);
  }

  // update items for order
  if (updateItems.length > 0) {
    await updateInBulk("OrderItems", updateItems, ["quantity"]);
  }

  await updateRecord(
    "Orders",
    {
      chargeTotal: order.chargeTotal,
      pieceTotal: order.pieceTotal,
    },
    order.id
  );

  const ordersSheetTotal = await getOrdersSheetTotal(order.ordersSheetId);

  await updateRecord(
    "OrdersSheets",
    {
      chargetotal: ordersSheetTotal.chargeTotal,
      ordertotal: ordersSheetTotal.orderTotal,
      piecetotal: ordersSheetTotal.pieceTotal,
    },
    order.ordersSheetId
  );

  return await getOrdersSheetById(order.ordersSheetId);
};

export const updateOrderCharge = async (
  orderId,
  orderAmount,
  orderPayApplied,
  ordersSheetId
) => {
  let response = null;
  // update Orders chargedtotal with orderAmount and orderPayApplied by order orderId
  await updateRecord(
    "Orders",
    {
      chargedtotal: orderAmount,
      payApplied: orderPayApplied,
    },
    orderId
  );

  // update OrdersSheets chargedtotal by ordersSheetId
  const { chargedTotal } = await getOrdersSheetTotal(ordersSheetId);

  await updateRecord(
    "OrdersSheets",
    {
      chargedtotal: chargedTotal,
    },
    ordersSheetId
  );

  response = { sheetChargedTotal: chargedTotal };
  return response;
};
