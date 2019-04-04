import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isNumber = inp => {
    return !isNaN( Number( inp ));
};

const isPositive = inp => {
    return Number( inp ) >= 0;
};

const hasErrors = ev => {

    const { name, value } = ev.target;
    switch ( name ) {
        case 'checkId':
        case 'quantity':
        case 'price':
            // is positive number
            return ( !isNumber( value ) || !isPositive( value ));
            break;
        case 'cardNum':
            // is positive number AND length <= 4
            return ( !isNumber( value ) || !isPositive( value ) || ev.target.value.length > 4 );
            break;
        default:
            return false;
    }
};

class PaymentDataComp extends Component {

    state = {
        product: {
            name: '',
            quantity: '',
            price: ''
        },
        checkId: '',
        cardNum: '',
        errors: {
            checkId: false,
            cardNum: false,
            quantity: false,
            price: false
        }
    };

    onProductChange = ev => {
        ev.persist();
        this.setState( prevState => {
            prevState.product[ ev.target.name ] = ev.target.value;
            prevState.errors[ ev.target.name ] = hasErrors( ev );
            return prevState;
        });


    };

    onInputChange = ev => {

        ev.persist();

        // В стейт PaymentDataComp загоняем по любому,
        this.setState({[ ev.target.name ]: [ ev.target.value ]});

        // затем проводим валидацию.
        // Если валидация проходит, то закидываем данные в чек.
        if ( !hasErrors( ev )) {
            this.props.onInputChange( ev );

            // и обнуляем error если был
            this.setState( prevState => {
                prevState.errors[ ev.target.name ] = false;
                return prevState;
            });

        } else {

            // Если нет, то выводим error.
            this.setState( prevState => {
                prevState.errors[ ev.target.name ] = true;
                return prevState;
            })
        }
    };

    productHasErrors = () => {
        return ( this.state.errors.quantity || this.state.errors.price );
    };

    handleSubmit = () => {

        if ( !this.productHasErrors()) {
            // Reset state.
            this.setState({
                product: {
                    name: '',
                    quantity: '',
                    price: ''
                }
            });

            // Add product to products array.
            this.props.addProduct( this.state.product );
        }
    };

    render() {

        return (
            <div className={ this.props.className }>
                <h1>Данные оплаты</h1>
                <div className="form-group">
                    <label htmlFor="checkId">ID чека</label>
                    <input
                        id="checkId"
                        className={`form-control ${ this.state.errors.checkId ? 'border-danger' : '' }`}
                        type="text"
                        placeholder="123..."
                        onChange={ this.onInputChange }
                        value={ this.state.checkId }
                        name="checkId"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNum">Карта</label>
                    <input
                        id="cardNum"
                        className={`form-control ${ this.state.errors.cardNum ? 'border-danger' : '' }`}
                        type="text"
                        placeholder="...1234"
                        onChange={ this.onInputChange }
                        value={ this.state.cardNum }
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
                        onChange={ this.onProductChange }
                        value={ this.state.product.name }
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Количество</label>
                    <input
                        id="quantity"
                        className={`form-control ${ this.state.errors.quantity ? 'border-danger' : '' }`}
                        type="text"
                        placeholder="100 :)"
                        onChange={ this.onProductChange }
                        value={ this.state.product.quantity }
                        name="quantity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена</label>
                    <input
                        id="price"
                        className={`form-control ${ this.state.errors.price ? 'border-danger' : '' }`}
                        type="text"
                        placeholder="1,000,000 сум"
                        onChange={ this.onProductChange }
                        value={ this.state.product.price }
                        name="price"
                    />
                </div>
                <button
                    className={`btn btn-info ${ this.productHasErrors() ? 'disabled' : ''}`}
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