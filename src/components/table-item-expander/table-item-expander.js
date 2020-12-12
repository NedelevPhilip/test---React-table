import React, {Component} from 'react';

import './table-item-expander.css';

export default class TableItemExpander extends Component {


    render() {
        const {user} = this.props

        return (
            <div className="table-item-expander">
                <img src={`https://picsum.photos/id/${user.id}/80/80`}/>
                <div>
                    Created at: {user.created_at.substr(0, 10)}<br/>
                    Updated at: {user.updated_at.substr(0, 10)}
                </div>
            </div>
        )
    }
}
