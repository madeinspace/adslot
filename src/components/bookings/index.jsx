import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import {
    Input,
} from 'reactstrap';
import style from './bookings.scss';
import { APIS } from '../../_helpers/apis';
import Booking from '../booking';
import Seller from '../seller';

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchField: '',
            sellers: [],
            bookings: [],
            products: [],
            filteredProducts: [],
        };
    }
    
    componentWillMount() {
        this.getData();
    }

    getData = () => {
        Promise.all([
            fetch(APIS.SELLERS).then(r => r.json()),
            fetch(APIS.BOOKINGS).then(r => r.json()),
            fetch(APIS.PRODUCTS).then(r => r.json()),
          ]).then(([sellers, bookings, products]) => {
                this.setState({
                    loading: false,
                    sellers: sellers.data,
                    bookings: bookings.data,
                    products: products.data,
                });
          })
          .catch((err) => {
              console.log(err);
          });
    }

    getBookings = (sellerId) => {
        const { bookings, products } = this.state;
        // match all bookings with their corresponfing products
        const bookng = _.filter(_.sortBy(bookings, b => b.startDate).map((booking) => {
            const prodmatch = _.filter(products, product => product.id === booking.productId);
            const isOutOfDate = dayjs(booking.endDate).isBefore(dayjs());
            return prodmatch[0].sellerId === sellerId && !isOutOfDate
            ? <Booking key={booking.id} booking={booking} product={prodmatch[0]} />
            : null;
        }), bk => bk !== null);

        return bookng;
    }

    getBookingGroups = () => {
        const { sellers } = this.state;
        // create groups of booking based on seller id
        const bgroup = _.map(sellers, seller => (
            <Seller
                key={seller.id}
                bookings={this.getBookings(seller.id)}
                seller={seller} />
        ));
        return bgroup;
    }

    handleChange = (evt) => {
        const { products, filteredProducts, searchField } = this.state;
        const searchTerm = evt.target.value;
        const tempProducts = [...products];

        const match = _.filter(tempProducts, product => _.includes((product.name).toLowerCase(), searchTerm.toLowerCase()));

        console.log(match);

        this.setState({ searchField: searchTerm, filteredProducts: match });
    }

    render() {
        const { loading } = this.state;
        return (
            <div className={style.bookings}>
                <h2>Bookings</h2>
                {/* <Input
                    value={searchField}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Search bookings by product name" /> */}
                { loading ? (
                <div className={style.loader}></div>
                )
                : this.getBookingGroups()
                }
            </div>
        );
    }
}

export default Bookings;
