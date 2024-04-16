import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyle } from '../../styles/globalStyle';
import { ArrowLeft } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { LoadingModal } from '../../modal';
import { ButtonComponent, RowComponent, SectionComponent, TextComponent } from '../../component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/reducers/authReducer';
import authenticationAPI from '../../apis/authAPI';
import { useDispatch } from 'react-redux';

const Verification = ({ navigation, route }: any) => {
    const { code, email, password, username} = route.params;
    const [currentCode, setCurrentCode] = useState<string>(code);
    const [codeValues, setCodeValues] = useState<string[]>([]);
    const [newCode, setNewCode] = useState('');
    const [limit, setLimit] = useState(120);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();

    const dispatch = useDispatch();
    // khi người dùng vừa vào trang xác nhận nó sẽ nhảy ngay đến ref1 tương ứng TextInput thứ 1
    useEffect(() => {
        ref1.current.focus();
    }, []);

    // set lùi thời gian sau mỗi 1 giây tính từ khi gửi mã xác thực đến email. 
    useEffect(() => {
        if (limit > 0) {
            const interval = setInterval(() => {
                setLimit(limit => limit - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [limit]);

    useEffect(() => {
        let item = ``;

        codeValues.forEach(val => (item += val));

        setNewCode(item);
    }, [codeValues]);

    const handleChangeCode = (val: string, index: number) => {
        const data = [...codeValues];
        data[index] = val;

        setCodeValues(data);
    };

    const handleResendVerification = async () => {
        setCodeValues(['', '', '', '']); // khi người dùng send mã xác thực lần 2 nó sẽ reset lại thành rỗng
        setNewCode('');

        const api = `/verification`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                { email },
                'post',
            );

            setLimit(120);
            setCurrentCode(res.data.code);
            setIsLoading(false);

            console.log(res.data.code);
        } catch (error) {
            setIsLoading(false);
            console.log(`Không thể gửi mã xác thực ${error}`);
        }
    };

    const handleVerification = async () => {
        if (limit > 0) {
            if (parseInt(newCode) !== parseInt(currentCode)) {
                setErrorMessage('Mã không hợp lệ!');
            } else {
                setErrorMessage('');

                const api = `/register`;
                const data = {
                    email,
                    password,
                    username: username ?? '',
                };

                try {
                    const res: any = await authenticationAPI.HandleAuthentication(
                        api,
                        data,
                        'post',
                    );
                    dispatch(addAuth(res.data));
                    await AsyncStorage.setItem('auth', JSON.stringify(res.data));
                } catch (error) {
                    setErrorMessage('Người dùng đã tồn tại!');
                    console.log(`Không thể tạo người dùng mới ${error}`);
                }
            }
        } else {
            setErrorMessage('Mã xác minh hết thời gian chờ, vui lòng gửi lại mã mới!');
        }
    };

    return (
        <View style={globalStyle.container}>
            <SectionComponent styles = {{backgroundColor: COLORS.WHITE}}>
                <TouchableOpacity style={{ paddingTop: 50, paddingBottom: 10 }}>
                    <ArrowLeft size={24} color={COLORS.BLACK}
                        onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TextComponent 
                    text='Mã Xác Thực' 
                    title 
                    font={FONTFAMILY.poppins_bold} 
                    color={COLORS.GREEN}/>
                <TextComponent
                    text={`Chúng tôi đã gửi mã xác minh vào ${email.replace(/.{1,5}/, (m: any) => '*'.repeat(m.length))}: `}
                    styles={{ paddingBottom: 30 }}
                    color={COLORS.BLACK} />
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-around'>
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref1}
                        value={codeValues[0]}
                        style={[styles.input]}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref2.current.focus();
                            handleChangeCode(val, 0);
                        }}
                        placeholder="-"
                        placeholderTextColor={COLORS.WHITE}
                    />
                    <TextInput
                        ref={ref2}
                        value={codeValues[1]}
                        keyboardType="number-pad"
                        onChangeText={val => {
                            handleChangeCode(val, 1);
                            val.length > 0 && ref3.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                        placeholderTextColor={COLORS.WHITE}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        value={codeValues[2]}
                        ref={ref3}
                        onChangeText={val => {
                            handleChangeCode(val, 2);
                            val.length > 0 && ref4.current.focus();
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                        placeholderTextColor={COLORS.WHITE}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        ref={ref4}
                        value={codeValues[3]}
                        onChangeText={val => {
                            handleChangeCode(val, 3);
                        }}
                        style={[styles.input]}
                        maxLength={1}
                        placeholder="-"
                        placeholderTextColor={COLORS.WHITE}
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ alignItems: 'center' }}>
                <ButtonComponent 
                    disable= {newCode.length !== 4}
                    onPress={handleVerification}
                    text='Tiếp Tục' 
                    type='#009245' 
                    styles={{ width: '80%' }}
                     />
            </SectionComponent>
            {errorMessage && (
                <SectionComponent>
                    <TextComponent
                        styles={{ textAlign: 'center' }}
                        text={errorMessage}
                        color={COLORS.RED}
                    />
                </SectionComponent>
            )}
            <SectionComponent>
                {limit > 0 ? (
                    <RowComponent justify="center">
                        <TextComponent text="Re-send code in  " flex={0} color={COLORS.BLACK}/>
                        <TextComponent
                            text={`${(limit - (limit % 60)) / 60}:${limit - (limit - (limit % 60))
                                }`}
                            flex={0}
                            color={COLORS.GREEN}
                        />
                    </RowComponent>
                ) : (
                    <RowComponent>
                        <ButtonComponent
                            type="link"
                            text="Gửi lại email xác thực"
                            onPress={handleResendVerification}
                        />
                    </RowComponent>
                )}
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </View>
    )
}

export default Verification;

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.HEX_LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontFamily: FONTFAMILY.poppins_bold,
        textAlign: 'center',
        color: COLORS.BLACK,
    },
});