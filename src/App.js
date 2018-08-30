import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Videolist from './videolist/videolist';
import Video from './video/video';
import Home from './index/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import ReactResource from 'react-resource';
import RaisedButton from 'material-ui/RaisedButton';

var ssText = '';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }



  state = {
    searchText: 'search',
    apiUrl: 'https://www.googleapis.com/youtube/v3',
    apiKey: 'AIzaSyCkpbnlEFqCFGt5XzlXiG_R6dJhKva638c',
  };

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <div>
              <TextField
                ref="myField"
                fullWidth={true}
                paddding='20px'
              />
              <Link to="/videolist">
                <RaisedButton
                  label="Search"
                />
              </Link>
            </div>
            <Route exact path="/" component={Home} />
              <Route path="/videolist" render={(props) => <Videolist {...props} sText={this.refs.myField.getValue()} />} />
            <Route path="/video" component={Video} />
          </div>
        </Router>
    </MuiThemeProvider>
    );
  }
}

export default App;
