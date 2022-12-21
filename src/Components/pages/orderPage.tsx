import React from 'react';
import { Link } from "react-router-dom";

const OrderPage  : React.FC= () => {
    return (
        <div>
            order page
            <Link to='/cart' className='btn btn-primary'>Назад</Link>
        </div>
    );
};

export default OrderPage ;