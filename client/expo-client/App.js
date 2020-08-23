import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Modal,
  TouchableHighlight
} from "react-native";
import socketIO from "socket.io-client";

const App = () => {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const socket = socketIO("localhost:5000", {
      transports: ["websocket"],
      jsonp: false
    });
    socket.connect();
    socket.on("connect", () => {
      console.log("connected to socket server");
    });
  });

  const renderModalContent = () => {
    return (
      <View>
        <Text>
          <TextInput placeholder="Enter room nr" />
          <Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            title="Create Room"
            color="#841584"
          />
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent="true" visible={modalVisible}>
        {renderModalContent}
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default App;

// Temp Styling!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
