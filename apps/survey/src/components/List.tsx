import type { ListResponse } from '@/api/common.types.mts';
import { LIST_SEARCH_PAGE, LIST_SEARCH_PAGE_SIZE } from '@/constant/url-search-key.mts';
import { useRequest } from 'ahooks';
import { Empty, Space, Spin } from 'antd';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import style from './list.module.scss';
import { LoadMore } from './LoadMore';
import { Pagination } from './Pagination';

interface ListProps<D> {
  children: (item: D, index: number) => ReactNode;
  loadData: (page: number, pageSize: number) => Promise<ListResponse<D> | undefined>;
  // 上拉加载形式配置，无配置则默认为分页形式
  loadMoreOptions?: {
    page: number;
    pageSize: number;
  };
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function List<D extends any>({
  children,
  loadData,
  loadMoreOptions,
}: ListProps<D>): ReactNode {
  const pageInfoRef = useRef(loadMoreOptions);
  const dataListRef = useRef<D[] | null>(null);

  // 是否是加载更多形式
  const isLoadMoreMode = !!loadMoreOptions;
  // 组件第一次请求数据需要显示loading，后续都以蒙层替代
  const [initialized, setInitialized] = useState(false);
  // 路由参数
  const [searchParams] = useSearchParams();

  // 数据加载成功的回调
  const handleDataLoadSuccess =
    loadMoreOptions || !initialized
      ? (data?: ListResponse<D>) => {
          if (!initialized) {
            setInitialized(true);
          }

          if (data) {
            dataListRef.current = [...(dataListRef.current ?? []), ...data.list];

            if (dataListRef.current.length > data.list.length) {
              mutate({
                list: dataListRef.current,
                total: data.total,
              });
            }
          }
        }
      : undefined;

  const {
    data = { list: [], total: 0 },
    loading,
    run: _loadData,
    mutate,
  } = useRequest(loadData, {
    manual: isLoadMoreMode,
    refreshDeps: [searchParams],
    onSuccess: handleDataLoadSuccess,
  });

  useEffect(() => {
    if (pageInfoRef.current) {
      const { page, pageSize } = pageInfoRef.current;
      _loadData(page, pageSize);
    }
  }, [_loadData]);

  const handleLoadMore = useCallback(() => {
    if (pageInfoRef.current) {
      pageInfoRef.current.page += 1;
      const { page, pageSize } = pageInfoRef.current;
      _loadData(page, pageSize);
    }
  }, [_loadData]);

  const page = +(searchParams.get(LIST_SEARCH_PAGE) ?? 1);
  const pageSize = +(searchParams.get(LIST_SEARCH_PAGE_SIZE) ?? 10);
  const { list, total } = data;
  const hasMore = page * pageSize < total;
  return (
    <>
      <Space orientation="vertical" className={style.space}>
        {!initialized ? (
          loading && (
            <Spin size="large" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />
          )
        ) : list.length === 0 ? (
          <Empty />
        ) : (
          list.map(children)
        )}
      </Space>
      {isLoadMoreMode ? (
        hasMore && <LoadMore onLoad={handleLoadMore} />
      ) : (
        <Pagination className={style.footer} current={page} pageSize={pageSize} total={total} />
      )}
    </>
  );
}
