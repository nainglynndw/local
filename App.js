import React from "react";
import { StatusBar, TouchableOpacity, Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Post from "./Screens/Post";
import Login from "./Screens/Login";
import SetupProfile from "./Screens/SetupProfile";
import Splash from "./Screens/Splash";
import FindJob from "./Screens/FindJob";
import FindWorker from "./Screens/FindWorker";
import WorkerDetails from "./Screens/WorkerDetails";
import JobDetails from "./Screens/JobDetails";
import firebase from "./config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyPosts from "./Screens/MyPosts";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#eeeeee",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTitleStyle: {
            fontSize: 15,
            color: "#eeeeee",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "ဖုန်းဆားဗစ်အလုပ်အကိုင်များ",
            headerLeft: () => (
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#eee",
                  elevation: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                >
                  {firebase.auth().currentUser ? (
                    <Image
                      source={{ uri: firebase.auth().currentUser.photoURL }}
                      style={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={46}
                      color="black"
                    />
                  )}
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Post");
                }}
                style={{ marginRight: 5 }}
              >
                <MaterialCommunityIcons
                  name="text-box-plus-outline"
                  size={35}
                  color="#329ea8"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerTitle: "လူကြီးမင်းလိုအပ်သည်ကိုရွေးပါ",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "ကိုယ်ရေးအချက်အလက်များ",
          }}
        />
        <Stack.Screen
          name="SetupProfile"
          component={SetupProfile}
          options={{
            headerTitle: "ကိုယ်ရေးအချက်အလက်ပြင်ဆင်ရန်",
          }}
        />
        <Stack.Screen
          name="FindJob"
          component={FindJob}
          options={{
            headerTitle: "အလုပ်လျှောက်လွှာ",
          }}
        />
        <Stack.Screen
          name="FindWorker"
          component={FindWorker}
          options={{
            headerTitle: "အလုပ်ခေါ်စာ",
          }}
        />
        <Stack.Screen
          name="WorkerDetails"
          component={WorkerDetails}
          options={{
            headerTitle: "အသေးစိတ်အချက်အလက်",
          }}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetails}
          options={{
            headerTitle: "အလုပ်၏အသေးစိတ်အချက်အလက်",
          }}
        />
        <Stack.Screen
          name="MyPosts"
          component={MyPosts}
          options={{
            headerTitle: "My Posts",
          }}
        />
      </Stack.Navigator>

      <StatusBar barStyle="light-content" backgroundColor="#212121" />
    </NavigationContainer>
  );
}
