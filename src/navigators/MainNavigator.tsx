import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import { DetailProductScreen } from '../screens';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return  <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Main' component={DrawerNavigator}/>
                <Stack.Screen name='DetailProductScreen' component={DetailProductScreen}/>
            </Stack.Navigator>
}

export default MainNavigator