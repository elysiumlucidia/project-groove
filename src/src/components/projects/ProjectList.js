import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({ projects, classes }) => {
  return (
    <div className="project-list section">
      {projects && projects.map(project => {
        return (
          <ProjectSummary project={project} classes={classes} key={project.id} />
        );
      })}
    </div>
  );
};
export default ProjectList;