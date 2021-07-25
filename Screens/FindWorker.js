import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import firebase from "../config/firebase";

const FindWorker = ({ navigation }) => {
  const [image, setimage] = useState(null);
  const [photo, setphoto] = useState(null);
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [positionNumber, setpositionNumber] = useState("");
  const [education, seteducation] = useState("");
  const [skillset, setskillset] = useState("");
  const [exp, setexp] = useState("");
  const [type, settype] = useState("");
  const [ads, setads] = useState("");
  const [salary, setsalary] = useState("");

  const auth = firebase.auth().currentUser;
  const db = firebase.firestore().collection("VacantPosts");

  const addData = async () => {
    setloading(true);
    if (
      name.trim().length === 0 ||
      phone.trim().length === 0 ||
      email.trim().length === 0 ||
      address.trim().length === 0 ||
      positionNumber.trim().length === 0 ||
      education.trim().length === 0 ||
      exp.trim().length === 0 ||
      skillset.trim().length === 0 ||
      type.trim().length === 0 ||
      salary.trim().length === 0 ||
      image === null
    ) {
      alert(
        "အောက်ဆုံးအချက်အလက်မှလွဲလျှင်  ဓာတ်ပုံအပါအဝင် ‌ဖောင်အားလုံးကိုဖြည့်ရပါမည်"
      );
      setloading(false);
    } else {
      await db
        .add({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: name,
          phone: phone,
          address: address,
          email: email,
          positionNumber: positionNumber,
          education: education,
          skillset: skillset,
          exp: exp,
          type: type,
          salary: salary,
          ads: ads,
        })
        .then(async (docRef) => {
          let doc = docRef;

          await db
            .doc(docRef.id)
            .set(
              {
                postId: docRef.id,
                ownerId: auth.uid,
              },
              { merge: true }
            )
            .then(() => {
              var metadata = {
                contentType: "image/jpeg",
              };
              const path = auth.email + "/VacantPostPicture/" + doc.id + ".jpg";
              const ref = firebase.storage().ref(path);
              var uploadTask = ref.put(photo, metadata);

              uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                  var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                      console.log("Upload is paused");
                      break;
                    case firebase.storage.TaskState.RUNNING:
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  switch (error.code) {
                    case "storage/unauthorized":
                      break;
                    case "storage/canceled":
                      break;

                    case "storage/unknown":
                      break;
                  }
                },
                () => {
                  uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(async (downloadURL) => {
                      console.log("File available at", downloadURL);
                      await db
                        .doc(doc.id)
                        .set(
                          {
                            photo: downloadURL,
                          },
                          { merge: true }
                        )
                        .catch((error) => {
                          alert("Error Occurs in Photo Upload !!", error);
                        });
                      setloading(false);
                      alert("Upload Completed Successfully");
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                      });
                    });
                }
              );
            });
        });
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, we need  Media Library & Camera Roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setimage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setphoto(blob);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        {loading === true ? (
          <ActivityIndicator animating={loading} size="large" color="#eee" />
        ) : (
          false
        )}
        <ScrollView
          style={{
            width: "100%",
            maxWidth: 600,
          }}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
            >
              {image === null ? (
                <MaterialCommunityIcons
                  name="image-outline"
                  size={100}
                  color="#eee"
                />
              ) : (
                <Image source={{ uri: image }} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="warehouse" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="လုပ်ငန်းအမည်"
              style={styles.input}
              onChangeText={(text) => {
                setname(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="ဆက်သွယ်ရန်ဖုန်းနံပါတ်"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setphone(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="အီးမေးလ်လိပ်စာ"
              style={styles.input}
              onChangeText={(text) => {
                setemail(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="map-marker" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="လုပ်ငန်းလိပ်စာ"
              style={styles.input}
              onChangeText={(text) => {
                setaddress(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account-group"
              size={35}
              color="black"
            />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="ခေါ်ဆိုမည့် ဝန်ထမ်းဦးရေ"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setpositionNumber(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="school" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="ပညာအရည်အချင်း"
              style={styles.input}
              onChangeText={(text) => {
                seteducation(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="tools" size={35} color="black" />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="ကျွမ်းကျင်ရာ ဘာသာရပ် (ဆော့ဝဲ/ဟက်ဝဲ)"
              style={styles.input}
              onChangeText={(text) => {
                setskillset(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="timer-sand-full"
              size={35}
              color="black"
            />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="လုပ်သက် အတွေ့အကြုံ"
              style={styles.input}
              onChangeText={(text) => {
                setexp(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="shield-star"
              size={35}
              color="black"
            />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="Full time / Part time / Freelance / Remote"
              style={styles.input}
              onChangeText={(text) => {
                settype(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="currency-usd-circle"
              size={35}
              color="black"
            />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="လစာ ( ဥပမာ - ညှိနှိုင်း )"
              style={styles.input}
              onChangeText={(text) => {
                setsalary(text);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="clipboard-file"
              size={35}
              color="black"
            />
            <View
              style={{
                borderLeftWidth: 1,
                height: 25,
                borderLeftColor: "gray",
                marginHorizontal: 10,
              }}
            ></View>
            <TextInput
              placeholder="လုပ်ငန်း၏ သဘောသဘာဝ ၊ စည်းကမ်းချက်များ နှင့် အလုပ်အကြောင်း အသေးစိတ်အချက်လက်များကို ရေးနိုင်သည် "
              style={styles.input}
              multiline={true}
              onChangeText={(text) => {
                setads(text);
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", padding: 5, alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={24}
              color="green"
            />
            <Text style={{ color: "red", marginLeft: 5, lineHeight: 22 }}>
              အလုပ်လျှောက်သည်နှင့်တစ်ပြိုင်နက် ဖြည့်ခဲ့သောအချက်အလက်များကို App
              အသုံးပြုသူတိုင်း မြင်နိုင်သည် ဆိုသည့်အချက်အား သိရှိပြီးဖြစ်ပါသည် ။
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addData();
            }}
          >
            <Text style={styles.btntext}>အလုပ်လျှောက်မည်</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default FindWorker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    padding: 10,
  },
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
  },
  btn: {
    alignSelf: "center",
    paddingHorizontal: 20,
    padding: 10,
    backgroundColor: "#329ea8",
    borderRadius: 15,
    elevation: 8,
    marginVertical: 10,
  },
  btntext: {
    fontWeight: "bold",
    color: "#eee",
  },
  imageContainer: {
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
