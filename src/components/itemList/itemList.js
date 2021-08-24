import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import gotServise from '../../services/gotService';
import './itemList.css';

class ItemList extends Component {


    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;

            const label = this.props.renderItem(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {data} = this.props;
        const items = this.renderItems(data);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}


ItemList.defaultProps = {
    onItemSelected: () => { }
}



const withData = (View, getData) => { //HOS function
    return class extends Component {

        state = {
            data: null
        }

        componentDidMount() {//life cycle hook

            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />
            }
            return <View {...this.props}  data={data}/>
        }
    }
}
const {getAllCharacters} = new gotServise();
export default withData(ItemList, getAllCharacters);