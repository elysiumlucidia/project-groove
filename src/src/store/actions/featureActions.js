export const createFeature = (feature) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('features').add({
      ...feature,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_FEATURE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_FEATURE_ERROR' }, err);
    });
  };
};

export const updateFeature = (feature) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const docRef = firestore.collection('features').doc(feature.id);
    docRef.get().then(() => {
      const doc = {
        ...feature,
      };
      docRef.update(doc);
      dispatch({ type: 'UPDATE_FEATURE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_FEATURE_ERROR' }, err);
    });
  };
};

export const moveFeatureNode = (feature) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const docRef = firestore.collection('features').doc(feature.id);
    docRef.get().then(() => {
      const doc = {
        ...feature,
        modifiedByFirstName: profile.firstName,
        modifiedByLastName: profile.lastName,
        modifiedById: authorId,
        modifiedAt: new Date()
      };
      docRef.update(doc);
      dispatch({ type: 'UPDATE_FEATURE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_FEATURE_ERROR' }, err);
    });
  };
};