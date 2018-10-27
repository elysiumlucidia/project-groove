import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';
import { getFlatDataFromTree } from 'react-sortable-tree';
import { getTreeFromFlatData } from 'react-sortable-tree';
import { updateFeature, moveFeatureNode } from '../../store/actions/featureActions';


class ProjectDetails extends Component {

  handleToggle = (e) => {

    console.log(this.props.auth);
    console.log(e);

    const feature = {
      id: e.node.id,
      expanded: e.expanded
    };

    this.props.updateFeature(feature);

  }

  handleMoveNode = (e) => {
    console.log(e);

    const feature = {
      id: e.node.id,
      parent: e.nextParentNode.id
    };

    this.props.moveFeatureNode(feature);

  }

  render() {
    const { project, auth, id, treeData } = this.props;

    const flatData = getFlatDataFromTree({
      treeData: treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }) => ({
      id: node.id,
      name: node.name,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));

    if (!auth.uid) return <Redirect to='/signin' />;
    if (project) {
      return (
        <div className="container section project-details">
          <div style={{ height: 600 }}>
            <SortableTree
              treeData={treeData}
              onChange={treeData => this.setState({ treeData })}
              onMoveNode={this.handleMoveNode}
              onVisibilityToggle={this.handleToggle}
            />
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title} {id}</span>
              <p>{project.content}</p>s
          </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
          <hr />
          ↓This flat data is generated from the modified tree data↓
        <ul>
            {flatData.map(({ id, name, parent }) => (
              <li key={id}>
                id: {id}, name: {name}, parent: {parent || 'null'}
              </li>
            ))}
          </ul>
        </div>
      );

    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

const convertToTreeData = (features) => {

  if (features) {
    const flatData = [];

    Object.keys(features).map(key => {
      flatData.push({ id: key, ...features[key] });
      return flatData;
    });

    const treeData = getTreeFromFlatData(
      {
        flatData: flatData.map(node => ({ ...node })),
        getKey: node => node.id,
        getParentKey: node => node.parent,
        rootKey: "",
      }
    );

    console.log(treeData);
    return treeData;
  }

  return [];

};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  const features = state.firestore.data.features;
  const treeData = convertToTreeData(features);
  return {
    id: id,
    project: project,
    auth: state.firebase.auth,
    treeData: treeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFeature: (feature) => dispatch(updateFeature(feature)),
    moveFeatureNode: (feature) => dispatch(moveFeatureNode(feature))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'projects',
  }]),
  firestoreConnect([{
    collection: 'features',
  }])
)(ProjectDetails);
