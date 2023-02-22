import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import Toast from "react-native-root-toast";

import { containerStyles } from "../../styles/Containers.styles";
import { styles } from "./OrderDetail.styles";
import { stack } from "../../utils/screenName";
import { slugify } from "../../utils/converters";
import { alertSettings } from "../../components/shared/ToastAlert";
import { GlobalContext, GlobalDispatch } from "../../contexts/GlobalState";
import { CounterBox } from "../../components/shared";
import { OrderDetailTitle } from "./OrderDetailTitle";
import { OrderDetailStepper } from "./OrderDetailStepper";
import { Confirm } from "../../components/shared";
import {
  getOrderDetails,
  updateOrderDetails,
  deleteOrder as deleteOrderDB,
} from "../../services/datastorage";

export function OrderDetail({ navigation, route }) {
  const { settings, currentOrdersSheet } = useContext(GlobalContext);
  const { updateOrder, deleteOrder } = useContext(GlobalDispatch);
  const [order, setOrder] = useState(null);
  const [orderItemsState, setOrderItemsState] = useState([]);
  const [unitPriceState, setUnitPriceState] = useState(0);
  const [savinData, setSavinData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { prices, types } = settings;

  const fetchData = async (selectedOrderId) => {
    const orderDetails = await getOrderDetails(selectedOrderId);

    if (orderDetails !== null) {
      const { items, ...rest } = orderDetails;
      // get unit price
      setUnitPriceState(
        prices.find((element) => element.quantity == 1)?.unitprice
      );

      if (Object.keys(items).length === 0) {
        // create type list with value 0 for all
        setOrderItemsState(
          types.map((item) => {
            return {
              key: slugify(item.description),
              id: null,
              name: item.description,
              value: 0,
            };
          })
        );
      } else {
        // create type list with quantity values from order
        const populatedList = types.map((item) => {
          const itemValue = items[item.description];
          // delete populated item
          delete items[item.description];
          return {
            key: slugify(item.description),
            id: itemValue?.id || null,
            name: item.description,
            value: itemValue?.quantity || 0,
          };
        });
        // if some quantity value remains add to list
        const remainTypes = Object.keys(items);
        if (remainTypes.length > 0) {
          remainTypes.forEach((element) => {
            const itemValue = items[element];
            populatedList.push({
              key: slugify(element),
              id: itemValue.id,
              name: element,
              value: itemValue.quantity,
            });
          });
        }

        setOrderItemsState(populatedList);
      }
      // order values
      setOrder(rest);
    }
  };

  useEffect(() => {
    fetchData(route.params?.orderId);
  }, []);

  const getPrice = (quantity) => {
    const findedPrice = prices.find((element) => quantity == element.quantity);
    return typeof findedPrice === "undefined" ? null : findedPrice.unitprice;
  };

  const onChangeHandler = (index, value) => {
    const orderList = orderItemsState.slice();
    orderList[index].value = value;

    let numPieces = 0;
    orderList.forEach((element) => {
      numPieces += element.value;
    });

    const totalPrice = getPrice(numPieces);

    setOrder({
      ...order,
      pieceTotal: numPieces,
      chargeTotal: totalPrice || unitPriceState * numPieces,
    });
    setOrderItemsState(orderList);
    setSavinData(numPieces === 0);
  };

  const saveOrder = async () => {
    setSavinData(true);
    try {
      const ordersSheet = await updateOrderDetails(order, orderItemsState);
      updateOrder(ordersSheet);
      navigation.navigate(stack.orders.ordersList.name, {
        orderUpdated: order.id,
      });
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
      setSavinData(false);
    }
  };

  const removeOrder = async () => {
    try {
      const response = await deleteOrderDB(order.id, currentOrdersSheet.id);

      if (response !== null) {
        deleteOrder(order.id, response);
        navigation.navigate(stack.orders.ordersList.name, {
          orderDeleted: order.id,
        });
      }
    } catch (error) {
      Toast.show(`Ocurrió un error : ${error.message}`, alertSettings);
    }
  };

  const changeOrderHandler = (nextOrderId) => {
    setOrder(null);
    fetchData(nextOrderId);
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <View style={[containerStyles.main]}>
      {order && (
        <ScrollView>
          <View style={styles.innerContainer}>
            <OrderDetailTitle
              item={order}
              onPressNavigation={changeOrderHandler}
            />
            <CounterBox
              box1Title="Total Piezas"
              box1Value={order.pieceTotal.toString()}
              box2Title="Monto"
              box2Value={`$${order.chargeTotal.toString()}`}
              containerStyles={{
                paddingLeft: 10,
                paddingRight: 10,
                marginBottom: 10,
              }}
            />
            <Text style={styles.unitPrice}>
              Precio unitario: ${unitPriceState}
            </Text>

            {order.payApplied === 1 && (
              <Text style={styles.unitPrice}>Pago aplicado</Text>
            )}

            <OrderDetailStepper
              items={orderItemsState}
              onChangeHandler={onChangeHandler}
              disabled={order.payApplied}
            />

            <Button title="Guardar" onPress={saveOrder} disabled={savinData} />
            <Button
              containerStyle={styles.actionButton}
              title="Eliminar"
              color="error"
              onPress={toggleModal}
            />
          </View>
        </ScrollView>
      )}
      <Confirm
        isVisible={showModal}
        title="Eliminar órden"
        text="¿Desea eliminar definitivamente esta órden?"
        cancelHandler={toggleModal}
        acceptHandler={removeOrder}
      />
    </View>
  );
}
