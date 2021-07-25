import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import firebase from "../config/firebase";

const Splash = ({ navigation }) => {
  const checkUser = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    });
  };

  setTimeout(() => {
    checkUser();
  }, 5000);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#212121",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Platform.OS == "web" ? (
        <ActivityIndicator size="large" animating={true} color="#eee" />
      ) : (
        <LottieView
          source={require("../Animation/LoadingScreen/L.json")}
          autoPlay={true}
          style={{ position: "relative", width: 300, height: 300 }}
        />
      )}

      <Text style={{ color: "#eee", fontSize: 20 }}>
        Loading Your Future .....
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
