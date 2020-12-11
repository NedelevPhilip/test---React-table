import React, {Component} from 'react';

import './table-body.css';

export default class  TableBody extends Component{

    render() {
        return(
            <div className="table-body">
                {this.props.children}
            </div>
        )
    }
}

