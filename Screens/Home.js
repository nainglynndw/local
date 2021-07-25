import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import JobList from "./JobList";
import WorkerList from "./WorkerList";

const Tab = createMaterialTopTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Job"
      tabBarOptions={{
        inactiveTintColor: "#9e9e9e",
        activeTintColor: "#eeeeee",
        pressColor: "white",
        indicatorStyle: {
          backgroundColor: "#eeeeee",
        },
        style: { backgroundColor: "#424242" },
      }}
    >
      <Tab.Screen
        name="Job"
        component={JobList}
        options={{
          title: "ခေါ်ယူနေသောအလုပ်များ",
        }}
      />
      <Tab.Screen
        name="Worker"
        component={WorkerList}
        options={{
          title: "ဝန်ထမ်းများ",
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
