import Toast from "react-native-root-toast";

export const alertSettings = {
  duration: 8000,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
};

export const messageSettings = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
};

export function ToastAlert({ visible = false, message = "" }) {
  return (
    <Toast
      visible={visible}
      duration={8000}
      position={Toast.positions.BOTTOM}
      shadow={true}
      animation={true}
    >
      {message}
    </Toast>
  );
}
