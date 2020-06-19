import React from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { ResultItem } from "./resultItem";

type Props = {
  tableData: ResultItem[];
};

export default function ResultList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">class</TableCell>
            <TableCell align="right">species</TableCell>
            <TableCell align="right">homeworld</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map((row) => (
            <TableRow key={row.name}>
              <TableCell >{row.name}</TableCell>
              <TableCell align="right">{row.class}</TableCell>
              <TableCell align="right">{row.species}</TableCell>
              <TableCell align="right">{row.homeworld}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
