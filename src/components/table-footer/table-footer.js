import React, {Component} from 'react';

import './table-footer.css';

export default class  TableFooter extends Component{

    render() {
        return(
            <div className="table-footer">
                {this.props.children}
            </div>
        )
    }
}
