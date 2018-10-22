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