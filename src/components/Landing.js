import React from "react";
import restaurants from "../sample-restaurants";

class Landing extends React.Component {

    render() {
        return (
            <>
                <div className="restaurant_select">

                    <div className="restaurant_select_top">
                        <div className="restaurant_select_top-header font-effect-outline">Пожалуйста, выбери ресторан</div>
                        <div className="arrow-picker">
                            <div className="arrow-picker-up"></div>
                            <div className="arrow-picker-down"></div>
                        </div>
                    </div>

                    <div className="restaurant_select_bottom">
                        <ul>
                            {restaurants.map(item => {
                                return <li key={item.id}>{item.title}</li>
                            })}
                        </ul>
                    </div>

                    <button>Перейти в ресторан</button>

                </div>
            </>
        )
    }
}

export default Landing;