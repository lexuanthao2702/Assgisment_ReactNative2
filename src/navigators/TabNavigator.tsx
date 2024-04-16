import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home2, Notification, SearchNormal1, ShoppingCart } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { TextComponent } from '../component';
import { CartScreen, NotificationScreen, SearchScreen } from '../screens';
import ExploreNavigator from './ExploreNavigator';

const TabNavigator = () => {
  const Tab =  createBottomTabNavigator();  
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
            borderColor: COLORS.WHITE, 
        },
        tabBarIcon: ({ focused, color, size }) => {
            let icon: ReactNode;
            color = focused ? COLORS.GREEN : COLORS.HEX_LIGHT_GREY

            switch (route.name) {
                case 'Trang Chủ':
                    icon = <Home2 size={size} color={color} variant="Bold" />;
                    break;
                case 'Tìm Kiếm':
                    icon = <SearchNormal1 size={size} color={color} variant="Bold" />
                    break;
                case 'Thông Báo':
                    icon = <Notification size={size} color={color} variant="Bold" />
                    break;
                case 'Giỏ Hàng':
                    icon = <ShoppingCart size={size} color={color} variant="Bold" />
                    break;

            }
            return icon;
        },
        tabBarIconStyle: {
            marginTop: 4
        },
        tabBarLabel({ focused }) {
            return <TextComponent text={route.name} flex={0} size={12} color={focused ? COLORS.GREEN : COLORS.HEX_LIGHT_GREY} font={FONTFAMILY.poppins_bold} />;
        },
    })}>
        <Tab.Screen name="Trang Chủ" component={ExploreNavigator} />
        <Tab.Screen name="Tìm Kiếm" component={SearchScreen} />
        <Tab.Screen name="Thông Báo" component={NotificationScreen} />
        <Tab.Screen name="Giỏ Hàng" component={CartScreen} />
    </Tab.Navigator>
)
}

export default TabNavigator