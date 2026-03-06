import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup } from "../screens";
import { ThemeContext } from "styled-components/native";

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerBackButtonDisplayMode: "minimal" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
