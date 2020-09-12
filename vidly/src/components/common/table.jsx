import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import _ from "lodash";

const Table = (props) => {

    const { columns, sortColumn, onSort, data } = props;

    return ( 
        <table className="table table-striped table-bordered table-hover">
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody
                data={data}
                columns={_.slice(columns, [1])}
            />
        </table>
     );
}
 
export default Table;
