"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUser } from "@/api/hooks/user";
import { getAllUsersType } from "@/api/types";

interface Props {}

const columns: ColumnDef<getAllUsersType>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 10,
  },
  {
    accessorKey: "age",
    header: "age",
  },
  {
    accessorKey: "gender",
    header: "성별",
  },
  {
    accessorKey: "eyeColor",
    header: "눈 색상",
    size: 270,
  },
];

function DataTable(props: Props) {
  const {} = props;

  const { data } = useGetAllUser();
  console.log(data);

  if (!data) return <></>;

  const table = useReactTable({
    data: data?.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mt-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
