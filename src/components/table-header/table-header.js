import React, {Component} from 'react';

import './table-header.css';

export default class  TableHeader extends Component{

    render() {
        const {columns, onSort, onVisible} = this.props;

        const columnsElements = columns.map((item, index) => {
            if(item.visible){
                return <div
                    onClick={item.sortable ? (e) => onSort(item.name, e) : null}
                    className={item.sortable ? "table-header_cell__active" : "table-header_cell"}
                    style={{width: item.width}}
                    key={index}>
                    {item.name}
                </div>
            }
        });

        const displayElements = columns.map((item, index) => {
            return <div key={index} className="table-header_display-item">
                <input  type="checkbox"
                        checked={item.visible ? "checked" : null}
                        value={item.name}
                        onChange={onVisible}
                />
                <span>{item.name}</span>
            </div>
        });


        return(
            <div className="table-header">
                <div className="table-header_top">
                    <div className="table-header_display-button">
                        Display
                        <div className="table-header_display-dropdown">
                            {displayElements}
                        </div>
                    </div>
                </div>
                <div className="table-header_bottom">
                    {columnsElements}
                </div>
            </div>
        )
    }
}
