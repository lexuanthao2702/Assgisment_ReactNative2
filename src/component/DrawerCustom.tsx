import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Calendar, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native';
import React from 'react';
import { FlatList, Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../assets/colors/Colors';
import { authSelector, removeAuth } from '../redux/reducers/authReducer';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

const DrawerCustom = ({ navigation }: any) => {
    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const size = 20;
    const color = COLORS.GREEN;
    const profileMenu = [
        {
            key: 'MyProfile',
            title: 'My Profile',
            icon: <User size={size} color={color} variant="Bold" />,
        },
        {
            key: 'Message',
            title: 'Message',
            icon: <Message2 size={size} color={color} variant="Bold" />,
        },
        {
            key: 'Calendar',
            title: 'Calendar',
            icon: <Calendar size={size} color={color} variant="Bold" />,
        },
        {
            key: 'ContactUs',
            title: 'Contact Us',
            icon: <Sms size={size} color={color} variant="Bold" />,
        },
        {
            key: 'Settings',
            title: 'Settings',
            icon: <Setting2 size={size} color={color} variant="Bold" />,
        },
        {
            key: 'HelpAndFAQs',
            title: 'Help & FAQs',
            icon: <MessageQuestion size={size} color={color} variant="Bold" />,
        },
        {
            key: 'SignOut',
            title: 'Sign Out',
            icon: <Logout size={size} color={color} variant="Bold" />,
        },
    ];

    const handleNavigation = (key: string) => {
        switch (key) {
            case 'SignOut':
                handleSignOut();
                break;
            case 'MyProfile':
                navigation.navigate('Profile', {
                    screen: 'ProfileScreen',
                    params: {
                        id: user.id,
                    },
                });
                break;
            default:
                console.log(key);
                break;
        }

        navigation.closeDrawer();
    };

    const handleSignOut = async () => {
        await GoogleSignin.signOut();
        dispatch(removeAuth({}));
    };

    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                }}>
                {user.photo ? (
                    <Image source={{ uri: user.photo }} style={[styles.avatar]} />
                ) : (
                    <View
                        style={[styles.avatar, { backgroundColor: COLORS.HEX_LIGHT_GRAY }]}>
                        <TextComponent
                            title
                            size={22}
                            color={COLORS.HEX_LIGHT_GRAY}
                            text={
                                user.name
                                    ? user.name
                                        .split(' ')
                                    [user.name.split(' ').length - 1].substring(0, 1)
                                    : ''
                            }
                        />
                    </View>
                )}
                <TextComponent text={user.name ? user.name : user.email} title size={18} color={COLORS.HEX_LIGHT_GRAY} />
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={profileMenu}
                style={{ flex: 1, marginVertical: 20 }}
                renderItem={({ item, index }) => (
                    <RowComponent
                        styles={[styles.listItem]}
                    >
                        {item.icon}
                        <TouchableOpacity onPress={() => handleNavigation(item.key)}>
                            <TextComponent
                                text={item.title}
                                styles={styles.listItemText}
                                color={COLORS.HEX_LIGHT_GRAY}
                            />
                        </TouchableOpacity>
                    </RowComponent>
                )}
            />
        </View>
    );
};

export default DrawerCustom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listItem: {
        paddingVertical: 12,
        justifyContent: 'flex-start',
    },

    listItemText: {
        paddingLeft: 12,
    },
})