import React, {Component} from 'react';

import "./table.css"

class Table extends Component{

    render() {
        return(
            <div className="table">
                {this.props.children}
            </div>
        )
    }

}

export default Table;
