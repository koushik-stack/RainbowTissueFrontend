
import {
    RATING_LOADING,
    RATING_SUCCESS,
    RATING_ERROR,
    REVIEW_FOR_PROFILE_LOADING,
    REVIEW_FOR_PROFILE_SUCCESS, REVIEW_FOR_PROFILE_ERROR, REVIEW_LOADING, REVIEW_SUCCESS, REVIEW_ERROR
} from "./Type";

import axios from "axios";
import {store_base_url} from "../../../constants";
import _ from "lodash";

export const getReview= (id, limit, offset) => async dispatch => {
    try {
        await dispatch({
            type: REVIEW_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/review/?productId=${id}&limit=${limit}&offset=${offset}`)
        await dispatch({
            type: REVIEW_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: REVIEW_ERROR
        })
    }
}
export const getRatingsByProductId= (id) => async dispatch => {
    try {
        await dispatch({
            type: RATING_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/ratings/?productId=${id}`)
        await dispatch({
            type: RATING_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: RATING_ERROR
        })
    }
}

export const saveReview = (data) => {
    const token = localStorage.getItem("accessToken")
    return axios.post(`${store_base_url}/review-editable/`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(r =>  r).catch(reason => reason)
}
export const updateReview = (data, id) => {
    const token = localStorage.getItem("accessToken")
    return axios.put(`${store_base_url}/review-editable/${id}/`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(r =>  r).catch(reason => reason)
}
export function getRatingsObject(data){
    let response= {}
    if (!_.isEmpty(data)){
        response.avegareRatings =  data.reduce((v1,v2)=>{
            return v1 + (v2.rating/data.length);
        },0).toFixed(2)
        response.one = data.filter(v=>v.rating===1).length
        response.two = data.filter(v=>v.rating===2).length
        response.three = data.filter(v=>v.rating===3).length
        response.four = data.filter(v=>v.rating===4).length
        response.five = data.filter(v=>v.rating===5).length
        response.total = data.length
        response.oneInPercent = (100*response.one)/response.total
        response.twoInPercent = (100*response.two)/response.total
        response.threeInPercent = (100*response.three)/response.total
        response.fourInPercent = (100*response.four)/response.total
        response.fiveInPercent = (100*response.five)/response.total
        response.ratingsArray = [response.five, response.four, response.three, response.two, response.one]
        response.ratingsPercentArray = [response.fiveInPercent, response.fourInPercent, response.threeInPercent, response.twoInPercent, response.oneInPercent]
    }
    return response
}
export const getReviewByUserId= (id, limit, offset) => async dispatch => {
    try {
        await dispatch({
            type: REVIEW_FOR_PROFILE_LOADING,
            payload: []
        })
        const response = await axios.get(`${store_base_url}/review/?userId=${id}&limit=${limit}&offset=${offset}`)
        await dispatch({
            type: REVIEW_FOR_PROFILE_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: REVIEW_FOR_PROFILE_ERROR
        })
    }
}

export const deleteReviewById = (id) => {
    const token = localStorage.getItem("accessToken")
    return axios.delete(`${store_base_url}/review-editable/${id}/`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(value => {
            return value
        }).catch(reason => {
            return reason.message
        })
}
