import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { DrawerCustom } from '../component';
import TabNavigator from './TabNavigator';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerStyle: {borderBottomRightRadius: 20, borderTopRightRadius: 20},
            drawerPosition:'left'}}
            drawerContent={props =><DrawerCustom {...props}/>}>
            <Drawer.Screen name = "ExploreNavigator" component={TabNavigator}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator