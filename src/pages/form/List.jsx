import React, { useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useGetFormsQuery } from "../../api/slice";
import Loader from "../../common/loader";
import NoDataDiv from "../../common/nodatadiv";

const columns = ["Title", "Decription", "CreatedAt", "Responses", "Actions"];

export default function List() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetFormsQuery({ endpoint: "form" });
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Loader open={isLoading} />
      <Stack direction={"row"} alignItems={"end"} justifyContent={"flex-end"}>
        <Button variant="contained" onClick={() => navigate("/new")}>
          New Form
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`${column.name}-${index}`}
                  style={{ minWidth: 170 }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.length > 0 &&
              data?.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.id}-${row.title}` }
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        {moment(row.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>{row.responses?.length}</TableCell>
                      <TableCell>
                        <Button onClick={() => navigate(`${row?.id}`)}>
                          Add Response
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        {!data?.data.length ? <NoDataDiv /> : null}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
