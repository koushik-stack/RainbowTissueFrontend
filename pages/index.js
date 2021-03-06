import Head from 'next/head'
import SingleSlider from "../components/Slider/SingleSlider";
import styles from '../styles/Home.module.scss'
import ContentSlider from "../components/ContentSlider/ContentSlider";
import classnames from 'classnames'
import {useSelector} from 'react-redux'
import Skeleton from '@mui/material/Skeleton';
import 'animate.css';
import _ from 'lodash';

function Home() {
    const website = useSelector(state => state.website);
    return (
        <div>
            {
                website.loading ?
                    <>
                        <Skeleton variant="rectangular" height={600} animation="wave"/>
                        <div className="container  1/12 sm:w-3/4 mx-auto md:px-0 px-8 my-12 mx-auto text-center">
                            <div className={'flex justify-center'}>
                                <Skeleton variant="rectangular" width={200} height={50} animation="wave"/>
                            </div>

                            <br/>
                            <Skeleton/>
                            <Skeleton animation="wave"/>
                            <Skeleton animation={false}/>
                            <br/><br/>
                            <Skeleton variant="rectangular" height={100} animation="wave"/>
                            <br/> <br/>
                            <Skeleton variant="rectangular" height={600} animation="wave"/>
                        </div>
                    </>
                    :
                    <>
                        {
                            !_.isEmpty(website.data) ?
                                <>
                                    <Head>
                                        <meta charSet="utf-8"/>
                                        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                                        <title>Rainbow tissue paper - rainbow tissue, tissue, tissue paper, paper, tissue paper bangladesh, tissue bd, tissue paper, rainbow tissue paper bd, rainbow</title>
                                        <meta name="description" content="Rainbow Pulp & Paper Industries Ltd. is a unit of Rainbow Group of Industries which is one of the largest Tissue and Paper producers in Bangladesh. Rainbow Pulp & Paper Industries Ltd ensures quality products by importing the world's finest raw materials & using famous European Record Technology and sophisticated GSM control machines."/>
                                        <link rel="icon" href="/fav.png"/>
                                    </Head>
                                    {
                                        website.data[0].homeSliders &&
                                        <div className={styles.slider_area}>
                                            <SingleSlider slider={website.data[0].homeSliders}/>
                                            {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">*/}
                                            {/*    <path fill="#0099ff" fillOpacity="1"*/}
                                            {/*          d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,256C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"/>*/}
                                            {/*</svg>*/}
                                            <svg id="wave" style={{transform: 'rotate(0deg)', transition: "0.3s"}}
                                                 viewBox="0 0 1440 110"
                                                 version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path style={{transform: "translate(0, 0px)", opacity: "1"}}
                                                      fill={"#fff"}
                                                      d="M0,84L80,91C160,98,320,112,480,100.3C640,89,800,51,960,32.7C1120,14,1280,14,1440,23.3C1600,33,1760,51,1920,65.3C2080,79,2240,89,2400,91C2560,93,2720,89,2880,91C3040,93,3200,103,3360,93.3C3520,84,3680,56,3840,58.3C4000,61,4160,93,4320,95.7C4480,98,4640,70,4800,63C4960,56,5120,70,5280,72.3C5440,75,5600,65,5760,51.3C5920,37,6080,19,6240,14C6400,9,6560,19,6720,37.3C6880,56,7040,84,7200,86.3C7360,89,7520,65,7680,51.3C7840,37,8000,33,8160,39.7C8320,47,8480,65,8640,63C8800,61,8960,37,9120,28C9280,19,9440,23,9600,37.3C9760,51,9920,75,10080,86.3C10240,98,10400,98,10560,84C10720,70,10880,42,11040,28C11200,14,11360,14,11440,14L11520,14L11520,140L11440,140C11360,140,11200,140,11040,140C10880,140,10720,140,10560,140C10400,140,10240,140,10080,140C9920,140,9760,140,9600,140C9440,140,9280,140,9120,140C8960,140,8800,140,8640,140C8480,140,8320,140,8160,140C8000,140,7840,140,7680,140C7520,140,7360,140,7200,140C7040,140,6880,140,6720,140C6560,140,6400,140,6240,140C6080,140,5920,140,5760,140C5600,140,5440,140,5280,140C5120,140,4960,140,4800,140C4640,140,4480,140,4320,140C4160,140,4000,140,3840,140C3680,140,3520,140,3360,140C3200,140,3040,140,2880,140C2720,140,2560,140,2400,140C2240,140,2080,140,1920,140C1760,140,1600,140,1440,140C1280,140,1120,140,960,140C800,140,640,140,480,140C320,140,160,140,80,140L0,140Z"/>
                                            </svg>

                                        </div>
                                    }

                                    <div
                                        className="container  1/12 sm:w-3/4 mx-auto md:px-0 px-8 my-12 mx-auto text-center">
                                        <h4 className="uppercase text-2xl sm:text-4xl text-primary">{website.data[0].homeTitle1}</h4>
                                        <p className={classnames('mt-7 text-sm sm:text-lg text-description')}>
                                            {website.data[0].homeSubTitle1}
                                        </p>
                                    </div>
                                    <div className={`w-11/12 sm:w-3/4 mx-auto`}>
                                        <ContentSlider/>
                                    </div>
                                </> :
                                <></>
                        }

                    </>
            }

        </div>

    )
}

// Home.getInitialProps = store.getInitialPageProps(store => ({pathname, req, res}) => {
//     console.log('2. Page.getInitialProps uses the store to dispatch things');
//     store.dispatch(getWebsiteDetails);
// });

export default Home;