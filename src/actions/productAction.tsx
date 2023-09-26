import {
  APPLY_FILTER_RATING_WISE,
  APPLY_FILTER_STOCK_WISE,
  CATEGORY_DATA,
  CATEGORY_WISE_DATA,
  FETCH_PRODUCT_DATA,
  FILTER_DATA_WITH_RATE_AND_STOCK,
  SEARCH_STRING,
} from './types';

export const SetProductsData = (data: any) => async (dispatch: any) => {
  dispatch({type: FETCH_PRODUCT_DATA, payload: data});
};
export const SetCategoryData = (data: any) => async (dispatch: any) => {
  dispatch({type: CATEGORY_DATA, payload: data});
};
export const SetCategoryWiseData = (data: any) => async (dispatch: any) => {
  dispatch({type: CATEGORY_WISE_DATA, payload: data});
};
export const ApplyFilterRatingWise = (data: any) => async (dispatch: any) => {
  dispatch({type: APPLY_FILTER_RATING_WISE, payload: data});
};
export const ApplyFilterStockWise = (data: any) => async (dispatch: any) => {
  dispatch({type: APPLY_FILTER_STOCK_WISE, payload: data});
};
export const filterItems = () => async (dispatch: any) => {
  dispatch({type: FILTER_DATA_WITH_RATE_AND_STOCK, payload: null});
};
export const setSearchString = (data: string) => async (dispatch: any) => {
  dispatch({type: SEARCH_STRING, payload: data});
};
