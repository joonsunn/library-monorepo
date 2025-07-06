import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const BOOK_URL = {
  GET_BOOKS: '/book-edition',
};

type QueryBooksDto = {
  page: number;
  pageSize: number;
};

const BOOK_QUERY_KEYS = {
  GET_BOOKS: (query?: QueryBooksDto) => ['books', 'all', query],
};

async function getBooks(params?: QueryBooksDto) {
  const response = await axios.get(BOOK_URL.GET_BOOKS, { params });
  return response.data;
}

export function useGetBooks({ query }: { query?: QueryBooksDto }) {
  const { data, isLoading } = useQuery({
    queryKey: BOOK_QUERY_KEYS.GET_BOOKS(query),
    queryFn: () => getBooks(query),
  });

  return { data, isLoading };
}
