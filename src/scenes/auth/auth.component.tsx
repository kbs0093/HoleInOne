/*로그인 화면입니다*/

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
import { AuthScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import {
  EyeIcon,
  EyeOffIcon,
  AlertTriangleIcon
} from '../../assets/icons';
import {
  SignInData,
  SignInSchema,
} from '../../data/sign-in.model';
import KakaoLogins from '@react-native-seoul/kakao-login';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}


const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};

export const AuthScreen = (props: AuthScreenProps): LayoutElement => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [token, setToken] = useState(TOKEN_EMPTY);
  const [profile, setProfile] = useState(PROFILE_EMPTY);

  const onFormSubmit = (values: SignInData): void => {
    navigateHome();
  };

  const navigateHome = (): void => {
    props.navigation.navigate(AppRoute.HOME);
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));

    KakaoLogins.login()
      .then(result => {
        let data = JSON.stringify(result);
        logCallback(
          `Login Finished:${data}`,
          setLoginLoading(false),
        );
        AsyncStorage.setItem("token", data);
        props.navigation.navigate(AppRoute.HOME);
      })
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };

  return (
    <React.Fragment>
      <ImageBackground style={styles.appBar} source={require('../../assets/image-background.jpeg')}>
        <View style={styles.viewForm}>
          <Button
            style={styles.submitButton}
            onPress={navigateHome}>
            일반 로그인
          </Button>
          <Button
            style={styles.btnKakaoLogin}
            onPress={kakaoLogin}>
            카카오톡 로그인
          </Button>              
          <Button
            style={styles.noAccountButton}
            appearance='ghost'
            status='basic'
            onPress={() => {
              Linking.openURL('https://healthy-it-world.tistory.com/');
            }}>
            아이디가 없으신가요?
          </Button>
        </View>
      </ImageBackground>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
  },
  viewForm: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  submitButton: {
    width: 280,
    marginVertical: 10,
    alignSelf: 'center',
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  btnKakaoLogin: {
    width: 280,
    marginVertical: 10,
    backgroundColor: '#F8E71C',
    borderColor: '#F8E71C',
    alignSelf: 'center',
  }, 
});
