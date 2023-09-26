import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetCategoryData,
  SetCategoryWiseData,
  SetProductsData,
} from '../actions/productAction';
import {BASE_URL, routes, strings} from '../helper/stringsConstant';
import {icons} from '../helper/iconConstant';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [category, setCategory] = useState(strings.viewAllText);
  const {productData, categoryData, categoryWiseData} = useSelector(
    (state: any) => state.products,
  );
  const dispatch: any = useDispatch();

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then(res => {
        dispatch(SetProductsData(res?.data));
        const tmpData = res?.data?.map(
          (item: {category: string}) => item?.category,
        );
        const categoryData = tmpData.filter(
          (item: any, index: number) => tmpData.indexOf(item) === index,
        );
        categoryData?.unshift(strings.viewAllText);
        dispatch(SetCategoryData(categoryData));
      })
      .catch(e => {
        Alert.alert(strings.wrongText);
      });
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.renderCon}
        onPress={() =>
          navigation?.navigate(routes.ItemDetailsScreen, {data: item})
        }>
        <Image
          source={{uri: item?.thumbnail}}
          style={styles.renderImage}
          resizeMode="contain"
        />
        <View style={styles.titlePriceCon}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.priceText}>${item?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.welcomeText}>{strings.welcomeText}</Text>
      <Text style={styles.welcomeDes}>{strings.letsOrderText}</Text>
      <TouchableOpacity
        style={styles.searchMainCon}
        onPress={() => navigation?.navigate(routes.SearchScreen)}
        activeOpacity={0.8}>
        <Image source={icons.search} style={styles.searchIcon} />
        <Text style={styles.typeSomething}>{strings.typeSomething}</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        style={styles.categoryListStyle}
        showsHorizontalScrollIndicator={false}>
        {categoryData?.map((item: string) => {
          return (
            <TouchableOpacity
              style={[styles.itemCon(item, category)]}
              onPress={() => {
                setCategory(item);
                dispatch(SetCategoryWiseData(item));
              }}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: item == category ? '#FFF' : 'black',
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <MasonryList
        style={{marginRight: 10, paddingTop: 20}}
        data={categoryWiseData?.length ? categoryWiseData : productData}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingLeft: 30,
  },
  welcomeText: {
    fontSize: 25,
    marginTop: 32,
    fontWeight: '500',
  },
  welcomeDes: {
    fontSize: 14,
    marginTop: 7,
  },
  searchMainCon: {
    width: 357,
    height: 49,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginLeft: 23,
    marginRight: 17,
  },
  typeSomething: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  categoryText: {
    fontSize: 16,
  },
  itemCon: (item: string, category: string) => ({
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
    marginHorizontal: 0,
    borderRadius: 9,
    backgroundColor: item == category ? '#00623B' : 'transparent',
  }),
  categoryListStyle: {maxHeight: 35, marginTop: 27, flexGrow: 1},
  renderCon: {
    backgroundColor: '#FFF',
    height: 204,
    width: 171,
    borderRadius: 16,
    marginBottom: 20,
  },
  renderImage: {
    height: 140,
    width: 130,
    marginTop: 10,
    alignSelf: 'center',
  },
  priceText: {fontSize: 18, color: '#00623B', fontWeight: '600'},
  itemTitle: {maxWidth: 85},
  titlePriceCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
