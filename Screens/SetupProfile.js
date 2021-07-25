import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../config/firebase";

export default function ImagePickerExample() {
  const [image, setImage] = useState(firebase.auth().currentUser.photoURL);
  const [data, setdata] = useState("");
  const [name, setname] = useState(firebase.auth().currentUser.displayName);
  const [email, setemail] = useState(firebase.auth().currentUser.email);
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [position, setposition] = useState("");
  const [url, seturl] = useState("");
  const [loading, setloading] = useState(false);

  let auth = firebase.auth().currentUser;
  let db = firebase.firestore().collection("users").doc(auth.uid);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      let db = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      await db.get().then((doc) => {
        setdata(doc.data());
      });
    };
    fetch();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setloading(true);
      setImage(result.uri);
      upload(result.uri)
        .then(() => {
          setTimeout(async () => {
            if (url === "") {
              Alert.alert("Upload Error", "Try Again Later");
              setloading(false);
            } else {
              await db
                .set(
                  {
                    photoURL: url,
                  },
                  { merge: true }
                )
                .then(async () => {
                  await auth.updateProfile({
                    photoURL: url,
                  });
                })
                .then(() => {
                  Alert.alert("Success Upload");
                  setloading(false);
                });
            }
          }, 2000);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  const upload = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const path = auth.email + "/ProfilePicture/" + auth.uid + ".jpg";
    const ref = firebase.storage().ref(path);
    const task = ref.put(blob);
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Unauthorized");
            break;
          case "storage/canceled":
            console.log("Cancle Upload");
            break;
          case "storage/unknown":
            console.log("Unknown Storage");
            break;
        }
      },
      async () => {
        await task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          seturl(downloadURL);
        });
      }
    );
  };

  const submit = async () => {
    let auth = firebase.auth().currentUser;
    let db = firebase.firestore().collection("users").doc(auth.uid);
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name.trim().length === 0) {
      alert("Invalid User Name");
    } else {
      if (re.test(email) === false) {
        alert("Invalid Email");
      } else {
        if (phone != "" && phone.length < 7) {
          alert("Invalid Phone");
        } else {
          auth
            .updateProfile({
              displayName: name === "" ? auth.displayName : name,
            })
            .then(() => {
              auth.updateEmail(email === "" ? auth.email : email);
            })
            .catch((error) => {
              console.log(error);
            });
          db.set(
            {
              name: name,
              email: email,
              phone: phone === "" ? data.phone : phone,
              position: position === "" ? data.position : position,
              address: address === "" ? data.address : address,
              user_id: auth.uid,
            },
            { merge: true }
          );
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      {loading === true ? (
        <ActivityIndicator animating={loading} size="large" color="#eee" />
      ) : (
        false
      )}
      <View style={[styles.container, { maxWidth: 600 }]}>
        <View style={styles.picContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 75, height: 75, borderRadius: 75 }}
          />
          <TouchableOpacity
            style={styles.btnPic}
            onPress={() => {
              pickImage();
            }}
          >
            <Text>Choose Photo</Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={require("../assets/Interview/Interview.gif")}
          style={{
            flex: 1,
            paddingVertical: 5,
            width: "100%",
            resizeMode: "contain",
            justifyContent: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}
              >
                <TextInput
                  placeholder="Enter Name"
                  style={styles.input}
                  placeholderTextColor="#bbb"
                  defaultValue={name}
                  onChangeText={(text) => {
                    setname(text);
                  }}
                />

                <TextInput
                  placeholder="Enter Email"
                  style={styles.input}
                  placeholderTextColor="#bbb"
                  defaultValue={email}
                  onChangeText={(text) => {
                    setemail(text);
                  }}
                />
                <TextInput
                  placeholder="Enter Phone"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholderTextColor="#bbb"
                  defaultValue={data ? data.phone : false}
                  onChangeText={(text) => {
                    setphone(text);
                  }}
                />
                <TextInput
                  placeholder="Enter Current Position"
                  style={styles.input}
                  placeholderTextColor="#bbb"
                  defaultValue={data ? data.position : false}
                  onChangeText={(text) => {
                    setposition(text);
                  }}
                />
                <TextInput
                  placeholder="Enter address"
                  style={styles.input}
                  placeholderTextColor="#bbb"
                  defaultValue={data ? data.address : false}
                  onChangeText={(text) => {
                    setaddress(text);
                  }}
                />
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => {
                submit();
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#212121",
  },
  picContainer: {
    alignItems: "center",
    marginTop: 5,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  btnPic: {
    backgroundColor: "#329ea8",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    elevation: 8,
    marginVertical: 10,
  },
  body: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#000000bb",
  },
  inputContainer: {
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#aaaaaa77",
    padding: 5,
    paddingLeft: 10,
    width: "90%",
    maxWidth: 500,
    borderRadius: 5,
    color: "#eee",
    marginVertical: 15,
  },
  btnSubmit: {
    marginTop: 25,
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: "#329ea8",
    borderRadius: 8,
    elevation: 8,
  },
});
