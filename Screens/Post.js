import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const Post = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        <View style={styles.jobFinder}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("FindJob");
            }}
          >
            <Image
              source={require("../assets/Find/job.gif")}
              style={styles.gif}
            />
            <Text style={styles.choose}>အလုပ်လျှောက်မည်</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 200,
            borderTopWidth: 2,
            borderTopColor: "#fff",
            alignSelf: "center",
          }}
        ></View>
        <View style={styles.workerFinder}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("FindWorker");
            }}
          >
            <Image
              source={require("../assets/Find/hire.gif")}
              style={styles.gif}
            />
            <Text style={styles.choose}>ဝန်ထမ်းခေါ်မည်</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  webContainer: {
    flex: 1,
  },
  jobFinder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  workerFinder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#212121",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  choose: {
    color: "#d2d2d2",
    fontSize: 17,
  },
  gif: {
    width: 150,
    height: 150,
    margin: 10,
  },
});
