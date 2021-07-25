import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../config/firebase";
import * as Facebook from "expo-facebook";

const Login = ({ navigation }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      console.log("No User");
    }
  });

  const FbLogin = async () => {
    if (Platform.OS === "web") {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((user) => {
          const credential = user.credential;
          const accessToken = credential.accessToken;
          const userInfo = firebase.auth().currentUser;
          const id = userInfo.providerData[0].uid;
          const data = user.additionalUserInfo.profile.email;
          userInfo
            .updateProfile({
              photoURL:
                "https://graph.facebook.com/" +
                id +
                "/picture?height=500&access_token=" +
                accessToken,
            })
            .then(() => {
              firebase.auth().currentUser.updateEmail(data);
            })
            .then(() => {
              console.log(
                "Update Successful",
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              );
            });
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      try {
        await Facebook.initializeAsync({ appId: "4474818742582603" });
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });

        if (type === "success") {
          const credential =
            firebase.auth.FacebookAuthProvider.credential(token);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((user) => {
              var userInfo = firebase.auth().currentUser;
              var id = userInfo.providerData[0].uid;
              let data = user.additionalUserInfo.profile.email;
              console.log(user.additionalUserInfo.profile);
              userInfo
                .updateProfile({
                  photoURL:
                    "https://graph.facebook.com/" +
                    id +
                    "/picture?height=500&access_token=" +
                    token,
                })
                .then(() => {
                  userInfo.updateEmail(data);
                });
            })
            .catch((error) => {
              console.log("SignInError :" + error);
            });
        }
      } catch (error) {
        console.log("Authentication Error :" + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Text style={{ fontSize: 28, color: "#eee" }}>Local</Text>
        <Text style={{ fontSize: 18, color: "#b2b2b2" }}>
          ဖုန်းဆားဗစ်အလုပ်အကိုင်ရှာဖွေရေး
        </Text>
      </View>
      <View style={styles.child}>
        <Image
          source={require("../assets/Interview/Interview.gif")}
          style={{
            resizeMode: "contain",
            width: 300,
            height: 300,
          }}
        />
      </View>
      <View style={styles.child}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            FbLogin();
          }}
        >
          <FontAwesome5
            style={styles.icon}
            name="facebook-f"
            size={24}
            color="#eee"
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            Login With Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#212121",
  },
  btn: {
    backgroundColor: "#329ea8",
    padding: 10,
    width: "80%",
    maxWidth: 600,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    borderRadius: 5,
  },
  child: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});
