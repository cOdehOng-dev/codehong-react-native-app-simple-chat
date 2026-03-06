import { StatusBar, Image } from "react-native";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Navigation from "./navigations";
import { images } from "./utils/images";

// 이미지 에셋을 미리 캐싱하는 함수
// - 문자열(URL)이면 Image.prefetch로 네트워크 이미지 사전 다운로드
// - 로컬 파일이면 Asset.fromModule으로 번들 이미지 사전 로드
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

// 폰트를 미리 캐싱하는 함수
// - fonts 배열에 담긴 폰트들을 비동기로 로드
const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

const App = () => {
  // 에셋 로딩 완료 여부 상태 (false: 로딩 중, true: 로딩 완료)
  const [isReady, setIsReady] = useState(false);

  // 이미지 및 폰트 에셋을 병렬로 사전 로드하는 함수
  const _loadAssets = async () => {
    const imageAssets = cacheImages([
      require("../assets/splash.png"),
      ...Object.values(images),
    ]);
    const fontAssets = cacheFonts([]);

    // 모든 에셋 로딩이 완료될 때까지 대기
    await Promise.all([...imageAssets, ...fontAssets]);
  };

  // isReady가 false면 AppLoading(스플래시), true면 앱 본화면 렌더링
  return isReady ? (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  ) : (
    // startAsync: 로딩 시작 시 실행할 함수
    // onFinish: 로딩 완료 시 isReady를 true로 변경
    // onError: 에러 발생 시 콘솔에 경고 출력
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default App;
