import { Alert, Text } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Input } from "../components";
import { images } from "../utils/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemeContext } from "styled-components/native";
import { removeWhitespace, validateEmail } from "../utils/common";
import { login } from "../utils/firebase";

const Container = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ({ theme }) => theme.background,
        padding: 20,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

const ErrorText = ({ text }) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        alignItems: "flex-start",
        width: "100%",
        height: 20,
        marginBottom: 10,
        lineHeight: 20,
        color: theme.errorText,
      }}
    >
      {text}
    </Text>
  );
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _hanldeEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email",
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      const user = await login({ email, password });
      Alert.alert("Login Success", `Welcome back ${user.email}`);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Email"
          value={email}
          onChangeText={_hanldeEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          label="Password"
          ref={passwordRef}
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword={true}
        />
        <ErrorText text={errorMessage} />
        <Button title="Login" onPress={_handleLoginButtonPress} disabled={disabled} />
        <Button
            title="Sign up with email"
            onPress={() => navigation.navigate("Signup")}
            isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
