import { ArrowRight, HambergerMenu } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { FONTFAMILY } from '../../../assets/fonts'
import COLORS from '../../assets/colors/Colors'
import IMAGES from '../../assets/images/Images'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../component'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../../redux/reducers/authReducer'
import { products } from '../../models/products'
import productAPI from '../../apis/productAPI'
import { CardColumnItemComponent } from '../../component/CardItemComponent'

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<products[]>([]);

  const getDataProduct = async () => {
    try {
      const res = await productAPI.HandleProduct('/data-products');
      const data: products[] = await res.data;
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataProduct()

  }, []);

  return (
    <ContainerComponent isScroll>
      <RowComponent styles={{ flexDirection: 'column', position: 'relative', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Image source={IMAGES.Backgroud_Home} style={{ width: '100%' }} />
        <SectionComponent styles={{ position: 'absolute', padding: 15, top: 40}}>
          <TouchableOpacity 
            style = {{marginBottom: 10}}
            onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={28} color={COLORS.GREEN} />
          </TouchableOpacity>
          <TextComponent
            text={'Planta - toả sáng \nkhông gian nhà bạn'}
            color={COLORS.BLACK}
            font={FONTFAMILY.poppins_medium}
            size={25} />
          <RowComponent>
            <TextComponent
              text={'Xem hàng mới về '}
              color={COLORS.GREEN}
              font={FONTFAMILY.poppins_regular}
              size={14} />
            <ArrowRight size={22} color={COLORS.GREEN} />
          </RowComponent>
        </SectionComponent>
      </RowComponent>
      <SectionComponent styles={{ marginTop: 20 }}>
        <TextComponent
          text='Cây Trồng'
          font={FONTFAMILY.poppins_regular}
          color={COLORS.BLACK}
          size={25} />
      </SectionComponent>
      <SectionComponent>
        <CardColumnItemComponent navigation={navigation} checkCartItem={false} products={product} />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default HomeScreen