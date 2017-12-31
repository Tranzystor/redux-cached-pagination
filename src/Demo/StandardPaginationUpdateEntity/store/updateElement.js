import { getPage } from './../paginationWithUpdateConfig';
import { provider } from '../../ExaminationsGenerator';

export const globalEntitiesActionNames = {
  entitiesAdded: 'ENTITIES_ADDED',
  entityUpdating: 'ENTITY_UPDATING',
  entityUpdateSuccess: 'ENTITY_UPDATE_SUCCESS',
  entityUpdateFailure: 'ENTITY_UPDATE_FAILURE'
};

//action creator
export const updateEntities = (entityId, data) => dispatch => {
  dispatch({
    type: globalEntitiesActionNames.entityUpdating,
    id: entityId
  });

  const updatedEntity = provider.updateEntity(entityId, data);
  setTimeout(() => {
    const isResponseSuccessful = true;
    if (isResponseSuccessful) {
      dispatch({
        type: globalEntitiesActionNames.entityUpdateSuccess,
        id: entityId,
        data: updatedEntity
      });
    } else {
      dispatch({
        type: globalEntitiesActionNames.entityUpdateFailure,
        id: entityId
      });
    }
  }, 1500);
};

//reducer
export const globalExaminationsReducer = (state = {}, action) => {
  if (state[action.id]) {
    const { isUpdating, isUpdatingSuccess, isUpdatingFailure, ...clone } = state[action.id];
    switch (action.type) {
      case globalEntitiesActionNames.entityUpdating:
        return {
          ...state,
          [action.id]: { ...clone, isUpdating: true }
        };
      case globalEntitiesActionNames.entityUpdateSuccess:
        return {
          ...state,
          [action.id]: { ...action.data, isUpdatingSuccess: true }
        };
      case globalEntitiesActionNames.entityUpdateFailure:
        return {
          ...state,
          [action.id]: { ...clone, isUpdatingFailure: true }
        };
      default:
      //continue;
    }
  }
  switch (action.type) {
    case globalEntitiesActionNames.entitiesAdded:
      return {
        ...state,
        ...action.entities
      };
    default:
      return state;
  }
};

//selector - denormalize entities
export const getPageWithGlobalElements = (state, chosenPage) => {
  const pageWithoutData = getPage(state, chosenPage);

  if (pageWithoutData && pageWithoutData.elements) {
    const loadedElements = pageWithoutData.elements.map(x => {
      return state.globalEntities[x];
    });
    return { ...pageWithoutData, elements: loadedElements };
  }
  return pageWithoutData;
};
