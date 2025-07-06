import { useGetBooks } from '@/api/book/api';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { type BookEdition } from '@packages/types';

function Home() {
  const pagination = usePagination();
  const { data: books } = useGetBooks({
    query: { page: pagination.page, pageSize: pagination.pageSize },
  });

  const columns: ColumnDef<BookEdition>[] = [
    {
      header: 'Title',
      accessorKey: 'title',
      enableSorting: true,
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
          {...pagination}
        />
      )}
    </div>
  );
}

export default Home;

function usePagination(initialState?: {
  initialPage?: number;
  initialPageSize?: number;
}) {
  const { initialPage = 0, initialPageSize = 10 } = { ...initialState };

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return { page, setPage, pageSize, setPageSize };
}
