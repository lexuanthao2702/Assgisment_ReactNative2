import { View, ImageBackground ,SafeAreaView, StyleProp, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  style?: StyleProp<ViewStyle> 
}
const ContainerComponent = (props: Props) => {

  const { isImageBackground, isScroll, title, children, back,style } = props;

  const returnContainer = isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>;
  return isImageBackground ? (<ImageBackground>{returnContainer}</ImageBackground>) : (
    <SafeAreaView style = {[globalStyle.container,style]}>
      <View>
        {returnContainer}
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;