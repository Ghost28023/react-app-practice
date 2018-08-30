import React, { Component } from 'react';
import axios from 'axios';
import VideolistItem1 from '../VideolistItem/VideolistItem1';
import $ from "jquery";
//import gapi from 'https://apis.google.com/js/platform.js?onload=onLoadCallback';

var gapi;
var GoogleAuth;

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {

      gapi.client.init({
          'clientId': 'AIzaSyCkpbnlEFqCFGt5XzlXiG_R6dJhKva638c',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
          'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
      }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        setSigninStatus();

        $('#execute-request-button').click(function() {
          handleAuthClick(event);
        });
      });
    }

    function handleAuthClick(event) {
        GoogleAuth.signIn();
      }

      function setSigninStatus() {
        var user = GoogleAuth.currentUser.get();
        var isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
        if (isAuthorized) {
          defineRequest();
        }
      }

      function updateSigninStatus(isSignedIn) {
        setSigninStatus();
      }

      function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

  function removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function executeRequest(request) {
    request.execute(function(response) {
      console.log(response);
    });
  }

function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }
    executeRequest(request);
  }

  function defineRequest() {
    buildApiRequest('GET',
              '/youtube/v3/search',
              {'maxResults': '25',
               'part': 'snippet',
               'q': 'surfing',
               'type': ''})}

class Videolist extends Component {

  state = {
    apiUrl: 'https://www.googleapis.com/youtube/v3',
    apiKey: 'AIzaSyCkpbnlEFqCFGt5XzlXiG_R6dJhKva638c',
    video: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.apiUrl}/search?part=snippet
                                   &q={this.props.sText}
                                   &type=video
                                   &videoCaption=closedCaption
                                   &key={this.apiKey}`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

    render() {
        return (
          <div>
          {this.}
          {this.state.video.length > 0 ? (
        <VideolistItem1 video={this.state.video} />
      ) : null}
      </div>
        )
    }
}

export default Videolist;
