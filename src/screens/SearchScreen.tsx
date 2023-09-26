import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native';

import {icons} from '../helper/iconConstant';
import {routes, strings} from '../helper/stringsConstant';
import {
  ApplyFilterRatingWise,
  ApplyFilterStockWise,
  filterItems,
  setSearchString,
} from '../actions/productAction';

const SearchScreen = () => {
  const navigation: any = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch: any = useDispatch();
  const {ratingFilterData, stockFilterData, searchFilterData, searchString} =
    useSelector((state: any) => state.products);

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
      <TouchableOpacity
        onPress={() => {
          navigation?.goBack();
        }}>
        <Image
          source={icons.back}
          style={{height: 30, width: 30, marginLeft: 20}}
        />
      </TouchableOpacity>
      <View style={styles.searchMainCon}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          value={searchString}
          onChangeText={async text => {
            await dispatch(setSearchString(text)),
              await dispatch(filterItems());
          }}
          placeholder={strings.typeSomething}
          style={styles.textInputStyle}
        />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image source={icons.filter} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.categoryView}>
        {ratingFilterData
          ?.filter((item: {selected: boolean}) => item?.selected)
          ?.map((item: {selected: boolean; value: number}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.deleteFlagCon,
                  {
                    backgroundColor: item?.selected ? '#00623B' : '#FFF',
                    borderWidth: item?.selected ? 0 : 1,
                  },
                ]}
                onPress={async () => {
                  await dispatch(ApplyFilterRatingWise(item?.value));
                  await dispatch(filterItems());
                }}>
                <Image source={icons.close} style={styles.close} />
                <Text
                  style={{
                    color: item?.selected ? '#FFFF' : 'black',
                    marginLeft: 7,
                  }}>
                  {item?.value}
                </Text>
                <Image source={icons.star} style={styles.star} />
              </TouchableOpacity>
            );
          })}
        {stockFilterData
          ?.filter((item: {selected: boolean}) => item?.selected)
          ?.map((item: {selected: boolean; value: string}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.deleteFlagCon,
                  {
                    backgroundColor: item?.selected ? '#00623B' : '#FFF',
                    borderWidth: item?.selected ? 0 : 1,
                  },
                ]}
                onPress={async () => {
                  await dispatch(ApplyFilterStockWise(item?.value));
                  await dispatch(filterItems());
                }}>
                <Image source={icons.close} style={styles.close} />
                <Text
                  style={{
                    color: item?.selected ? '#FFFF' : 'black',
                    marginLeft: 7,
                  }}>
                  {item?.value}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {searchFilterData?.length ? (
        <MasonryList
          style={styles.listStyle}
          data={searchFilterData}
          keyExtractor={(item): string => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noFoundCon}>
          <Text>{strings.noDataFoundText}</Text>
        </View>
      )}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}>
        <View style={styles.modalMainCon}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setIsModalVisible(false)}></TouchableOpacity>
          <View style={styles.modalCon}>
            <Text style={styles.filterByText}>{strings.filterByText}</Text>
            <Text style={styles.ratingText}>{strings.ratingText}</Text>
            <ScrollView
              bounces={false}
              horizontal
              style={styles.categoryScroll}>
              {ratingFilterData?.map(
                (item: {selected: boolean; value: number}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.modalRatingItemCon,
                        {
                          backgroundColor: item?.selected ? '#00623B' : '#FFF',
                          borderWidth: item?.selected ? 0 : 1,
                        },
                      ]}
                      onPress={() => {
                        dispatch(ApplyFilterRatingWise(item?.value));
                      }}>
                      <Text style={{color: item?.selected ? '#FFFF' : 'black'}}>
                        {item?.value}
                      </Text>
                      <Image source={icons.star} style={styles.star} />
                    </TouchableOpacity>
                  );
                },
              )}
            </ScrollView>
            <Text style={[styles.ratingText, {marginTop: 25}]}>
              {strings.stockText}
            </Text>
            <ScrollView
              bounces={false}
              horizontal
              style={styles.categoryScroll}>
              {stockFilterData?.map(
                (item: {selected: boolean; value: string}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.modalRatingItemCon,
                        {
                          backgroundColor: item?.selected ? '#00623B' : '#FFF',
                          borderWidth: item?.selected ? 0 : 1,
                        },
                      ]}
                      onPress={() => {
                        dispatch(ApplyFilterStockWise(item?.value));
                      }}>
                      <Text style={{color: item?.selected ? '#FFFF' : 'black'}}>
                        {item?.value}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.applyCon}
              onPress={() => {
                dispatch(filterItems());
                setIsModalVisible(false);
              }}>
              <Text style={styles.btnText}>{strings.applyText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  searchMainCon: {
    width: 357,
    height: 49,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginLeft: 23,
    marginRight: 17,
  },
  modalMainCon: {
    height: '100%',
    marginTop: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCon: {
    flex: 0.8,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
  },
  filterByText: {
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 43,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 35,
  },
  modalRatingItemCon: {
    height: 28,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 6,
    paddingHorizontal: 12,
  },
  deleteFlagCon: {
    height: 28,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 6,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  applyCon: {
    width: 126,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00623B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 43,
    alignSelf: 'center',
  },
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
  textInputStyle: {width: '68%', height: 30},
  categoryView: {
    marginLeft: 30,
    marginTop: 15,
    maxHeight: 30,
  },
  close: {height: 12, width: 12, marginLeft: 3},
  star: {height: 16, width: 16, marginLeft: 3},
  noFoundCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
  },
  listStyle: {marginRight: 10, paddingTop: 30, marginLeft: 30},
  categoryScroll: {
    maxHeight: 30,
    marginTop: 20,
  },
  btnText: {fontSize: 18, color: '#FFF', fontWeight: '500'},
});

export default SearchScreen;
