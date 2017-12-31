import { createPaginator } from './../../pagination-lib/createPaginator';
import { normalize, schema } from 'normalizr';
import { provider } from '../ExaminationsGenerator';

export const ELEMENTS_PER_PAGE = 30;

const callExaminationsApi = (page, requestParams) => {
  const { searchPhrase } = requestParams;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serverResponse = provider.getExaminationsPage(page, ELEMENTS_PER_PAGE, searchPhrase);
      const formattedResponse = normalizeResponse(serverResponse);
      resolve(formattedResponse);
    }, 2000);
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

const searchParamsInitialState = { searchPhrase: '' };

const config = {
  refreshResultInBackground: true,
  timeToRefresh: 7000, //[ms]
  searchHistoryLength: 5,
  elementsPerPage: ELEMENTS_PER_PAGE
};

export const examinationsPaginator = createPaginator(
  'virtual',
  callExaminationsApi,
  config,
  searchParamsInitialState
);

//redux
export const examinationsStoreName = examinationsPaginator.storeName;
export const examinationsPaginatorReducers = examinationsPaginator.reducers;

export const updateSearchParams = examinationsPaginator.updateSearchParams;

//selectors:
export const getPaginationParams = examinationsPaginator.selectors.getPaginationParams;
export const getSearchParams = examinationsPaginator.selectors.getSearchParams;
export const getElementByTotalIndex = examinationsPaginator.selectors.getElementByTotalIndex;
