import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// TODO: just for testing
// import { fetchListVideos } from './actions/video_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  
  let store;
  
  if (window.currentUser) {
    const preloadedState = {
      entities: { users: { [window.currentUser.id]: window.currentUser }},
      session: { currentUserId: window.currentUser.id }
    };

    store = configureStore(preloadedState);

    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // TODO: just for testing
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.fetchListVideos = fetchListVideos;

  ReactDOM.render(<Root store={store} />, root);
});