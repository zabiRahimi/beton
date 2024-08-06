import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import '../../../css/pagination.css';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    totalPage,
  } = props;
  // console.log(pageSize);
  // console.log(`totalCuont = ${totalCount}`);
  // console.log(`siblingCount = ${siblingCount}`);
  // console.log(`currentPage = ${currentPage}`);
  // console.log(`pageSize = ${pageSize}`);
  // console.log(`totalPage = ${totalPage}`);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPage
  });
  // console.log(`paginationRange.length = ${paginationRange.length}`);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    // <ul
    //   className='pagination-container'
    // >
    //   <li
    //     // className={classnames('pagination-item', {
    //     //   disabled: currentPage === 1
    //     // })}
    //     className='pagination-item'
    //     onClick={onPrevious}
    //   >
    //     <div className="arrow left" />
    //   </li>
    //   <li className='pagination-item'>1</li>
    //   <li className='pagination-item'>2</li>
    //   <li className='pagination-item'>3</li>
    //   <li className='pagination-item'>4</li>
    //   {/* {paginationRange.map(pageNumber => {
    //     if (pageNumber === DOTS) {
    //       return <li className="pagination-item dots">&#8230;</li>;
    //     }

    //     return (
    //       <li
    //         className={classnames('pagination-item', {
    //           selected: pageNumber === currentPage
    //         })}
    //         onClick={() => onPageChange(pageNumber)}
    //       >
    //         {pageNumber}
    //       </li>
    //     );
    //   })} */}
    //   <li
    //     // className={classnames('pagination-item', {
    //     //   disabled: currentPage === lastPage
    //     // })}
    //     className='pagination-item'
    //     onClick={onNext}
    //   >
    //     <div className="arrow right" />
    //   </li>
    // </ul>
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={i}>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
            key={i}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
