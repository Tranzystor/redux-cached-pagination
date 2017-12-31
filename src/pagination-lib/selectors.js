import { buildUniqueKey } from './utils';

export const getTotalElements = (sliceName) => (store, searchParams) => {
    const currentStore = store[sliceName];
    const validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
    const filtersKey = buildUniqueKey(validatedSearchParams);

    if (currentStore && currentStore.pagination[filtersKey]) {
        const elementsCount = currentStore.pagination[filtersKey].elementsCount;
        return elementsCount ? elementsCount : 0;
    }
    return 0;
}

export const getPage = (sliceName, normalized) => (store, page, searchParams) => {
    const currentStore = store[sliceName];
    const validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
    const filtersKey = buildUniqueKey(validatedSearchParams);
    if (currentStore && currentStore.pagination[filtersKey]) {
        const foundPage = currentStore.pagination[filtersKey].pages[page];

        if (foundPage && !normalized) {
            const loadedElements = foundPage.elements.map(x => {
                return currentStore.entities[x];
            })
            return { ...foundPage, elements: loadedElements };
        }
        return foundPage;
    }
    return null;
}

export const getElementByTotalIndex = (sliceName, elementsPerPage) => (store, totalIndex, searchParams) => {
    const pageNum = Math.floor(totalIndex / elementsPerPage) + 1;
    const currentStore = store[sliceName];
    const validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
    const page = getPage(sliceName)(store, pageNum, validatedSearchParams);
    if (page) {
        const { elements, ...rest } = page;
        if (page.elements) {
            const elementIndex = totalIndex % elementsPerPage;
            const element = page.elements[elementIndex];
            return { ...element, ...rest };
        }
        return rest;
    }
    return null;
}

export const getPaginationParams = (sliceName) => (store) => {
    const currentStore = store[sliceName];
    return currentStore.paginationParams;
}

export const getSearchParams = (sliceName) => (store) => {
    const searchParams = store[sliceName].searchParams;
    return searchParams;
}

export const getCurrentPage = (sliceName) => (store) => {
    const currentPage = store[sliceName].currentPage;
    return currentPage;
}