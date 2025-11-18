import { Pagination, Select } from 'antd';
import { useState } from 'react';

type PaginationWrapperProps = {
  children: (props: {
    pageSize: number;
    setPageSize: (p: number) => void;
    currentPage: number;
    setCurrentPage: (p: number) => void;
    getPaginatedData: <T = any>(data: T[]) => T[];
  }) => React.ReactNode;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  total: number;
  disabled?: boolean;
};

const PaginationWrapper = ({
  children,
  defaultPageSize = 10,
  pageSizeOptions: defaultPageSizeOptions = [10, 25, 50, 75, 100],
  total,
  disabled,
}: PaginationWrapperProps) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSizeOptions = defaultPageSize
    ? Array.from({ length: 5 }, (_, i) => defaultPageSize * (i + 1))
    : defaultPageSizeOptions;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedData = <T = any,>(data: T[] = []) => {
    return data?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <>
      {children({
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        getPaginatedData,
      })}
      <br />
      <div className="flex items-center justify-center gap-3 dark:text-black">
        <p className="font-primary font-semibold">
          {total > 0
            ? `Showing ${startItem} to ${endItem} of ${total} rows`
            : 'No results'}
        </p>
        <div className="flex items-center justify-center -space-x-6">
          <Select
            disabled={disabled}
            value={pageSize}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
            options={pageSizeOptions.map((size) => ({
              value: size,
              label: size,
            }))}
            style={{ minWidth: 70 }}
          />

          <Pagination
            align="center"
            disabled={disabled}
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationWrapper;
