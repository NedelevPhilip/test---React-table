import React, {Component} from 'react';

import './table-pagination.css';

export default class TablePagination extends Component {

    render() {
        const {onChangeRowsPerPage, onChangePage} = this.props;
        const {page, tableSize, pages} = this.props.pagination;

        const onFirstPage = () =>{
            onChangePage(1);
        };

        const onPrevPage = () =>{
            onChangePage(page - 1);
        };

        const onNextPage = () =>{
            onChangePage(page + 1);
        };

        const onLastPage = () =>{
            onChangePage(pages);
        };


        return (
            <div className="table-pagination">
                <span>Number of rows: </span>
                <select value={tableSize} onChange={onChangeRowsPerPage}>
                    {
                        this.props.rowsAmount.map((item, i) => {
                            return <option value={item} key={i}>{item}</option>
                        })
                    }
                </select>
                <div className="table-pagination_items-wrap">
                    {page > 1
                        ? <div className="table-pagination_item__active" onClick={onFirstPage}>First</div>
                        : <div className="table-pagination_item">First</div>
                    }
                    {page > 1
                        ? <div className="table-pagination_item__active" onClick={onPrevPage}>Prev.</div>
                        : <div className="table-pagination_item">Prev.</div>
                    }
                    <div className="table-pagination_item__active">
                        {`${page} of ${pages}`}
                    </div>
                    {page < pages
                        ? <div className="table-pagination_item__active" onClick={onNextPage}>Next</div>
                        : <div className="table-pagination_item">Next</div>
                    }
                    {page < pages
                        ? <div className="table-pagination_item__active" onClick={onLastPage}>Last</div>
                        : <div className="table-pagination_item">Last</div>
                    }
                </div>
            </div>
        )
    }
}
