import { Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { globalStyle } from '../styles/globalStyle';

interface Props {
    text: string | undefined|number;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>; // ngoài những cái custom mặc định thì thêm styles
    title?: boolean;
    numberOfLines?: number | undefined;
}

const TextComponent = (props : Props) => {
  const {text, color, size, flex, font, styles, title, numberOfLines} = props;
  return (
    <Text numberOfLines={numberOfLines} style = {[
        globalStyle.text,
        {
            color: color ?? COLORS.WHITE,  // color của người dùng truyền vào hoặc color tích hợp sẵn
            flex: flex ?? 0, // nếu không truyền flex thì mặc định sẽ là 0
            fontSize: size ? size : title ? 34 : 16, //custom size hoặc nếu title thì là 34 còn text thì là 16
            fontFamily: font ? font : FONTFAMILY.poppins_regular, // nếu title thì regular
        },
        styles,
    ]}>{text}</Text>
  )
}

export default TextComponent;