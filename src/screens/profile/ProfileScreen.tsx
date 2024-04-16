import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { ButtonComponent, ContainerComponent } from '../../component';
import { removeAuth } from '../../redux/reducers/authReducer';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    return (
        <ContainerComponent back>
            <Text>ProfileScreen</Text>

            <ButtonComponent
                type="#009245"
                text="Logout"
                onPress={async () => {
                    await GoogleSignin.signOut();
                    dispatch(removeAuth({}));
                }}
            />
        </ContainerComponent>
    );
};

export default ProfileScreen