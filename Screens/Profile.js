import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const [data, setdata] = useState("");
  const db = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  useEffect(() => {
    const fetch = async () => {
      await db.get().then((doc) => {
        setdata(doc.data());
      });
    };
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.userHead}>
          <Image
            source={{ uri: firebase.auth().currentUser.photoURL }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomContainer}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                navigation.navigate("SetupProfile");
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="#eee"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              အမည် -{" "}
              <Text style={{ color: "#329ea8" }}>
                {data ? data.name : "Not set set"}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              အီးမေးလ် -{" "}
              <Text style={{ color: "#329ea8" }}>
                {firebase.auth().currentUser.email}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              လိပ်စာ -{" "}
              <Text style={{ color: "#329ea8" }}>
                {data ? data.address : "Not set yet"}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              ဖုန်းနံပါတ် -{" "}
              <Text style={{ color: "#329ea8" }}>
                {data ? data.phone : "Not set yet"}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              လက်ရှိအလုပ်/ရာထူး -{" "}
              <Text style={{ color: "#329ea8" }}>
                {data ? data.position : "Not set yet"}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#333333",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              elevation: 8,
              marginTop: 10,
            }}
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="logout" size={30} color="#212121" />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#eee",
                marginLeft: 20,
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
  },
  top: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userHead: {
    backgroundColor: "#2e3541",
    borderRadius: 50,
    marginBottom: -50,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    elevation: 8,
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2e3541",
    zIndex: -100,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    marginTop: 60,
    padding: 10,
    alignItems: "center",
    maxWidth: 600,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 45,
  },
  item: {
    padding: 10,
    width: "100%",
    margin: 10,
    backgroundColor: "#2b2b2b",
    elevation: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#eee",
    fontSize: 15,
    fontWeight: "bold",
  },
});
