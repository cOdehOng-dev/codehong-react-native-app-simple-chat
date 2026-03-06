import { Text, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { theme } from "../theme";

const TRANSPARENT = "transparent";

const Button = ({
  containerStyle,
  title,
  onPress,
  isFilled = true,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isFilled ? theme.buttonBackground : TRANSPARENT,
          alignItems: "center",
          borderRadius: 4,
          width: "100%",
          padding: 10,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
      onPress={onPress}
      isFilled={isFilled}
    >
      <Text
        style={{
          height: 30,
          lineHeight: 30,
          fontSize: 16,
          color: isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle,
        }}
        isFilled={isFilled}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
