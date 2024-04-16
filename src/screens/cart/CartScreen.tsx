import { ArrowLeft2, ShoppingCart } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { FONTFAMILY } from '../../../assets/fonts'
import cartAPI from '../../apis/cartAPI'
import COLORS from '../../assets/colors/Colors'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../component'
import { CardRowItemComponent } from '../../component/CardItemComponent'
import { carts } from '../../models/carts'
import { authSelector } from '../../redux/reducers/authReducer'

const CartScreen = ({ route, navigation }: any) => {
  const authData = useSelector(authSelector);
  const [cart, setCart] = useState<carts[]>([])
  const [provisionalPrice, setprovisionalPrice] = useState<number>(0);
  const { id } = authData;
  const getDataCart = async () => {
    try {
      const res = await cartAPI.HandleCart(`/get-cart?id_user=${id}`);
      const data: carts[] = await res.data;
      setCart(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDataCart()
    let total = 0;
    if(cart!=null){
      cart.forEach(item => {
        total += item.price_product;
      });
    }
    setprovisionalPrice(total);
  }, [cart]);

  return (
    <ContainerComponent isScroll>
      <SectionComponent styles={{ marginTop: 60 }}>
        <RowComponent justify='space-between'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <TextComponent
            text='Giỏ Hàng'
            color={COLORS.BLACK}
            size={20}
            font={FONTFAMILY.poppins_medium} />
          <TouchableOpacity>
            <ShoppingCart size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent  >
        <CardRowItemComponent data={cart} checkCartItem={true} />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <TextComponent text='Tạm tính' color={COLORS.BLACK} />
          <TextComponent text={`${provisionalPrice}`} color={COLORS.BLACK} font={FONTFAMILY.poppins_bold} />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text='Đặt hàng'
          type='#009245'
          onPress={() => { }} />
      </SectionComponent>
    </ContainerComponent >
  )
}

export default CartScreen;