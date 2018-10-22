import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/" className="brand-logo">Featurator</Button>
        {links}
      </Toolbar>
    </AppBar>
  );
};


const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
