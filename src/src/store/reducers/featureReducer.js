const initState = {};

const featureReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_FEATURE_SUCCESS':
      console.log('create feature success');
      return state;
    case 'CREATE_FEATURE_ERROR':
      console.log('create feature error');
      return state;
    default:
      console.log(action.type, ' is not a recognized action type');
      return state;
  }
};

export default featureReducer;