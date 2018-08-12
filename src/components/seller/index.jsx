import React from 'react';
import _ from 'lodash';
import style from './seller.scss';

const Seller = ({ bookings, seller }) => (
    <div className={style.seller}>
        <h3>{seller.name}</h3>
        { _.isEmpty(bookings)
            ? (
                <div className={style.noActiveBookings}>No active bookings</div>
            )
            : (
                <table>
                    <thead>
                        <tr>
                            <th width="10%">ID</th>
                            <th width="50%">Product Name</th>
                            <th width="10%">Quantity</th>
                            <th width="10%">Rate</th>
                            <th width="10%">Cost</th>
                            <th width="10%">Start date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                </table>
            )
        }
    </div>
    );

export default Seller;
