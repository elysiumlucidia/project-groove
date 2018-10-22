import React, { Component } from 'react';
import FeatureSummary from './FeatureSummary';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class FeatureList extends Component {
  render() {

    const { auth, features, classes } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;

    return (
      <div>
        {features && features.map(feature => {
          return (
            <FeatureSummary feature={feature} classes={classes} key={feature.id} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    features: state.firestore.ordered.features,
    auth: state.firebase.auth,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'features', orderBy: ['createdAt', 'desc'] },
  ])
)(FeatureList);