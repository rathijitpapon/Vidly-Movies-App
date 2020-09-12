import React, { Component } from 'react';
import _ from "lodash";

class TableBody extends Component {

    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path)
    };

    render() { 
        const { data, columns } = this.props;

        return ( 
            <tbody>
                { data.map((item, index) => (
                    <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        { columns.map(column => (
                            <td key={item._id + (column.path || column.key)}>{ this.renderCell(item, column) }</td>
                        )) }
                    </tr>
                )) }
                {/* {data.map((item, index) => {
                    return (
                        <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like
                            liked={movie.liked}
                            onClick={() => onLike(movie)}
                            />
                        </td>
                        <td>
                            <button
                            onClick={() => onDelete(movie)}
                            className="btn btn-danger btn-sm"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    );
                    })} */}
            </tbody>
         );
    }
}
 
export default TableBody;