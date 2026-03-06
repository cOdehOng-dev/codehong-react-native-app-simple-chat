import { Image as RNImage, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <View
      style={{
        alignSelf: "center",
        marginBottom: 30,
      }}
    >
      {children}
    </View>
  );
};

const StyledImage = ({ url, imageStyle }) => {
  return (
    <RNImage
      style={[{ width: 100, height: 100 }, imageStyle]}
      source={{ uri: url }}
    />
  );
};

const Image = ({ url, imageStyle }) => {
  return (
    <Container>
      <StyledImage url={url} imageStyle={imageStyle} />
    </Container>
  );
};

Image.propTypes = {
  url: PropTypes.string,
  imageStyle: PropTypes.object,
};

export default Image;
