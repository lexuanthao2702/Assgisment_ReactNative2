import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleProp, View, ViewStyle} from 'react-native';
import {ButtonComponent, RowComponent, TextComponent} from '.';
import {FONTFAMILY} from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import {globalStyle} from '../styles/globalStyle';
import {carts} from '../models/carts';
import cartAPI from '../apis/cartAPI';
import {products} from './../models/products';

interface Props {
  id: number;
  image: string;
  name: string;
  origin: string;
  size?: string;
  price: string;
  quantity?: string;
  checkCartItem: boolean;
  onPressPlus?: () => void;
  onPressMinus?: () => void;
  styles?: StyleProp<ViewStyle>;
}
const PlantCard = (props: Props) => {
  const {
    id,
    image,
    name,
    origin,
    size,
    price,
    quantity,
    checkCartItem,
    onPressPlus,
    styles,
    onPressMinus,
  } = props;

  return (
    <View style={styles}>
      <RowComponent
        justify="space-between"
        styles={{flexDirection: checkCartItem ? 'row' : 'column'}}>
        {!checkCartItem ? (
          <Image style={{width: 150, height: 130}} src={image} />
        ) : (
          <Image style={{width: 120, height: 130}} src={image} />
        )}
        <View style={{marginStart: 10, maxWidth: 200}}>
          <TextComponent text={name} color={COLORS.BLACK} size={13} />
          <TextComponent text={origin} color={COLORS.HEX_LIGHT_GREY} size={9} />
          <RowComponent justify="space-between">
            <View>
              {checkCartItem ? (
                <TextComponent
                  text={size}
                  font={FONTFAMILY.poppins_bold}
                  styles={{
                    width: 70,
                    height: 40,
                    backgroundColor: COLORS.GREEN,
                    borderRadius: 10,
                    textAlign: 'center',
                    lineHeight: 40,
                    marginEnd: 5,
                  }}
                />
              ) : undefined}
            </View>
            {checkCartItem ? (
              <View style={{flexDirection: 'row'}}>
                <TextComponent
                  text={price}
                  font={FONTFAMILY.poppins_bold}
                  color={COLORS.BLACK}
                  size={18}
                />
                <TextComponent
                  text="VNĐ"
                  font={FONTFAMILY.poppins_bold}
                  color={COLORS.GREEN}
                  size={18}
                />
              </View>
            ) : undefined}
          </RowComponent>
          <View style={{marginTop: 5}}>
            <RowComponent justify="space-between">
              {checkCartItem ? (
                <ButtonComponent
                  styles={{width: 35, height: 35}}
                  onPress={onPressMinus}
                  text="-"
                  type="#009245"
                  textStyles={{fontSize: 16}}
                />
              ) : (
                <View style={{flexDirection: 'row', marginEnd: 5}}>
                  <TextComponent
                    text={price}
                    font={FONTFAMILY.poppins_regular}
                    color={COLORS.BLACK}
                    size={14}
                  />
                  <TextComponent
                    text="VNĐ"
                    font={FONTFAMILY.poppins_regular}
                    color={COLORS.GREEN}
                    size={14}
                  />
                </View>
              )}
              {checkCartItem ? (
                <TextComponent
                  size={14}
                  text={quantity}
                  font={FONTFAMILY.poppins_bold}
                  styles={{
                    width: 50,
                    height: 30,
                    backgroundColor: COLORS.GREEN,
                    borderRadius: 10,
                    textAlign: 'center',
                    lineHeight: 30,
                    marginEnd: 10,
                    borderColor: COLORS.GREEN,
                  }}
                />
              ) : (
                <View></View>
              )}
              <ButtonComponent
                styles={
                  checkCartItem
                    ? {width: 35, height: 35}
                    : {width: 30, height: 30, borderRadius: 8}
                }
                text="+"
                type="#009245"
                textStyles={{fontSize: 16}}
                onPress={onPressPlus}
              />
            </RowComponent>
          </View>
        </View>
      </RowComponent>
    </View>
  );
};

const CardColumnItemComponent = ({
  checkCartItem,
  products,
  navigation,
}: {
  checkCartItem: boolean;
  products: any[];
  navigation: any;
}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <PlantCard
          id={item.id}
          styles={[
            globalStyle.shadowCard,
            {margin: 5, borderRadius: 25, padding: 10},
          ]}
          checkCartItem={checkCartItem}
          image={item.image[0]}
          name={item.name}
          origin={item.origin}
          price={item.price}
          onPressPlus={() =>
            navigation.navigate('DetailProductScreen', {
              data: [products, item._id],
            })
          }
        />
      )}
      style={{alignSelf: 'center'}}
      showsVerticalScrollIndicator={false}
      numColumns={2}
    />
  );
};

const CardRowItemComponent = ({
  checkCartItem,
  data,
}: {
  checkCartItem: boolean;
  data: any[];
}) => {
  const updateData = async (data: carts, check: boolean) => {
    const api = `/update-cart/${data._id}`;
    try {
      const res = await cartAPI.HandleCart(
        api,
        {
          quantity: check ? data.quantity + 1 : data.quantity - 1,
          price_product: check
            ? data.id_product.price * (data.quantity + 1)
            : data.id_product.price * (data.quantity - 1),
        },
        'put',
      );
    } catch (error) {}
  };
  const deleteData = async (data: carts) => {
    const api = `/delete-cart/${data._id}`;
    try {
      const res = await cartAPI.HandleCart(api, {}, 'delete');
    } catch (error) {}
  };
  const handlePlus = async (data: carts) => {
    updateData(data, true);
  };
  const handleMinus = async (data: carts) => {
    if (data.quantity > 1) {
      updateData(data, false);
    } else {
      deleteData(data);
    }
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      scrollsToTop
      horizontal={false}
      renderItem={({item}) => (
        <PlantCard
          id={item.id}
          styles={[
            globalStyle.shadowCard,
            {margin: 5, borderRadius: 25, padding: 10},
          ]}
          checkCartItem={checkCartItem}
          image={item.id_product.image[0]}
          name={item.id_product.name}
          origin={item.id_product.origin}
          quantity={item.quantity}
          price={item.price_product}
          size={item.id_product.size}
          onPressMinus={() => handleMinus(item)}
          onPressPlus={() => handlePlus(item)}
        />
      )}
      style={{alignSelf: 'center'}}
    />
  );
};

export {CardColumnItemComponent, CardRowItemComponent};
