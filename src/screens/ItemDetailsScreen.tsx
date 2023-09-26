import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {icons} from '../helper/iconConstant';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {strings} from '../helper/stringsConstant';
import {useNavigation} from '@react-navigation/native';

const ItemDetailsScreen = ({route}: any) => {
  const navigation: any = useNavigation();
  let {description, discountPercentage, images, price, rating, title, stock} =
    route?.params?.data;
  const [page, setPage] = useState(0);
  const isCarousel = useRef(null);

  const calculateRating = () => {
    return Array(Math.round(rating))
      ?.fill('')
      ?.map(() => {
        return <Image source={icons.star} style={styles.starStyle} />;
      });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Image style={styles.backIcon} source={icons.back} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{title}</Text>
        <View />
      </View>
      <View style={styles.imageMainView}>
        <Text style={styles.imageIndicatorText}>
          {page + 1}/{images?.length}
        </Text>
        <Carousel
          data={images}
          onSnapToItem={page => setPage(page)}
          renderItem={({item}) => {
            return (
              <View style={styles.imageMainView}>
                <Image
                  //@ts-ignore
                  source={{uri: item}}
                  style={styles.imageStyle}
                />
              </View>
            );
          }}
          sliderWidth={800}
          itemWidth={700}
        />
        <Pagination
          activeDotIndex={page}
          //@ts-ignore
          carouselRef={isCarousel}
          tappableDots={true}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          dotsLength={images?.length}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={{
            backgroundColor: 'grey',
          }}
        />
      </View>
      <Text style={styles.descriptionText}>{strings.descriptionText}</Text>
      <View style={styles.desView}>
        <Text style={styles.desStyle} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.itemPriceStyle}>${price}</Text>
      </View>
      <View style={styles.dividerStyle} />
      <View style={styles.stockHeaderView}>
        <Text style={styles.stockText}>{strings.stockText2}</Text>
        <Text style={styles.stockCount}>{stock}</Text>
      </View>
      <View
        style={[
          styles.stockCon,
          {backgroundColor: stock == 0 ? '#F00D0D' : '#00623B'},
        ]}>
        <Text style={styles.stockOutInText}>
          {stock == 0 ? strings.outOfStockText : strings.inStockText}
        </Text>
      </View>
      <View style={styles.stockHeaderView}>
        <Text style={styles.stockText}>rating</Text>
        <Text style={styles.stockCount}>{rating}</Text>
      </View>
      <ScrollView horizontal style={{marginTop: 15, maxHeight: 28}}>
        {calculateRating()}
      </ScrollView>
      <Text style={[styles.stockText, {marginTop: 25}]}>
        {strings.discountPR}
      </Text>
      <Text style={[styles.stockCount, {fontSize: 20, marginTop: 12}]}>
        {discountPercentage}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingLeft: 33,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 33,
    marginTop: 20,
  },
  imageStyle: {
    height: 150,
    width: 200,
    resizeMode: 'contain',
  },
  imageIndicatorText: {
    alignSelf: 'flex-end',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  desStyle: {width: '70%', marginEnd: 25, fontSize: 13},
  itemPriceStyle: {fontSize: 23, fontWeight: '500', color: '#00623B'},
  dividerStyle: {
    width: '92%',
    backgroundColor: '#D9E0DD',
    height: 1,
    marginTop: 27,
  },
  stockHeaderView: {
    flexDirection: 'row',
    paddingEnd: 33,
    justifyContent: 'space-between',
    marginTop: 35,
    alignItems: 'center',
  },
  stockText: {fontSize: 18, fontWeight: '500'},
  stockCount: {color: '#00623B', fontSize: 17, fontWeight: '500'},
  stockCon: {
    paddingHorizontal: 16,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    borderRadius: 10,
    marginTop: 10,
  },
  stockOutInText: {
    color: '#FFFF',
    fontWeight: '600',
  },
  starStyle: {height: 26, width: 26, marginEnd: 5},
  backIcon: {height: 20, width: 20},
  titleStyle: {fontSize: 18, fontWeight: '500'},
  imageMainView: {alignItems: 'center', justifyContent: 'center'},
  dotStyle: {
    width: 20,
    borderRadius: 18,
    backgroundColor: '#0074FF',
  },
  desView: {flexDirection: 'row', marginTop: 10, alignItems: 'center'},
});

export default ItemDetailsScreen;
