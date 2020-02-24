import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ImageBackground,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import {
  Input,
  InputElement,
  InputProps,
  Button,
  CheckBox,
  Layout,
  LayoutElement,
} from '@ui-kitten/components';
import { checkLoginScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';


export const LoadingScreen = (props: checkLoginScreenProps): LayoutElement => {
  
  AsyncStorage.getItem("token")
    .then(value => {
      if (value) {
        console.log("Login check Succeess");
        props.navigation.navigate(AppRoute.HOME);
      } else {
        console.log("Login check Failed");
        props.navigation.navigate(AppRoute.SIGN_IN);
      }
    })
    .catch((error: Error) => {
      console.log("???");
    });

  return (
    <React.Fragment>
      <ImageBackground
        style={styles.appBar}
        source={require('../../assets/image-background.jpeg')}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
});
/*
Made by kbs
인증 확인시 로딩이 필요한 화면입니다. 
이 화면 백그라운드에서 이미지를 삽입하면 로딩화면을 구현할 수 있습니다.
*/