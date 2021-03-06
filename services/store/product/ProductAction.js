import {
    PRODUCT_ERROR,
    PRODUCT_LOADING,
    PRODUCT_SUCCESS,
    PRODUCTS_ERROR,
    PRODUCTS_LOADING,
    PRODUCTS_SUCCESS,
    SIMILAR_PRODUCTS_LOADING,
    SIMILAR_PRODUCTS_SUCCESS,
    SIMILAR_PRODUCTS_ERROR,
    PAGINATED_PRODUCTS_LOADING,
    PAGINATED_PRODUCTS_SUCCESS,
    PRODUCTS_TOP_BANNER_LOADING,
    PRODUCTS_TOP_BANNER_SUCCESS,
    PRODUCTS_TOP_BANNER_ERROR,
    PRODUCTS_TOP_BOTTOM_BANNER_LOADING,
    PRODUCTS_TOP_BOTTOM_BANNER_SUCCESS,
    PRODUCTS_TOP_BOTTOM_BANNER_ERROR,
    PAGINATED_PRODUCTS_ERROR,
    PRODUCTS_OFFER_LOADING,
    PRODUCTS_OFFER_SUCCESS,
    PRODUCTS_OFFER_ERROR
} from "./ProductType";
import axios from "axios";
import {store_base_url} from "../../../constants";

export const getProductList = (url) => async dispatch => {
    try {
        dispatch({
            type: PRODUCTS_LOADING
        })
        const response = await axios.get(url)
        dispatch({
            type: PRODUCTS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCTS_ERROR
        })
    }
}
export const getProductListPaginated = (url) => async dispatch => {
    try {
        dispatch({
            type: PAGINATED_PRODUCTS_LOADING
        })
        const response = await axios.get(url)
        dispatch({
            type: PAGINATED_PRODUCTS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PAGINATED_PRODUCTS_ERROR
        })
    }
}
export const getSimilarProductList = (url = `${store_base_url}/product/?active=true&limit=8&random=true`) => async dispatch => {
    try {
        dispatch({
            type: SIMILAR_PRODUCTS_LOADING
        })
        const response = await axios.get(url)
        dispatch({
            type: SIMILAR_PRODUCTS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: SIMILAR_PRODUCTS_ERROR
        })
    }
}
export const getProduct= (id) => async dispatch => {
    try {
        await dispatch({
            type: PRODUCT_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/product/${id}/`)
        await dispatch({
            type: PRODUCT_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR
        })
    }
}
export const getProductByCategory= (id) => async dispatch => {
    try {
        dispatch({
            type: PRODUCT_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/product?category=${id}`)
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: []
        })
    }
}
export const getProductTopBanner= () => async dispatch => {
    try {
        await dispatch({
            type: PRODUCTS_TOP_BANNER_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/product-banner/?type=top`)
        await dispatch({
            type: PRODUCTS_TOP_BANNER_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCTS_TOP_BANNER_ERROR
        })
    }
}
export const getProductTopBottomBanner= () => async dispatch => {
    try {
        await dispatch({
            type: PRODUCTS_TOP_BOTTOM_BANNER_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/product-banner/?type=top-bottom`)
        await dispatch({
            type: PRODUCTS_TOP_BOTTOM_BANNER_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCTS_TOP_BOTTOM_BANNER_ERROR
        })
    }
}

export const getProductOffer= () => async dispatch => {
    try {
        dispatch({
            type: PRODUCTS_OFFER_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/product-offer/`)
        dispatch({
            type: PRODUCTS_OFFER_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: PRODUCTS_OFFER_ERROR,
            payload: []
        })
    }
}

export function getAverageRating(reviews) {
    let sum = 0;
    if (reviews) {
        reviews.forEach(review => {
            sum += review.rating
        })
        return sum / reviews.length
    }
    return 0;
}