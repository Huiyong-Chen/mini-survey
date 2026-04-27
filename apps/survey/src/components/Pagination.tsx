import { LIST_SEARCH_PAGE, LIST_SEARCH_PAGE_SIZE } from '@/constant/url-search-key.mts';
import { Pagination as AntPagination } from 'antd';
import { useSearchParams } from 'react-router';
interface PaginationProps {
  total?: number;
  current?: number;
  pageSize?: number;
}
export function Pagination({
  current = 1,
  pageSize = 10,
  total,
  className,
}: PaginationProps & { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set(LIST_SEARCH_PAGE, page.toString());
      prev.set(LIST_SEARCH_PAGE_SIZE, pageSize.toString());
      return prev;
    });
  };

  const _page = +(searchParams.get(LIST_SEARCH_PAGE) ?? current);
  const _pageSize = +(searchParams.get(LIST_SEARCH_PAGE_SIZE) ?? pageSize);
  return (
    <AntPagination
      className={className}
      current={_page}
      pageSize={_pageSize}
      total={total}
      onChange={handleChange}
    />
  );
}
