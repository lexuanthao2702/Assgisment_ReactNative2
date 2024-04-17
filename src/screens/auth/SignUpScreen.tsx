import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Validate } from '../../utils/validate';
import IMAGES from '../../assets/images/Images';
import { FONTFAMILY } from '../../../assets/fonts';
import { Lock, Sms, User } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import { LoadingModal } from '../../modal';
import { ButtonComponent, InputComponent, KeyboardAvoidingWrapper, RowComponent, SectionComponent, TextComponent } from '../../component';
import authenticationAPI from '../../apis/authAPI';
import { useDispatch } from 'react-redux';

const initValues = {
  username: '',
  email: '',
  password: '',
  confirmPass: '',
}

const SignUpScreen = ({ navigation }: any) => {
  // Nếu có từ 3 trường trở lên thì sẽ khai báo initValues thay vì const từng thành phần 
  const [values, setValues] = useState(initValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);
  // khi người dùng mới vào thì chưa nhập bất kỳ thông tin gì thì sẽ không click cho tới khi 
  // điền đầy đủ thông tin.
  // lưu vào trong data
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPass)) ||
      !values.email ||
      !values.password ||
      !values.confirmPass
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);


  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values }
    data[`${key}`] = value;
    setValues(data);
  }

  const formValidator = (key: string) => {
    const data = { ...errorMessage };
    let message = ``;

    switch (key) {
      case 'email':
        if (!values.email) {
          message = `Vui lòng nhập Email!`;
        } else if (!Validate.email(values.email)) {
          message = 'Email không hợp lệ!';
        } else {
          message = '';
        }
        break;

      case 'password':
        message = !values.password ? `Vui lòng nhập Password` : '';
        break;

      case 'confirmPass':
        if (!values.confirmPass) {
          message = `Vui lòng nhập xác nhận mật khẩu!`;
        } else if (values.confirmPass !== values.password) {
          message = 'Mật khẩu không khớp!';
        } else {
          message = '';
        }

        break;
    }

    data[`${key}`] = message;

    setErrorMessage(data);
  };

  const handleRegister = async () => {
    const api = `/verification`;
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        { email: values.email },
        'post',
      );

      setIsLoading(false);

      navigation.navigate('Verification', {
        code: res.data.code,
        ...values,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <SectionComponent
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -250
          }}>
          <Image
            source={IMAGES.LoginBackgroud}
            style={{ marginBottom: 10 }} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent
            title
            text='Đăng Ký'
            size={45}
            color={COLORS.BLACK}
            font={FONTFAMILY.poppins_bold}
            styles={{ marginBottom: 20, }} />
          <InputComponent
            value={values.username}
            placeholder='Họ tên'
            onChange={val => handleChangeValue('username', val)}
            allowClear
            affix={<User size={22} color={COLORS.HEX_LIGHT_GREY} />} />
          <InputComponent
            value={values.email}
            placeholder='Email'
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />}
            onEnd={() => formValidator('email')} />
          <InputComponent
            value={values.password}
            placeholder='Mật khẩu'
            onChange={val => handleChangeValue('password', val)}
            isPassword
            affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />}
            onEnd={() => formValidator('password')} />
          <InputComponent
            value={values.confirmPass}
            placeholder='Xác nhận mật khẩu'
            onChange={val => handleChangeValue('confirmPass', val)}
            isPassword
            affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />}
            onEnd={() => formValidator('confirmPass')} />
        </SectionComponent>
        {errorMessage && (
          <SectionComponent>
            {Object.keys(errorMessage).map(
              (error, index) =>
                errorMessage[`${error}`] && (
                  <TextComponent
                    text={errorMessage[`${error}`]}
                    key={`error${index}`}
                    color={COLORS.RED}
                  />
                ),
            )}
          </SectionComponent>
        )}
        <SectionComponent styles={{ marginTop: 20 }}>
          <ButtonComponent
            text='ĐĂNG KÝ'
            type='#009245'
            onPress={handleRegister}
            disable={isDisable} />
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify='center'>
            <TextComponent text="Bạn đã có tài khoản?  " color={COLORS.BLACK}/>
            <ButtonComponent type='link' text='Đăng nhập' onPress={() => {
              navigation.navigate('LoginScreen')
            }} />
          </RowComponent>
        </SectionComponent>
      </KeyboardAvoidingWrapper>
      <LoadingModal visible={isLoading} />
    </>
  )
}

export default SignUpScreen;