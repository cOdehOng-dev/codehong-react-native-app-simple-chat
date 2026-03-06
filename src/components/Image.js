import {
  Alert,
  Platform,
  Image as RNImage,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { theme } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

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

const StyledImage = ({ url, imageStyle, rounded }) => {
  return (
    <RNImage
      style={[
        { width: 100, height: 100, borderRadius: rounded ? 50 : 0 },
        imageStyle,
      ]}
      source={{ uri: url }}
    />
  );
};

const PhotoButton = ({ onPress = false }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.imageButtonBackground,
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <MaterialIcons
        name="photo-camera"
        size={22}
        color={theme.imageButtonIcon}
      />
    </TouchableOpacity>
  );
};

const Image = ({ url, imageStyle, rounded = false, showButton, onChangeImage }) => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          if (!permission?.granted) {
            await requestPermission();
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (e) {
      Alert.alert("Photo Error", e.message);
    }
  };
  return (
    <Container>
      <StyledImage url={url} imageStyle={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.propTypes = {
  url: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
  showButton: PropTypes.bool,
  onChangeImage: PropTypes.func,
};

export default Image;
