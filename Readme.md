# Redux-cached-pagination

Simplify and store pagination in react-redux applications

## Installation

```
npm install redux-cached-pagination --save
```

## Features

`Redux-cached-pagination` is a set of action creators and reducers to easily improve quality of pagination in your react-redux application.
Simple configuration gives you possibility to achieve advanced pagination features:

* extremely improved pagination UI user experience
* storing normalized data in Redux
* caching pages based on search filters
* simplified react-virtualized list usage
* refreshing results in background
* storing last visited page and used filters
  Demo page implements all above features.

## Demo

Demo is available at [DEMO](https://tranzystor.github.io/redux-cached-pagination/)

To run demo locally:

```
npm run start
```

## Usage

`Redux-cached-pagination` depends on redux and redux-thunk. You should look at the Demo folder before trying to use this.
In order to use `redux-cached-pagination` you have to implement fetching method with signature like that:

```
const callExaminationsApi = (page, requestParams) => {
  const { searchPhrase } = requestParams;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serverResponse = provider.getExaminationsPage(page, ELEMENTS_PER_PAGE, searchPhrase);
      const formattedResponse = normalizeResponse(serverResponse);
      resolve(formattedResponse);
    }, 1500);
  });
};
```

`page` - number of required page
`requestParams` - fully customizable search parameters

Fetching method should return Promise because managing state is based on that.

Fetching method has to return normalized data which is stored efficiently in Redux. It returns object with required fields:

* `totalElements` - the number of all rows
* `elements` - list of elements for current request params. it's normalized
* `entities` - not null entities for current request params

To get more info about normalization visit: https://github.com/paularmstrong/normalizr

In order to create paginator use 'createPaginator' method with arguments:

* `actionNamePrefix` - prefix of generated redux actions
* `callExaminationApi` - function which fetch data from server
* `config` - simple configuration explained below. If null, default config provided
* `searchParamsInitState` - default request params stored in reducer

Default pagination config looks the same as:

```
const config = {
    refreshResultInBackground: true,
    timeToRefresh: 5000,
    searchHistoryLength: 5,
    elementsPerPage: 30,
};
```

* `refreshResultInBackground` - on/off refreshing search results in background
* `timeToRefresh` - if search result is older than given time and user call the same page again it would be refreshed
* `searchHistoryLength` - determines how many search results are memoized
* `elementsPerPage` - determines length of single page

`Redux-cached-pagination` provides reducers thus it's required to connect with redux store:

```
import { paginationReducers, paginationStoreName } from './paginationConfig';
const rootReducer = combineReducers({
    [paginationStoreName]: paginationReducers
});
```

created paginator instance provides set of selectors which help you to use `redux-cached-pagination` in several use cases.

## API

Paginator instance provides:

* `requestPage(page, searchParams)` - the most important function which executes pagination logic. Call this method when page in cache is/will be needed.
  Page param is a number of required page. searchParams is object which would be passed to fetching method and used to store data in cache. Used in standard
  pagination case only.
* `reducers` - it has to be added to combineReducers method (explained above)
* `examsStoreName` - reducer name (used in combineReducers method)
* `updateSearchParams`, `getSearchParams` - store your searchParams in redux. It helps to recover list state. Calling updateSearch doesn't call fetching method.

* `setCurrentPage`, `getCurrentPage` - store chosen page number in redux. Call this method to store page number in redux. It's used only in standard pagination case.

* `getPaginationParams`, `updatePaginationParams` - redux slice used to store another parameters connected with pagination. It's a place to store custom data. In DEMO application (virtual case) this method is used to store selected row index.

* `getTotalElements` - selector provides total elements count for current search params.
* `getPage` - selector provides page content by given page number. If page doesn't exist, it returns null and doesn't fetch page.

## Standard pagination demo

At first glance it seems to be extremely simple feature but navigation back to the previous page doesn't call fetching method so content is displayed immediately.
It's possible to refresh data in the background. Search list state is stored in redux so navigation doesn't clean search phrase and selected page.

## Standard pagination with entity update

The same example as above but in this case custom reducer is provided. This kind of solution allows to add own actions on entities like updating single entity.

## Virtualized pagination

Additional layer to `react-virtualized` list control.

## License

`redux-cached-pagination` is available under MIT License.
