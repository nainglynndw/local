import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

const WorkerDetails = ({ navigation, route }) => {
  const [zoom, setzoom] = useState(false);

  const data = route.params;

  function MyText(props) {
    return <Text style={styles.dataText}>{props.children}</Text>;
  }
  function MyText1(props) {
    return <Text style={styles.dataText1}>{props.children}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        <ImageBackground
          source={require("../assets/images/bg.jpg")}
          style={styles.bg}
        >
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={styles.imgbtn}
              onPress={() => {
                if (zoom === false) {
                  setzoom(true);
                } else {
                  setzoom(false);
                }
              }}
            >
              {zoom === true ? (
                <Text style={{ color: "#eee" }}> X </Text>
              ) : (
                false
              )}
              <Image
                source={{ uri: data.photo }}
                style={zoom === false ? styles.image : styles.zoomImage}
              />
            </TouchableOpacity>
            <View style={styles.data}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "flex-end" }}>
                    <MyText>အမည် </MyText>
                    <MyText>ကျွမ်းကျင်သောနယ်ပယ် </MyText>
                    <MyText>အလုပ်လုပ်နိုင်သောမြို့ </MyText>
                    <MyText>လိပ်စာ </MyText>
                    <MyText>အလုပ်အမျိုးအစား </MyText>
                    <MyText>လုပ်သက်အတွေ့အကြုံ </MyText>
                    <MyText>ပညာအရည်အချင်း </MyText>
                    <MyText>အီးမေးလ် </MyText>
                    <MyText>ဖုန်းနံပါတ် </MyText>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <MyText>
                      {`\t`} - {`\t`}
                    </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                    <MyText> - </MyText>
                  </View>
                  <View style={{ alignItems: "flex-start" }}>
                    <MyText1> {data.name} </MyText1>
                    <MyText1> {data.skillset}</MyText1>
                    <MyText1> {data.workplace}</MyText1>
                    <MyText1> {data.address}</MyText1>
                    <MyText1> {data.type}</MyText1>
                    <MyText1> {data.exp}</MyText1>
                    <MyText1> {data.education}</MyText1>
                    <TouchableOpacity
                      style={{ backgroundColor: "#0000002f", borderRadius: 5 }}
                      onPress={() => {
                        Linking.openURL(`mailto:${data.email}`);
                      }}
                    >
                      <MyText1> {data.email} </MyText1>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ backgroundColor: "#0000002f", borderRadius: 5 }}
                      onPress={() => {
                        Linking.openURL(`tel:${data.phone}`);
                      }}
                    >
                      <MyText1> {data.phone} </MyText1>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.aboutContainer}>
              <ScrollView>
                <Text style={styles.about}>{data.ads}</Text>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default WorkerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
  },
  webContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignItems: "center",
  },
  bg: {
    width: "100%",
    flex: 1,
    paddingVertical: 10,
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "#ffffff0f",
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderColor: "#686868",
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  imgbtn: {
    borderWidth: 3,
    borderColor: "#eee",
  },
  zoomImage: {
    position: "absolute",
    zIndex: 100000,
    width: "100%",
    height: 600,
    left: "-50%",
    top: 0,
    resizeMode: "contain",
  },
  data: {
    width: "100%",
    backgroundColor: "#ffffff11",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
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
  aboutContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#212121a5",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  about: {
    color: "#eee",
  },
});
