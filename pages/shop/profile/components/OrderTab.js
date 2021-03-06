import React, {useEffect} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Chip, Pagination} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../../services/profile/profileAction";
import Skeleton from "@mui/material/Skeleton";

const limit = 10
const OrderTab = () => {
    const [expanded, setExpanded] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const orders = useSelector(store=>store.orderForProfile)
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const dispatch = useDispatch()
    useEffect(()=>{
        getOrderPaginated()
    },[offset])

    function getOrderPaginated(){
        dispatch(getOrder(limit,offset))
    }

    function handleOrderPaginate(e,page) {
        setOffset(limit*(page-1))
    }

    return (
        <div>
            {
                orders.loading?
                    [1,1,1,1].map((value, key) => (
                        <Skeleton key={`profile-order-skeleton-${key}`} variant="rectangular" height={100}  animation="wave" />
                        ))
                    :
                    !_.isEmpty(orders.data.results)?
                        <>
                            {
                                orders.data.results.map((order, key) => (
                                    <Accordion key={`order-panel${key}`} expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <div className={'w-full flex flex-wrap justify-between px-4 py-2'}>
                                                <h2>Order #{order.id}</h2>
                                                <h3><Chip label={order.status} size="small" variant="outlined" /></h3>
                                                <h3>Total: {order.total}</h3>
                                                <h3>{order.status==="delivered"?'Delivered':'EDD'} : {!_.isEmpty(order.deliveryDate)?order.deliveryDate:'Wait for approve'}</h3>
                                                <h3>Order Date: {order.createdDate}</h3>
                                            </div>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                !_.isEmpty(order.items)?
                                                    order.items.map((item, key)=>(
                                                        <div key={`order-panel-orderItem-${key}`}
                                                             className="flex   gap-1 sm:gap-6 p-4 border border-gray-200 rounded flex-wrap  mb-2">
                                                            {/* cart image */}
                                                            <div className=" grid grid-cols-10 gap-4">
                                                                <img src={item.product.thumbnail} className="col-span-2 sm:col-span-1"/>
                                                                <div className="break-words text-xs sm:text-base sm:col-span-5  col-span-8">
                                                                    <p>{item.product.name}</p>
                                                                    <p className={"text-sm text-primary"}>{item.product.currency} {item.product.price}</p>
                                                                </div>
                                                                <div className="sm:text-base text-xs sm:col-span-2  col-span-5">
                                                                    Quantity: {item.quantity}
                                                                </div>
                                                                {/* cartItem content end */} {/* cartItem quantity */}
                                                                {/* cart quantity end */}
                                                                <div className="ml-auto md:ml-0 sm:col-span-2  col-span-5">
                                                                    <p className="text-primary sm:text-base text-xs font-semibold">Total: {item.product.currency} {item.quantity*item.product.price}</p>
                                                                </div>
                                                            </div>
                                                            {/* cart image end */}
                                                            {/* cart content */}
                                                        </div>
                                                    )):<></>
                                            }


                                        </AccordionDetails>
                                    </Accordion>

                                ))
                            }
                            <div className={'flex justify-center items-center mt-2 w-full'}>
                                {
                                    orders.data.count>limit?
                                        <Pagination count={Math.ceil(orders.data.count/limit)} page={offset+1} onChange={handleOrderPaginate} color="primary" />
                                    :<></>
                                }
                            </div>

                        </>
                        :
                        <div className={' h-20 flex justify-center items-center'}>
                            <h2>Order Not Found</h2>
                        </div>

            }

        </div>
    );
};
/*OrderTab.getInitialProps = async ({query}) => {
    const {s} = query
    return {
        props: {
        },
    }
}*/

export default OrderTab;