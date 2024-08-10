import { useMemo } from "react";

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 2,
  currentPage,
  totalPage
}) => {
  const paginationRange = useMemo(() => {
    // const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageCount = totalPage;


    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
	
    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    // const shouldShowLeftDots = leftSiblingIndex > 2;
    // const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 3;

    const firstPageIndex = 1;
    const PageIndex2 = 2;
    const PageIndex3 = 3;
    const lastPageIndex = totalPageCount;
    const  lastPageIndex2=totalPageCount - 1;
    const lastPageIndex3= totalPageCount - 2;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      // let leftRange = range(1, leftItemCount);
      console.log(`setp = 2`);

      return [...leftRange, DOTS,lastPageIndex3, lastPageIndex2, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      console.log(`setp = 3`);

      return [firstPageIndex,PageIndex2,PageIndex3, DOTS, ...rightRange];
    }
     
    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      console.log(`setp = 3`);

      return [firstPageIndex,PageIndex2,PageIndex3, DOTS, ...middleRange, DOTS,lastPageIndex3, lastPageIndex2,lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage, totalPage]);

  return paginationRange;
};