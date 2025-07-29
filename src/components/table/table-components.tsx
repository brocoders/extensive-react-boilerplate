import { Ref } from "react";
import Table, { TableProps } from "@mui/material/Table";
import TableBody, { TableBodyProps } from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  ScrollerProps,
  TableComponents as TableComponentsType,
} from "react-virtuoso";

const TableComponents = {
  Scroller: function Scroller(
    props: ScrollerProps & { ref?: Ref<HTMLDivElement> }
  ) {
    return <TableContainer component={Paper} {...props} ref={props.ref} />;
  },
  Table: (props: TableProps) => (
    <Table stickyHeader {...props} style={{ borderCollapse: "separate" }} />
  ),
  TableHead: TableHead as unknown as TableComponentsType["TableHead"],
  TableFoot: TableFooter as unknown as TableComponentsType["TableFoot"],
  TableRow: TableRow,
  TableBody: function BodyTable(
    props: TableBodyProps & { ref?: Ref<HTMLTableSectionElement> }
  ) {
    return <TableBody {...props} ref={props.ref} />;
  },
};

export default TableComponents;
