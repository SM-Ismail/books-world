import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
})
const Orders = () => {
    const classes = useStyles();
    const [allOrders, setAllOrders] = useState([]);
    const [userLoggedIn] = useContext(UserContext);
    useEffect(() => {
        fetch("https://aqueous-reef-84639.herokuapp.com/orders?email=" + userLoggedIn.email)
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [userLoggedIn.email])
    return (
        <div>
            <h3 style={{color:"brown"}}>You have {allOrders.length} order(s)</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>BOOK</StyledTableCell>
                            <StyledTableCell align="right">Author</StyledTableCell>
                            <StyledTableCell align="right">Info</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;(g)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders.map((order) => (
                            <StyledTableRow key={order.bookName}>
                                <StyledTableCell component="th" scope="row">
                                    {order.bookName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.author}</StyledTableCell>
                                <StyledTableCell align="right">{order.info}</StyledTableCell>
                                <StyledTableCell align="right">{order.price}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Orders;