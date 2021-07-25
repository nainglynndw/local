import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from "react-native";

import firebase from "../config/firebase";
const WorkerList = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState([]);

  const auth = firebase.auth().currentUser;
  const db = firebase.firestore().collection("VacantPosts");

  setTimeout(() => {
    setloading(false);
  }, 3000);

  useEffect(() => {
    const fetch = () => {
      db.orderBy("createdAt", "desc").onSnapshot(
        { includeDocumentMetadataChanges: true },
        (doc) => {
          const Data = [];
          doc.forEach((doc) => {
            if (!doc.metadata.hasPendingWrites) {
              Data.push({
                ...doc.data(),
                key: doc.id,
              });
            }
            setdata(Data);
          });
        }
      );
    };
    fetch();
  }, []);

  const Loading = () => {
    return (
      <View style={styles.loading}>
        <Image
          source={require("../assets/Find/Find.gif")}
          style={styles.find}
        />
      </View>
    );
  };

  function MyText(props) {
    return <Text style={styles.dataText}>{props.children}</Text>;
  }
  function MyText1(props) {
    return <Text style={styles.dataText1}>{props.children}</Text>;
  }

  const Content = ({ item }) => {
    return (
      <View style={styles.contentContainer}>
        {item.ownerId === auth.uid ? (
          <TouchableOpacity style={{ width: "100%", marginRight: 5 }}>
            <Text
              style={{
                color: "#41ccd9",
                textAlign: "right",
              }}
            >
              *
            </Text>
          </TouchableOpacity>
        ) : (
          false
        )}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "flex-end" }}>
              <MyText>ခေါ်ဆိုသည့် ရာထူး</MyText>
              <MyText>လစ်လပ်နေရာ</MyText>
              <MyText>လုပ်ငန်းလိပ်စာ </MyText>
              <MyText>လစာ </MyText>
            </View>
            <View style={{ alignItems: "center" }}>
              <MyText>
                {`\t`} - {`\t`}
              </MyText>
              <MyText> - </MyText>
              <MyText> - </MyText>
              <MyText> - </MyText>
            </View>
            <View style={{ alignItems: "flex-start" }}>
              <MyText1> {item.skillset}</MyText1>
              <MyText1> {item.positionNumber} </MyText1>
              <MyText1> {item.address}</MyText1>
              <MyText1> {item.salary}</MyText1>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.detail}>
            {new Date(item.createdAt.seconds * 1000).toLocaleTimeString() +
              "  /  " +
              new Date(item.createdAt.seconds * 1000).toDateString()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("JobDetails", item);
            }}
          >
            <Text style={styles.detail}> Details {`>>>`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        {loading === true ? (
          Loading()
        ) : (
          <ImageBackground
            source={require("../assets/images/bg.jpg")}
            style={styles.bg}
          >
            <FlatList
              data={data}
              renderItem={Content}
              keyExtractor={(item) => item.postId}
              initialNumToRender={10}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    setrefresh(true);
                    setTimeout(() => {
                      setrefresh(false);
                    }, 2000);
                    setdata(data);
                  }}
                />
              }
            />
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

export default WorkerList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#212121",
    flex: 1,
    alignItems: "center",
  },
  webContainer: {
    width: "100%",
    maxWidth: 600,
    flex: 1,
    alignItems: "center",
  },

  bg: {
    width: "100%",
    flex: 1,
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "#ffffff0f",
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#686868",
    borderRadius: 5,
  },
  loading: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  find: {
    width: 200,
    height: 200,
  },
  dataText: {
    color: "#ddd",
    lineHeight: 23,
    fontSize: 12,
  },
  dataText1: {
    color: "#41ccd9",
    lineHeight: 23,
    fontSize: 12,
  },
  detail: {
    color: "#ababab",
    fontSize: 10,
  },
});
