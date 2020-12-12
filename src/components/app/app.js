import {React, Component} from 'react';

import withApiService from "../hoc/with-api-service";
import Table from "../table";
import TableHeader from "../table-header";
import TableBody from "../table-body";
import TableFooter from "../table-footer";
import TableItem from "../table-item";
import TablePagination from "../table-pagination";
import RingLoader from "react-spinners/RingLoader";
import TableItemExpander from "../table-item-expander";

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: {},
            pagination: {
                page: 1,
                tableSize: 20,
            },
            sort: {
                name: null,
                direction: "descending"
            },
            columns: [
                {
                    name: "name",
                    visible: true,
                    sortable: true,
                    width: "200px"
                },
                {
                    name: "email",
                    visible: true,
                    sortable: false,
                    width: "400px"
                },
                {
                    name: "gender",
                    visible: true,
                    sortable: true,
                    width: "100px"
                },
                {
                    name: "status",
                    visible: true,
                    sortable: true,
                    width: "100px"
                }
            ]
        }
    }

    downloadUsers = () => {
        const {page, tableSize} = this.state.pagination;
        this.props.apiService
            .getUsersByPage(page, tableSize)
            .then((data) => this.setState({
                isLoading: false,
                users: data.users,
                pagination: data.pagination
            }))
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.downloadUsers();
    }

    render() {
        const {isLoading, users, columns, pagination, sort} = this.state;

        const handleChangeTableRowAmount = (event) => {
            let newState = {
                ...this.state, pagination:
                    {
                        ...this.state.pagination,
                        tableSize: parseInt(event.target.value, 10)
                    }
            };
            this.setState(newState, () => {
                this.downloadUsers();
            });
        };

        const handleChangePage = (page) => {
            let newState = {
                ...this.state, pagination:
                    {
                        ...this.state.pagination,
                        page: page
                    }
            };
            this.setState(newState, () => {
                this.downloadUsers();
            });
        };

        const handleSort = (column) => {
            let newState = {
                ...this.state, sort:
                    {
                        ...this.state.sort,
                        name: column,
                        direction: this.state.sort.direction === "ascending" ? "descending" : "ascending"
                    }
            };
            this.setState(newState);
        };

        const handleVisible = (event) => {
            const newColumnIndex = columns.findIndex(({name}) => name === event.target.value);
            let newColumn = {
                ...columns[newColumnIndex],
                visible: !columns[newColumnIndex].visible
            };
            let newState = {
                ...this.state,
                columns:[
                    ...this.state.columns.slice(0, newColumnIndex),
                    newColumn,
                    ...this.state.columns.slice(newColumnIndex + 1)
                ]
            };
            this.setState(newState);
        };

        const handleExpand = (userId) => {
            const newUserIndex = users.findIndex(({id}) => id === userId);
            let newUser = {
                ...users[newUserIndex],
                expanded: !users[newUserIndex].expanded
            };
            let newState = {
                ...this.state,
                users:[
                    ...this.state.users.slice(0, newUserIndex),
                    newUser,
                    ...this.state.users.slice(newUserIndex + 1)
                ]
            };
            this.setState(newState);
        };




        let content;
        if (isLoading) {
            content = <div className="table-spinner-wrap">
                <RingLoader size={80} color={"mediumblue"}/>
            </div>
        } else {
            content = [];
            let sortedUsers = [...users];
            let sortedField = sort.name;

            if (sortedField !== null) {
                sortedUsers.sort((a, b) => {
                    if (a[sortedField] < b[sortedField]) {
                        return sort.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortedField] > b[sortedField]) {
                        return sort.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }

            sortedUsers.map((item) => {
                content.push(<TableItem
                    key={item.id}
                    columns={columns}
                    user={item}
                    onExpand={handleExpand}
                    expander={item.expanded ? <TableItemExpander user={item}/> : null}/>);
            })
        }

        return (
            <div className='app'>
                <Table>
                    <TableHeader
                        onSort={handleSort}
                        onVisible={handleVisible}
                        columns={columns}
                    />
                    <TableBody>
                        {content}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsAmount={[10, 20, 30]}
                            pagination={pagination}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeTableRowAmount}
                        />
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

export default withApiService()(App);

