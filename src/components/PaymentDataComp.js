import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PaymentDataComp extends Component {

    state = {
        name: '',
        quantity: '',
        price: ''
    };

    onInputChange = ev => this.setState({[ ev.target.name ]: ev.target.value });

    handleSubmit = () => {

        // Reset state.
        this.setState({
            name: '',
            quantity: '',
            price: ''
        });

        // Add product to products array.
        this.props.addProduct( this.state );
    };

    render() {

        return (
            <div className={ this.props.className }>
                <h1>Данные оплаты</h1>
                <div className="form-group">
                    <label htmlFor="checkId">ID чека</label>
                    <input
                        id="checkId"
                        className="form-control"
                        type="number"
                        placeholder="123..."
                        onChange={ this.props.onInputChange }
                        value={ this.props.paymentData.checkId }
                        name="checkId"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNum">Карта</label>
                    <input
                        id="cardNum"
                        className="form-control"
                        type="num"
                        placeholder="...1234"
                        onChange={ this.props.onInputChange }
                        value={ this.props.paymentData.cardNum }
                        name="cardNum"
                    />
                </div>

                <h1>Товар</h1>
                <div className="form-group">
                    <label htmlFor="name">Наименование</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        placeholder={ "Пылесос \"Ракета-7\"" }
                        onChange={ this.onInputChange }
                        value={ this.state.name }
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Количество</label>
                    <input
                        id="quantity"
                        className="form-control"
                        type="number"
                        placeholder="100 :)"
                        onChange={ this.onInputChange }
                        value={ this.state.quantity }
                        name="quantity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена</label>
                    <input
                        id="price"
                        className="form-control"
                        type="number"
                        placeholder="1,000,000 сум"
                        onChange={ this.onInputChange }
                        value={ this.state.price }
                        name="price"
                    />
                </div>
                <button
                    className="btn btn-info"
                    onClick={ this.handleSubmit }
                >
                    Добавить
                </button>
            </div>
        )
    }
}

PaymentDataComp.propTypes = {
    paymentData: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default PaymentDataComp;