import type { ComponentProps, Ref } from "react";
import {
  ItemProps,
  ScrollerProps,
  TableBodyProps,
  TableProps,
} from "react-virtuoso";

type TableSectionProps = Pick<ComponentProps<"thead">, "children" | "style"> & {
  ref?: Ref<HTMLTableSectionElement>;
};

const TableComponents = {
  Scroller: function Scroller(props: ScrollerProps) {
    return (
      <div
        {...props}
        className="relative w-full overflow-auto rounded-md border bg-card"
      />
    );
  },
  Table: function VirtuosoTable(props: TableProps) {
    return (
      <table
        {...props}
        className="w-full caption-bottom text-sm"
        style={{ ...props.style, borderCollapse: "separate", borderSpacing: 0 }}
      />
    );
  },
  TableHead: function VirtuosoTableHead(props: TableSectionProps) {
    return (
      <thead {...props} className="sticky top-0 z-10 bg-card [&_th]:border-b" />
    );
  },
  TableFoot: function VirtuosoTableFoot(props: TableSectionProps) {
    return <tfoot {...props} className="border-t bg-muted/50 font-medium" />;
  },
  TableRow: function VirtuosoTableRow({
    item: _item,
    context: _context,
    ...props
  }: ItemProps<unknown> & { context?: unknown }) {
    return (
      <tr {...props} className="border-b transition-colors hover:bg-muted/50" />
    );
  },
  TableBody: function VirtuosoTableBody(props: TableBodyProps) {
    return <tbody {...props} />;
  },
};

export default TableComponents;
