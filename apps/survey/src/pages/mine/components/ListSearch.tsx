import { LIST_SEARCH_PARAM_KEY } from '@/constant/constant.mjs';
import { Input } from 'antd';
import { useState, type ChangeEvent, type FC } from 'react';
import { useSearchParams } from 'react-router';
import style from './list-search.module.scss';

interface ListSearchProps {
  className?: string;
}

export const ListSearch: FC<ListSearchProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get(LIST_SEARCH_PARAM_KEY) ?? '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSearch = (value: string) => {
    setSearchParams({ [LIST_SEARCH_PARAM_KEY]: value });
  };

  return (
    <Input.Search
      className={`${style.container} ${className ?? ''}`}
      size="large"
      placeholder="输入关键字"
      allowClear={true}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    ></Input.Search>
  );
};
