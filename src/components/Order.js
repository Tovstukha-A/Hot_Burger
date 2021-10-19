import React from "react";
import Shipment from "./Shipment";

class Order extends React.Component {

    renderOrder = (key) => {
        const burger = this.props.burgers[key];
        const count = this.props.order[key];

        const isAvaliable = burger && burger.status === "available"
        if (!isAvaliable) {
            return <li className="unavailable" key={key}>
                Просим извенить но {burger ? burger.name : "бургер"} временно недоступен к заказу
            </li>
        }

        return <li key={key}>
            <span>
                <span>{count} </span>
                шт. {burger.name}
                <span> {count * burger.price} ₴</span>
                <button className="cancellitam">&times;</button>
            </span>
        </li>
    }

    render() {

        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const burger = this.props.burgers[key];
            const count = this.props.order[key];

            const isAvaliable = burger && burger.status === "available"
            if (isAvaliable) {
                return prevTotal + burger.price * count;
            }
            return prevTotal;
        }, 0);

        return (
            <>
                <div className="order-wrap">
                    <h2>Вы заказали:</h2>
                    <ul className="order">
                        {orderIds.map(this.renderOrder)}
                    </ul>

                    {total > 0 ? (
                        <Shipment total={total} /> 
                    ) : (
                        <div className="nothingSelected">
                            Выберите бургер и добавьте в заказ
                        </div>
                    )}

                </div>
            </>
        )
    }
}

export default Order;