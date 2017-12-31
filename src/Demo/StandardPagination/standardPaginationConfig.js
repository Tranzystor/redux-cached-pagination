import { createPaginator } from './../../pagination-lib/createPaginator';
import { normalize, schema } from 'normalizr';
import { provider } from '../ExaminationsGenerator';

export const ELEMENTS_PER_PAGE = 15;

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

const examination = new schema.Entity('examinations');
const responseSchema = new schema.Object({ elements: new schema.Array(examination) });

const normalizeResponse = serverResponse => {
  const normalizedData = normalize(serverResponse, responseSchema);
  const notNullEntities = normalizedData.entities.examinations ? normalizedData.entities.examinations : [];
  return {
    totalElements: serverResponse.totalElements, 
    elements: normalizedData.result.elements, 
    entities: notNullEntities
  };
};

const searchParamsInitState = { searchPhrase: '' };

//default config below
const config = {
  refreshResultInBackground: true,
  timeToRefresh: 1000, //[ms]
  searchHistoryLength: 5,
  elementsPerPage: ELEMENTS_PER_PAGE
};

const examinationsPaginator = createPaginator(
  'standard',
  callExaminationsApi,
  config,
  searchParamsInitState
);

export const paginatorStoreName = examinationsPaginator.storeName;

//export used methods
export const loadExaminationsPage = examinationsPaginator.requestPage;
export const examsPaginatorReducers = examinationsPaginator.reducers;
export const examsStoreName = examinationsPaginator.storeName;
export const updateSearchParams = examinationsPaginator.updateSearchParams;

export const setCurrentPage = examinationsPaginator.setCurrentPage;
export const getCurrentPage = examinationsPaginator.selectors.getCurrentPage;

//selectors:
export const getTotalElements = examinationsPaginator.selectors.getTotalElements;
export const getPage = examinationsPaginator.selectors.getPage;
export const getSearchParams = examinationsPaginator.selectors.getSearchParams;
