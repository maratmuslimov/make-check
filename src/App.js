import React, { Component } from 'react';

import { CheckComp, PaymentDataComp } from './components';

// Calculates 20% VAT
const calculateVAT = total => {
    const VAT = ( total / 1.2 - total ) * ( -1 );
    return VAT.toFixed( 2 );
};

const getNow = () => {
    return Intl.DateTimeFormat( 'ru-RU', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format( new Date())
};

class App extends Component {

    state = {
        time: getNow(),
        checkId: '',
        cardNum: '',
        products: [],
        total: 0,
        VAT: ''
    };

    addProduct = product => {
        this.setState( prevState => {

            for ( let i=product.quantity; i; i-- ) {
                prevState.products.push( product );
            }

            // Calculate "total" each time the product is added.
            prevState.total = 0;
            prevState.products.forEach( product => {
                prevState.total += Number( product.price );
            });

            prevState.VAT = calculateVAT( prevState.total );

            return prevState;
        })
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <CheckComp
                        className="col-3"
                        paymentData={ this.state }
                    />
                    <PaymentDataComp
                        paymentData={ this.state }
                        onInputChange={ ev => this.setState({[ ev.target.name ]: ev.target.value })}
                        addProduct={ this.addProduct }
                        className="col-3 offset-6 no-print"
                    />
                </div>
            </div>
        );
    }
}

export default App;
