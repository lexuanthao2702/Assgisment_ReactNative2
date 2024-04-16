import React from 'react'
import { ImageBackground } from 'react-native'
import IMAGES from '../assets/images/Images'

const SplashScreen = () => {
    return (
        <ImageBackground source={IMAGES.Splash_Logo} style = {{flex : 1}}></ImageBackground>
    )
}

export default SplashScreen