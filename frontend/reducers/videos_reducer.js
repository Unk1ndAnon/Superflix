import { RECEIVE_VIDEO, RECEIVE_VIDEOS, CLEAR_VIDEOS } from '../actions/video_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(action);

  switch (action.type) {
    case RECEIVE_VIDEOS:
      return action.payload.videos;
    case RECEIVE_VIDEO:
      return merge({}, state, { [action.payload.video.id]: action.payload.video });
    case CLEAR_VIDEOS:
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default videosReducer;