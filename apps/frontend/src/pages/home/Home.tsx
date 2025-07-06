import { useGetBooks } from '@/api/book/api';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { type BookEdition } from '@packages/types';

function Home() {
  const tableState = useTableState({});
  const { pagination } = tableState;
  const { data: books } = useGetBooks({
    query: { page: pagination.pageIndex, pageSize: pagination.pageSize },
  });

  const columns: ColumnDef<BookEdition>[] = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Author',
      accessorKey: 'author',
    },
    {
      header: 'ISBN',
      accessorKey: 'isbn',
    },
    {
      header: 'Copies',
      accessorFn: (row) => row.bookCopies.length,
    },
  ];
  return (
    <div>
      {books && (
        <DataTable
          data={books.data}
          columns={columns}
          rowCount={books.meta.totalRows}
          {...tableState}
        />
      )}
    </div>
  );
}

export default Home;

function useTableState({
  initialPage = 0,
  initialPageSize = 10,
}: {
  initialPage?: number;
  initialPageSize?: number;
}) {
  const [pagination, setPagination] = useState({
    // Changed 'page' to 'pageIndex' to match @tanstack/react-table's expectation
    pageIndex: initialPage,
    pageSize: initialPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  return { pagination, setPagination, sorting, setSorting };
}
