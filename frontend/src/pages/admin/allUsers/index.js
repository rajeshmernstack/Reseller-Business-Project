import axios from 'axios';
import Swal from 'sweetalert2'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AdminAppBar from '../components/AdminAppBar';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function AllUsers() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [allUsers, setAllUsers] = React.useState([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        if ((localStorage.getItem("token") === null) || (localStorage.getItem("token") === "")) {
            window.location.href = "/admin/login"
        } else {
            axios.get("/api/admin/getallusers").then((response) => {
                setAllUsers(response.data.data)
            })
        }
    }, []);

    function deleteUser(uid) {
        axios.delete("/api/admin/deleteuser", { _id: uid }).then((response) => {
            console.log(response);
            if (response.data.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })

                setAllUsers(allUsers.filter(user => user._id != uid));
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    function updateUser(uid) {
        window.location.href = "updateuser/" + uid;
    }

    return (<>
        <AdminAppBar />
        <br />
        <br />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Password</StyledTableCell>
                        <StyledTableCell>Total Credits</StyledTableCell>
                        <StyledTableCell>Used Credits</StyledTableCell>
                        <StyledTableCell>Remaining Credits</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : allUsers
                    ).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell>
                                {row.password}
                            </TableCell>
                            <TableCell>
                                {row.totalCredits}
                            </TableCell>
                            <TableCell>
                                {row.usedCredits}
                            </TableCell>
                            <TableCell>
                                {row.remainingCredits}
                            </TableCell>
                            <TableCell>
                            <Button
                                    style={{ backgroundColor: '#4BB543' }}
                                    variant="contained"
                                    onClick={() => {
                                        updateUser(row._id);
                                    }}
                                >Update</Button>
                                <Button
                                    style={{ backgroundColor: '#ff0e0e' }}
                                    variant="contained"
                                    onClick={() => {
                                        deleteUser(row._id);
                                    }}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={allUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </>
    )
}
