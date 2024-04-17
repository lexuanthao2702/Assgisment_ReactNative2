import {ArrowLeft2, ShoppingCart} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import {FONTFAMILY} from '../../../../assets/fonts';
import cartAPI from '../../../apis/cartAPI';
import COLORS from '../../../assets/colors/Colors';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../../component';
import {products} from '../../../models/products';
import {authSelector} from '../../../redux/reducers/authReducer';

const DetailProductScreen = ({route, navigation}: any) => {
  const [index, setIndex] = useState(0);
  const [idProduct, setIDproduct] = useState('');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [dataProduct, setData] = useState<products[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const authData = useSelector(authSelector);
  const {id} = authData;
  const {data} = route.params;
  const dataArray = data[0];
  const itemId = data[1];

  useEffect(() => {
    const fetchData = () => {
      setData(dataArray);
      setIDproduct(itemId);
      handleData();
    };
    console.log(data);

    fetchData();
  }, [dataProduct, idProduct]);
  
  const handleOrder = async () => {
    const api = `/add-product-cart`;
    try {
      const res = await cartAPI.HandleCart(
        api,
        {
          id_product: idProduct,
          id_user: id,
          quantity: quantity,
          price_product: price * quantity,
        },
        'post',
      );
      console.log(id);

      navigation.navigate('Giỏ Hàng', {dataCart: [id, idProduct]});
    } catch (error) {}
  };
  const filteredProductArray = (value: String) => {
    //tìm sản phẩm tương ứng với id
    return dataProduct.filter(item => item._id.toString() === value);
  };
  const setValues = (products: products) => {
    const {name, origin, status, size, price, type, image} = products;
    setName(name);
    setOrigin(origin);
    setStatus(status);
    setSize(size);
    setPrice(price);
    setType(type);
    setImageUrls(image);
  };
  const handleData = () => {
    const specificKeyItem = filteredProductArray(idProduct).find(
      product => product !== undefined && product !== null,
    ); //tìm được sản phẩm tương ứng với id tìm tiếp xem có undefined hoặc null không
    if (specificKeyItem) {
      setValues(specificKeyItem);
    }
  };
  const handlePlus = () => {
    setQuantity(quantity + 1);
    setStatus(status - 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStatus(status + 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <ContainerComponent isScroll>
      <SectionComponent styles={{marginTop: 60}}>
        <RowComponent justify="space-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <TextComponent
            text={name}
            color={COLORS.BLACK}
            size={20}
            font={FONTFAMILY.poppins_medium}
          />
          <TouchableOpacity>
            <ShoppingCart size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{justifyContent: 'center', height: 315}}>
        <Swiper
          style={{}}
          removeClippedSubviews={true}
          loop={false}
          onIndexChanged={num => setIndex(num)}
          index={index}
          dotColor={COLORS.HEX_LIGHT_GREY}
          activeDotColor={COLORS.GREEN}>
          {imageUrls.map((imageUrl, index) => (
            <Image
              source={{uri: imageUrl}}
              key={index}
              style={{flex: 1}}
              resizeMode="cover"
            />
          ))}
        </Swiper>
      </SectionComponent>
      <SectionComponent>
        <SectionComponent styles={{marginTop: -20}}>
          <RowComponent>
            <TextComponent
              text="Cây Trồng"
              size={14}
              color={COLORS.WHITE}
              font={FONTFAMILY.poppins_medium}
              styles={{
                padding: 8,
                borderColor: COLORS.GREEN,
                borderWidth: 1,
                borderRadius: 5,
                marginEnd: 10,
                backgroundColor: COLORS.GREEN,
              }}
            />
            <TextComponent
              text={type}
              size={14}
              color={COLORS.WHITE}
              font={FONTFAMILY.poppins_medium}
              styles={{
                padding: 8,
                paddingHorizontal: 14,
                borderColor: COLORS.GREEN,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: COLORS.GREEN,
              }}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <TextComponent
            text={price + 'VNĐ'}
            size={24}
            color={COLORS.GREEN}
            font={FONTFAMILY.poppins_medium}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent
            text="Chi tiết sản phẩm"
            size={18}
            color={COLORS.BLACK}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              width: '100%',
            }}></View>
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Kích cỡ"
              size={16}
              color={COLORS.HEX_LIGHT_GRAY}
            />
            <TextComponent
              text={size}
              size={16}
              color={COLORS.HEX_LIGHT_GRAY}
            />
          </RowComponent>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              width: '100%',
            }}></View>
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Xuất xứ"
              size={16}
              color={COLORS.HEX_LIGHT_GRAY}
            />
            <TextComponent
              text={origin}
              size={16}
              color={COLORS.HEX_LIGHT_GRAY}
            />
          </RowComponent>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              width: '100%',
            }}></View>
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Tình trạng"
              size={16}
              color={COLORS.HEX_LIGHT_GRAY}
            />
            <TextComponent
              text={status + 'sp'}
              size={16}
              color={COLORS.GREEN}
            />
          </RowComponent>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              width: '100%',
            }}></View>
        </SectionComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            text={`Đã chọn ${quantity} sản phẩm`}
            color={COLORS.HEX_LIGHT_GRAY}
            size={14}
          />
          <TextComponent
            text="Tạm tính"
            color={COLORS.HEX_LIGHT_GRAY}
            size={14}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-between">
          <RowComponent justify="space-between" styles={{flex: 0.5}}>
            <ButtonComponent
              onPress={handleMinus}
              styles={{width: 35, height: 35}}
              text="-"
              type="#009245"
              textStyles={{fontSize: 16}}
            />
            <TextComponent
              text={`${quantity}`}
              size={16}
              color={COLORS.BLACK}
            />
            <ButtonComponent
              onPress={handlePlus}
              styles={{width: 35, height: 35}}
              text="+"
              type="#009245"
              textStyles={{fontSize: 16}}
            />
          </RowComponent>
          <TextComponent
            text={price * quantity + 'VNĐ'}
            size={24}
            color={COLORS.GREEN}
            font={FONTFAMILY.poppins_medium}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent onPress={handleOrder} text="CHỌN MUA" type="#009245" />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default DetailProductScreen;
