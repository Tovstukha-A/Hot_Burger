import React from "react";
import restaurants from "../sample-restaurants";

class Landing extends React.Component {

    state = {
        display: false,
        title: "",
        url: ""
    };

    displayList = () => {
        const { display } = this.state;
        this.setState({ display: !display });
    }

    getTitle = item => {
        const { title, url } = item;
        this.setState({ title: title, url: url, display: false });
    };

    gotoRestaurant = () => {
        console.log("gotoRestaurant");
    }

    render() {
        return (
            <>
                <div className="restaurant_select">

                    <div className="restaurant_select_top">
                        <div onClick={this.displayList} className="restaurant_select_top-header font-effect-outline">
                            {this.state.title ? this.state.title : "Пожалуйста, выбери ресторан"}
                        </div>
                        <div className="arrow-picker">
                            <div className="arrow-picker-up"></div>
                            <div className="arrow-picker-down"></div>
                        </div>
                    </div>

                    {this.state.display ? (<div className="restaurant_select_bottom">
                        <ul>
                            {restaurants.map(item => {
                                return <li onClick={() => this.getTitle(item)} key={item.id}>{item.title}</li>
                            })}
                        </ul>
                    </div>) : null}

                    {this.state.title && !this.state.display ? (<button onClick={this.gotoRestaurant}>Перейти в ресторан</button>) : null}

                </div>
            </>
        )
    }
}

export default Landing;