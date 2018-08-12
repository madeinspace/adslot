import React from 'react';
import dayjs from 'dayjs';
import style from './booking.scss';

const Booking = ({ product, booking }) => {
    const { name, rate } = product;
    const {
        id,
        quantity,
        startDate,
    } = booking;
    const isLive = dayjs().isBefore(dayjs(booking.endDate)) && dayjs().isAfter(dayjs(booking.startDate));
    const stDate = dayjs(startDate).format('DD/MM/YYYY');
    const quant = quantity.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    const bookingRate = '$' + ((rate / 100000) * quantity).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1,');

return (
    <tr className={isLive ? `${style.booking} ${style.isLive}` : `${style.booking}`}>
        <td align="left">
        {
            id.substring(0, 4)
        }
        </td>
        <td align="left">{name}</td>
        <td>{quant}</td>
        <td>{rate}</td>
        <td>{bookingRate}</td>
        <td>{stDate}</td>

    </tr>
);
};

export default Booking;
