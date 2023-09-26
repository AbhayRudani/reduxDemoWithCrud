import {
  APPLY_FILTER_RATING_WISE,
  APPLY_FILTER_STOCK_WISE,
  CATEGORY_DATA,
  CATEGORY_WISE_DATA,
  FETCH_PRODUCT_DATA,
  FILTER_DATA_WITH_RATE_AND_STOCK,
  SEARCH_STRING,
} from '../actions/types';

const initialState = {
  searchString: '',
  productData: [],
  categoryData: [],
  categoryWiseData: [],
  searchFilterData: [],
  ratingFilterData: [
    {value: 1, selected: false},
    {value: 2, selected: false},
    {value: 3, selected: false},
    {value: 4, selected: false},
    {value: 5, selected: false},
  ],
  stockFilterData: [
    {value: 'out of stock', selected: false},
    {value: '0 - 49', selected: false},
    {value: '50 - 99', selected: false},
    {value: '100 more', selected: false},
  ],
};

export const ProductReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_DATA:
      return {
        ...state,
        productData: action?.payload,
        searchFilterData: action?.payload,
      };
    case CATEGORY_DATA:
      return {...state, categoryData: action?.payload};
    case SEARCH_STRING:
      return {...state, searchString: action?.payload};
    case CATEGORY_WISE_DATA:
      const tmpData = state.productData?.filter(
        (item: {category: string}) =>
          action?.payload == 'View All' || item?.category == action?.payload,
      );
      return {...state, categoryWiseData: tmpData};
    case APPLY_FILTER_RATING_WISE:
      const tmp = state?.ratingFilterData?.map(data => {
        if (data?.value == action?.payload) {
          return {...data, selected: !data?.selected};
        } else {
          return {...data, selected: false};
        }
      });
      return {...state, ratingFilterData: tmp};
    case APPLY_FILTER_STOCK_WISE:
      const temp = state?.stockFilterData?.map(data => {
        if (data?.value == action?.payload) {
          return {...data, selected: !data?.selected};
        } else {
          return {...data, selected: false};
        }
      });
      return {...state, stockFilterData: temp};
    case FILTER_DATA_WITH_RATE_AND_STOCK:
      let selectedRating = state?.ratingFilterData?.filter(
        (item: {selected: boolean}) => item?.selected,
      )?.[0]?.value;
      let selectedStock = state?.stockFilterData?.filter(
        (item: {selected: boolean}) => item?.selected,
      )?.[0]?.value;

      const checkRating = (data: number) => {
        if (selectedRating) {
          if (selectedRating == 1) {
            if (data < 1) {
              return true;
            }
          }
          if (selectedRating == 2) {
            if (data > 1 && data < 2) {
              return true;
            }
          }
          if (selectedRating == 3) {
            if (data > 2 && data < 3) {
              return true;
            }
          }
          if (selectedRating == 4) {
            if (data > 3 && data < 4) {
              return true;
            }
          }
          if (selectedRating == 5) {
            if (data > 4 && data < 5) {
              return true;
            }
          }
        }
      };
      const checkStock = (data: number) => {
        if (selectedStock) {
          if (selectedStock == 'out of stock') {
            if (data <= 0) {
              return true;
            }
          }
          if (selectedStock == '0 - 49') {
            if (data > 0 && data < 49) {
              return true;
            }
          }
          if (selectedStock == '50 - 99') {
            if (data > 50 && data < 99) {
              return true;
            }
          }
          if (selectedStock == '100 more') {
            if (data >= 100) {
              return true;
            }
          }
        }
      };
      let checkSearch = (text: string) => {
        if (
          text
            .trim()
            .toLowerCase()
            .includes(state.searchString.trim().toLowerCase())
        ) {
          return true;
        }
      };
      const filterData = state?.productData?.filter(
        (data: {rating: number; stock: number; title: string}) => {
          if (selectedRating && selectedStock && state.searchString != '') {
            if (
              checkRating(data?.rating) &&
              checkStock(data?.stock) &&
              checkSearch(data?.title)
            ) {
              return data;
            }
          } else if (selectedRating && selectedStock) {
            if (checkRating(data?.rating) && checkStock(data?.stock))
              return data;
          } else if (selectedStock && state.searchString) {
            if (checkStock(data?.stock) && checkSearch(data?.title)) {
              return data;
            }
          } else if (selectedRating && state.searchString) {
            if (checkRating(data?.rating) && checkSearch(data?.title)) {
              return data;
            }
          } else if (selectedRating) {
            if (checkRating(data?.rating)) return data;
          } else if (selectedStock) {
            if (checkStock(data?.stock)) return data;
          } else if (state.searchString != '') {
            if (checkSearch(data?.title)) {
              return data;
            }
          } else {
            return data;
          }
        },
      );
      return {...state, searchFilterData: filterData};
    default:
      return state;
  }
};
