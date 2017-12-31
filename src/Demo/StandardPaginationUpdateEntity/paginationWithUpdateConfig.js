import { createPaginator } from './../../pagination-lib/createPaginator';
import { normalize, schema } from 'normalizr';
import { globalEntitiesActionNames } from './store/updateElement';
import { provider } from '../ExaminationsGenerator';

export const ELEMENTS_PER_PAGE = 15;

const callExaminationsApi = (page, requestParams, dispatch) => {
  const { searchPhrase } = requestParams;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serverResponse = provider.getExaminationsPage(page, ELEMENTS_PER_PAGE, searchPhrase);
      const formattedResponse = normalizeResponse(serverResponse);
      dispatch({
        type: globalEntitiesActionNames.entitiesAdded,
        entities: formattedResponse.entities
      });
      const ress = {
        totalElements: formattedResponse.totalElements,
        elements: formattedResponse.elements,
        entities: []
      };
      resolve(ress);
    }, 2000);
  });
};

const examination = new schema.Entity('examinations');
const responseSchema = new schema.Object({ elements: new schema.Array(examination) });

const normalizeResponse = serverResponse => {
  const normalizedData = normalize(serverResponse, responseSchema);
  const notNullEntities = normalizedData.entities.examinations ? normalizedData.entities.examinations : [];
  return {
    totalElements: serverResponse.totalElements, //liczba elementów dla danych parametrów wyszukiwania (searchParams)
    elements: normalizedData.result.elements, //idki elementów dla danych parametrów wyszukiwania (page + searchParams)
    entities: notNullEntities //znormalizowane parametry z listy powyżej
  };
};

const searchParamsInitState = { searchPhrase: '' };

//default config below
const config = {
  refreshResultInBackground: false,
  timeToRefresh: 1000, //[ms]
  searchHistoryLength: 5,
  elementsPerPage: ELEMENTS_PER_PAGE
};

const examinationsPaginator = createPaginator('update', callExaminationsApi, config, searchParamsInitState);

export const paginatorStoreName = examinationsPaginator.storeName;

//export used methods
export const loadExaminationsPage = examinationsPaginator.requestPage;
export const paginationUpdateReducers = examinationsPaginator.reducers;
export const paginationUpdateStoreName = examinationsPaginator.storeName;
export const updateSearchParams = examinationsPaginator.updateSearchParams;

export const setCurrentPage = examinationsPaginator.setCurrentPage;
export const getCurrentPage = examinationsPaginator.selectors.getCurrentPage;

//selectors:
export const getTotalElements = examinationsPaginator.selectors.getTotalElements;
export const getPage = examinationsPaginator.selectors.getPageNormalized;
export const getSearchParams = examinationsPaginator.selectors.getSearchParams;
