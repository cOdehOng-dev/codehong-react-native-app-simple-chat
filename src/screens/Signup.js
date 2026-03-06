import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Image from "../components/Image";
import { Button, Input } from "../components";
import { theme } from "../theme";
import { images } from "../utils/images";
import { signup } from "../utils/firebase";

const Signup = () => {
  const [photoUrl, setPhotoUrl] = useState(images.photo);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";

      if (!name) {
        _errorMessage = "Please enter your name.";
      } else if (!email) {
        _errorMessage = "Please enter your email.";
      } else if (password.length < 6) {
        _errorMessage = "Password must be at least 6 characters.";
      } else if (password !== passwordConfirm) {
        _errorMessage = "Password does not match the confirm password.";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage),
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      const user = await signup({ email, password });
      console.log(user);
      Alert.alert("Signup Success", `Welcome ${user.email}`);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <View style={styles.container}>
        <Image
          rounded={true}
          url={photoUrl}
          showButton={true}
          onChangeImage={(url) => setPhotoUrl(url)}
        />
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Enter your name"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
          onBlur={() => setEmail(email.trim())}
          placeholder="Enter your email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Enter your password"
          secureTextEntry
          returnKeyType="next"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Enter your password one more time"
          secureTextEntry
          returnKeyType="done"
          isPassword
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Button
          title="Sign Up"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  errorText: {
    alignItems: "flex-start",
    width: "100%",
    height: 20,
    marginBottom: 10,
    lineHeight: 20,
    color: theme.errorText,
  },
});
