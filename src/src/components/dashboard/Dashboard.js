import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

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

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications, classes } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} classes={classes} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
  };
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);
