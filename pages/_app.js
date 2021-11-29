import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import "animate.css"
import Layout from "../components/layout/Layout";
import 'splide-nextjs/splide/dist/css/themes/splide-skyblue.min.css';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import store from "../services/Store";
import {getWebsiteDetails} from "../services/website/WebsiteAction";
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps, theme}) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWebsiteDetails());
    },[dispatch])
    return (
        <Layout>
            <Component {...pageProps} />
            <ToastContainer />
        </Layout>
    )
}
export default store.withRedux(MyApp)
