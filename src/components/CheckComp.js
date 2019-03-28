import React from 'react';

const CheckComp = props => {

    return (
        <div className={ props.className }>

            <h1 className="center">ООО «East-West Engineering»</h1>
            <h3 className="center">г. Ташкент, Юнусабадский р-н, ул. Амир Темура, 107</h3>
            <div className="row">
                <div className="col">
                    <p>Время</p>
                </div>
                <div className="col">
                    {/*<p className="right">25.03.2019, 15:35:54</p>*/}
                    <p className="right">{ props.paymentData.time }</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Пункт обсл.:</p>
                </div>
                <div className="col">
                    <p className="right">90482480</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Терминал:</p>
                </div>
                <div className="col">
                    <p className="right">92401804</p>
                </div>
            </div>
            <h2>Оплата</h2>
            <div className="row">
                <div className="col">
                    <p>ID чека:</p>
                </div>
                <div className="col">
                    <p className="right">{ props.paymentData.checkId || '...' }</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Карта:</p>
                </div>
                <div className="col">
                    <p className="right">8600****{ props.paymentData.cardNum || '&!%@' }</p>
                </div>
            </div>

            <h2>Реквизиты</h2>
            <div className="row">
                <div className="col">
                    <p>НДС:</p>
                </div>
                <div className="col">
                    <p className="right">20%</p>
                </div>
            </div>

            <p>Товар:</p>

            { props.paymentData.products.map(( product, idx ) => (
                <div key={ idx } className="row">
                    <div className="col">
                        <p>{ product.name }</p>
                    </div>
                    <div className="col">
                        <p className="right">{ product.price } сум</p>
                    </div>
                </div>
            ))}

            <div className="row">
                <div className="col">
                    <p>НДС 20% в т.ч. сумма НДС</p>
                </div>
                <div className="col">
                    <p className="right">{ props.paymentData.VAT || '...' } сум</p>
                </div>
            </div>

            <h1 className="center">Итого: { props.paymentData.total || '...' } сум</h1>
            <h2 className="center">Оплачен</h2>
        </div>
    )
};

export default CheckComp;