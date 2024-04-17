import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
import {FONTFAMILY} from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import {Facebook, Google} from '../../assets/svgs';
import {
  ButtonComponent,
  InputComponent,
  KeyboardAvoidingWrapper,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../component';
import {globalStyle} from '../../styles/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addAuth} from '../../redux/reducers/authReducer';
import authenticationAPI from '../../apis/authAPI';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '589288383092-7g4svk811791g85c9k5946l0cdards3o.apps.googleusercontent.com',
});
const LoginScreen = ({navigation}: any) => {
  // Lấy dữ liệu
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Email is not correct!!!');
    }
  };

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true, // hiển thị dialog chọn gg đăng nhập
    });

    const api = '/signInWithGoogle';
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn(); // gọi đến đăng nhập
      const user = userInfo.user;
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );
      // console.log(res);
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -250,
        }}>
        <Image source={IMAGES.LoginBackgroud} style={{marginBottom: 10}} />
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          title
          text="Đăng Nhập"
          size={45}
          color={COLORS.BLACK}
          font={FONTFAMILY.poppins_bold}
          styles={{marginBottom: 20, marginTop: -20}}
        />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />}
        />
        <InputComponent
          value={password}
          placeholder="Mật khẩu"
          onChange={val => setPassword(val)}
          isPassword
          affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />}
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{false: COLORS.WHITE, true: COLORS.GREEN}}
              thumbColor={isRemember ? COLORS.WHITE : COLORS.GREEN}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Ghi nhớ tài khoản" color={COLORS.BLACK} />
          </RowComponent>
          <ButtonComponent
            text="Quên mật khẩu?"
            onPress={() => navigation.navigate('ForgotPassWord')}
            type="link"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop: 20}}>
        <ButtonComponent
          disable={isDisable}
          text="ĐĂNG NHẬP"
          type="#009245"
          onPress={handleLogin}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          text="Đăng nhập với"
          color={COLORS.HEX_LIGHT_GREY}
          styles={{
            textAlign: 'center',
            fontSize: 16,
            fontFamily: FONTFAMILY.poppins_medium,
            marginBottom: 10,
          }}
        />
        <RowComponent>
          <ButtonComponent
            text="Google"
            iconFlex="left"
            type="#009245"
            styles={globalStyle.shadow}
            textColor={COLORS.HEX_LIGHT_GREY}
            onPress={handleLoginWithGoogle}
            icon={<Google />}
          />
          <ButtonComponent
            text="Facebook"
            iconFlex="left"
            type="#009245"
            styles={globalStyle.shadow}
            textColor={COLORS.HEX_LIGHT_GREY}
            icon={<Facebook />}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Bạn chưa có tài khoản?  " color={COLORS.BLACK} />
          <ButtonComponent
            type="link"
            text="Đăng ký"
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
          />
        </RowComponent>
      </SectionComponent>
    </KeyboardAvoidingWrapper>
  );
};

export default LoginScreen;
