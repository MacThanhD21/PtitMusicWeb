module.exports = (currentPage, limitItem, query, totalItem) => {
    const displayPageNumber = 3
    let paginationObject = {
        currentPage: currentPage,
        limitItem: limitItem
    };

    if (query.page) {
        paginationObject.currentPage = parseInt(query.page);
    }

    paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limitItem;

    paginationObject.totalPage = Math.ceil(totalItem / paginationObject.limitItem);

    if (paginationObject.currentPage == 1) {
        paginationObject.startPage = 1;
        paginationObject.endPage = Math.min(paginationObject.totalPage, displayPageNumber);
    }
    else if (paginationObject.currentPage == paginationObject.totalPage) {
        paginationObject.startPage = Math.max(paginationObject.totalPage - displayPageNumber + 1, 1);
        paginationObject.endPage = paginationObject.totalPage;
    }
    else {
        paginationObject.startPage = paginationObject.currentPage - 1;
        paginationObject.endPage = paginationObject.currentPage + 1;
    }

    return paginationObject;
}