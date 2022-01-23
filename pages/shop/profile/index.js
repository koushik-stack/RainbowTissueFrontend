import React, {useEffect, useState} from 'react';
import classnames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Pagination} from "@mui/material";
import ProfileInfoCart from "./components/profileInfoCart";
import _ from 'lodash'
import Header from "../components/header";
import {
    getDefaultAddressAddress,
    getDefaultAddressCity,
    getDefaultAddressCountry, getDefaultAddressId, getDefaultAddressZipCode,
    getProfile,
    updateProfile
} from "../../../services/profile/profileAction";
import Swal from "sweetalert2";
import useProfile from "../../../hooks/useProfile";
import {getRatingsObject, getReview, getReviewByUserId} from "../../../services/store/review/Action";

import ReviewCard from "../product/reviewCard";
import {useRouter} from "next/router";
import OrderTab from "./components/OrderTab";
import ReviewTab from "./components/ReviewTab";

const tab = [{name: "Profile"}, {name: "Password"}, {name: "Order"}, {name: "Review"}]

const limit=5
const Index = () => {
    const dispatch = useDispatch()
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [reviewPage, setReviewPage] = useState(1)
    const [reviewOffset, setReviewOffset] = useState(0)

    const [profile, profileId, loggedIn] = useProfile()
    const router = useRouter();
    const profileTab = router.query.tab
    const reviews = useSelector(store => store.reviewByUserId);
    useEffect(() => {
        if (profileTab === "order") {
            setActiveTabIndex(2)
        }
    }, [profileTab])

    // useEffect(() => {
    //     if (!_.isEmpty(reviews.data)) {
    //         if (!_.isEmpty(reviews.data.results)){
    //             getRatingsObject(reviews.data)
    //         }
    //     }
    // }, [reviews])

    useEffect(() => {
        if (loggedIn){
            if (profile.data.user){
                dispatch(getReviewByUserId(profile.data.user.id, limit, reviewOffset))
            }
        }
    }, [profile, reviewOffset])


    function handleEdit(e) {
        e.preventDefault()
        const formData = new FormData();
        const user = {
            username: e.target.phone.value,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            email: e.target.email.value
        }
        const address = {
            id: e.target.addressId.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            address: e.target.address.value,
            city: e.target.city.value,
            country: e.target.country.value,
            zipCode: e.target.zipCode.value
        }
        formData.append("address", JSON.stringify(address))
        formData.append("user", JSON.stringify(user))
        updateProfile(formData, e.target.id.value).then(r => {
            if (r.status === 200) {
                if (r.data.message === 'success') {
                    if (profileId !== -1) {
                        dispatch(getProfile(profileId))
                        window.scrollTo(0, 900);
                    }
                    Swal.fire({
                        text: 'Update Successful',
                        icon: 'success',
                    })
                }
                // else toast.error(r.data.message, {autoClose: 10000});
                else {
                    Swal.fire({
                        text: r.data.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleReviewPaginate(e, page) {
        setReviewPage(page)
        setReviewOffset(limit*(page-1))
    }

    if (!loggedIn) {
        return (<CircularProgress color={"info"}/>)
    } else {
        return (
            <div>
                {profile.loading ?
                    <>

                    </> :
                    <>
                        <Header/>
                        <section className={'sm:w-7/12 mx-auto  border-2 rounded-2xl mt-16'}>

                            <div
                                className="flex border-b-2 border-gray-100 rounded-t-2xl justify-content-start px-4 pt-4 text-gray-500 profile bg-gray-50">
                                {
                                    tab.map((v, i) => (
                                        <div

                                            onClick={() => setActiveTabIndex(i)}
                                            key={`profile-tab-${i}`}
                                            className={classnames(activeTabIndex === i ? "active" : "", "mx-8 pb-4")}>{v.name}</div>
                                    ))
                                }

                            </div>

                            {

                                !_.isEmpty(profile.data) ?
                                    <>
                                        <div
                                            className={classnames(activeTabIndex === 0 ? "" : "hidden", ' flex flex-wrap')}>
                                            <ProfileInfoCart
                                                profileId={profileId}
                                                pictureUrl={profile.data.profilePicture}
                                                fName={profile.data.user.first_name}
                                                lName={profile.data.user.last_name}
                                                // lName={user.fields.last_name}
                                                title={'Edit Profile info'}
                                                subtitle={'Set up your Information if you needs'}
                                            />
                                            <div className={'sm:w-3/4  px-4'}>

                                                <div className="w-full flex">
                                                    {/* Col */}
                                                    <div className="w-full bg-white rounded-lg lg:rounded-l-none p-8">
                                                        <form className="pt-6 pb-8 mb-4 bg-white rounded"
                                                              onSubmit={handleEdit}>
                                                            <div className="mb-1 md:flex">
                                                                <input type="text" id={"id"} value={profileId} hidden/>
                                                                <div className="mb-4 md:mr-2 md:mb-0 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="firstName">
                                                                        First Name
                                                                    </label>
                                                                    <input type="text" id="firstName"
                                                                           placeholder={'Enter Your First Name'}
                                                                           required
                                                                           defaultValue={profile.data.user.first_name}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>
                                                                <div className="md:ml-2 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="lastName">
                                                                        Last Name <span
                                                                        className="text-gray-400">(optional)</span>
                                                                    </label>
                                                                    <input type="text" id="lastName"
                                                                           placeholder={'Enter Your Last Name'}
                                                                           defaultValue={profile.data.user.last_name}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 md:flex">
                                                                <div className="mb-1 md:mr-2 md:mb-0 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700 disable"
                                                                        htmlFor="phone">
                                                                        Phone
                                                                    </label>
                                                                    <input type="number" id="phone"
                                                                           readOnly
                                                                           placeholder={'Enter Your Phone'}
                                                                           value={profile.data.phone}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                                focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                                px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                                    />
                                                                </div>
                                                                <div className="md:ml-2 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="email">
                                                                        Email
                                                                    </label>
                                                                    <input type="email" id="email"
                                                                           placeholder={'example@gmail.com'}
                                                                           defaultValue={profile.data.user.email}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                            focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                            px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>
                                                            </div>


                                                            <div className="mb-4 md:flex">
                                                                <div className="mb-1 md:mr-2 md:mb-0 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="city">
                                                                        City
                                                                    </label>
                                                                    <input type="text" id={'addressId'} hidden
                                                                           value={getDefaultAddressId(profile.data.user.address)}/>
                                                                    <input type="text" id="city"
                                                                           placeholder={'Ex: Dhaka'}
                                                                           defaultValue={getDefaultAddressCity(profile.data.user.address)}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                            focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                            px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>
                                                                <div className="md:ml-2 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="country">
                                                                        Country
                                                                    </label>
                                                                    <input type="text" id="country"
                                                                           placeholder={"Ex: Bangladesh"} required
                                                                           defaultValue={getDefaultAddressCountry(profile.data.user.address)}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                                    px-3
                                                                                    leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 md:flex">
                                                                <div className="md:ml-2 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="zipCode">
                                                                        Zip Code
                                                                    </label>
                                                                    <input type="text" id="zipCode" required placeholder={"Enter Your Zip Code"}
                                                                           defaultValue={getDefaultAddressZipCode(profile.data.user.address)}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>

                                                                <div className="md:ml-2 md:w-1/2 w-full">
                                                                    <label
                                                                        className="block mb-2 text-sm font-bold text-gray-700"
                                                                        htmlFor="address">
                                                                        Address
                                                                    </label>
                                                                    <input type="text" id="address" required placeholder={"Enter Your Address"}
                                                                           defaultValue={getDefaultAddressAddress(profile.data.user.address)}
                                                                           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                                </div>

                                                            </div>


                                                            <div className="mb-6 text-center">
                                                                <button
                                                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                                    type="submit">
                                                                    Save Profile
                                                                </button>
                                                            </div>


                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={classnames(activeTabIndex === 1 ? "" : "hidden", '', 'flex flex-wrap')}>

                                            <ProfileInfoCart
                                                pictureUrl={profile.data.profilePicture}
                                                fName={profile.data.user.first_name}
                                                lName={profile.data.user.last_name}
                                                title={'Change Password'}
                                                subtitle={'Manage your password'}
                                            />
                                            <div className={'sm:w-3/4  px-4'}>
                                                <form className="pt-6 pb-8 mb-4 bg-white rounded">
                                                    <div className="mb-1 md:flex">
                                                        <div className="mb-4  w-full">
                                                            <label
                                                                className="block mb-2 text-sm font-semibold text-gray-700"
                                                                htmlFor="old_password">
                                                                Old Password
                                                            </label>
                                                            <input type="password" id="old_password"
                                                                   placeholder={'Enter Your Old Password'}
                                                                   required
                                                                   className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                        </div>

                                                    </div>
                                                    <div className="w-full mb-4">
                                                        <label
                                                            className="block mb-2 text-sm font-semibold text-gray-700"
                                                            htmlFor="password1">
                                                            New Password
                                                        </label>
                                                        <input type="password" id="password1"
                                                               placeholder={'Enter Your New Password'}
                                                               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                    </div>
                                                    <div className="w-full">
                                                        <label
                                                            className="block mb-2 text-sm font-semibold text-gray-700"
                                                            htmlFor="password2">
                                                            Confarm Password
                                                        </label>
                                                        <input type="password" id="password2"
                                                               placeholder={'Enter Your New Password'}
                                                               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                                    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1
                                                    px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                                    </div>
                                                    <div className="mt-6 text-left">
                                                        <button
                                                            className="  px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                            type="submit">
                                                            Change Password
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                        <div
                                            className={classnames(activeTabIndex === 2 ? "" : "hidden", 'bg-gray-100 p-5')}>
                                            <OrderTab/>
                                        </div>
                                        <div className={classnames(activeTabIndex === 3 ? "" : "hidden", 'p-4')}>
                                            {
                                                reviews.loading?
                                                    <div className={"flex h-40 justify-center items-center"}>
                                                        <CircularProgress/>
                                                    </div>
                                                    :
                                                    reviews.data.count>0?
                                                        <>
                                                            <ReviewTab reviews={reviews.data.results}/>
                                                            <div className={'flex justify-center items-center mt-2 w-full'}>
                                                                {
                                                                    reviews.data.count>limit?
                                                                        <Pagination count={Math.ceil(reviews.data.count/limit)} page={reviewPage} onChange={handleReviewPaginate} color="primary" />
                                                                        :<></>
                                                                }
                                                            </div>
                                                        </>
                                                        :
                                                        <div className={"flex h-40 justify-center items-center"}>
                                                            Review not Found
                                                        </div>
                                            }

                                        </div>
                                    </> :
                                    <></>
                            }


                        </section>
                    </>

                }
            </div>
        );
    }

};

export default Index;