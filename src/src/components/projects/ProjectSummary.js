import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProjectSummary = ({ project, classes }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {project.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {moment(project.createdAt.toDate()).calendar()}
        </Typography>
        <Typography variant="h5" component="h2">
          {project.title}
        </Typography>
        <Typography component="p">
          creator: {project.authorFirstName} {project.authorLastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={'/project/' + project.id} key={project.id} size="small">Learn More</Button>
      </CardActions>
    </Card>

  );
};

export default (ProjectSummary);
