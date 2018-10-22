import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import CreateFeature from '../features/CreateFeature';
import FeatureList from '../features/FeatureList';

const ProjectDetails = (props) => {
  const { project, auth, id } = props;
  if (!auth.uid) return <Redirect to='/signin' />;
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>s
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
        <FeatureList project={project} />
        <CreateFeature projectId={id} />
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    id: id,
    project: project,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails);
