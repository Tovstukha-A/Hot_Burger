import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import sampleBurgers from "../sample-burgers";
import base from "../base";

class App extends React.Component {

    state = {
        burgers: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addBurger = burger => {
        // 1. Создаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Добавляем новый бургер в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        // 3. Записываем наш новый объект burgers в state
        this.setState({ burgers });
    }

    addToOrder = key => {
        // 1. Создаем копию объекта state
        const order = { ...this.state.order };
        // 2. Добавляем по 1 шт. при клике кнопки к значению уже купленных бургеров, либо добовляем новое значение если в корзине нет таких бургеров
        order[key] = order[key] + 1 || 1;
        // 3. Записываем наш новый объект order в state
        this.setState({ order });
    }

    updateBurger = (key, updatedBurger) => {
        // 1. Создаем копию объекта state
        const burgers = { ...this.state.burgers };
        // 2. Обновляем нужный нам burger
        burgers[key] = updatedBurger;
        // 3. Записываем наш новый объект burgers в state
        this.setState({ burgers });
    };

    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers });
    }

    render() {
        return (
            <>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="Very Hot Burger" />
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map(key => {
                                return <Burger
                                    key={key}
                                    index={key}
                                    details={this.state.burgers[key]}
                                    addToOrder={this.addToOrder}
                                />
                            })}
                        </ul>
                    </div>
                    <Order burgers={this.state.burgers} order={this.state.order} />
                    <MenuAdmin addBurger={this.addBurger} loadSampleBurgers={this.loadSampleBurgers} burgers={this.state.burgers} updateBurger={this.updateBurger} />
                </div>
            </>
        )
    }
}

export default App;