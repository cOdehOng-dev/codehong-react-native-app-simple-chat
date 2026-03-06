import { Text, TextInput, View } from "react-native";
import React, { forwardRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components/native";

const Container = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        marginVertical: 10,
      }}
    >
      {children}
    </View>
  );
};

const Label = ({ text, isFocused }) => {
  const theme = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: isFocused ? theme.text : theme.label,
      }}
    >
      {text}
    </Text>
  );
};

const StyledTextInput = forwardRef(({
  isFocused,
  value,
  onChangeText,
  onSubmitEditing,
  onFocus,
  onBlur,
  placeholder,
  secureTextEntry,
  returnKeyType,
  maxLength,
  autoCapitalize,
  autoCorrect,
  textContentType,
}, ref) => {
  const theme = useContext(ThemeContext);
  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      textContentType={textContentType}
      placeholderTextColor={theme.inputPlaceholder}
      style={{
        backgroundColor: theme.inputBackground,
        color: theme.text,
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 16,
        borderWidth: 1,
        borderColor: isFocused ? theme.text : theme.inputBorder,
        borderRadius: 4,
      }}
    />
  );
});

const Input = forwardRef(({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur = () => {},
  placeholder,
  isPassword,
  returnKeyType,
  maxLength,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      <Label isFocused={isFocused} text={label} />
      <StyledTextInput
        ref={ref}
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        underlineColorAndroid="transparent"
      />
    </Container>
  );
});

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(["done", "next"]),
  maxLength: PropTypes.number,
};

export default Input;
