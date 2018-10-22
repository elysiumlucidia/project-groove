import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const FeatureSummary = ({ feature, classes }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {moment(feature.createdAt.toDate()).calendar()}
        </Typography>
        <Typography variant="h5" component="h2">
          {feature.title}
        </Typography>
        <Typography component="p">
          creator: {feature.authorFirstName} {feature.authorLastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={'/feature/' + feature.id} key={feature.id} size="small">Learn More</Button>
      </CardActions>
    </Card>

  );
};

export default (FeatureSummary);
