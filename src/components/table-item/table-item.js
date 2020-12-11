import React, {Component} from 'react';

import './table-item.css';

export default class TableItem extends Component {


    render() {
        const {user, columns} = this.props;

        const columnsElems = columns.map((item, index) => {
            if (item.visible) {
                return <div key={index}
                            style={{width: item.width}}
                            className="table-item_cell">
                    {user[item.name]}
                </div>
            }
        });

        return (
            <div className="table-item">
                {columnsElems}
            </div>
        )
    }
}
