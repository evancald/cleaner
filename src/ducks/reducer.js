const initialState = {
  username: '',
  profilePicture: ''
}

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PROFILEPIC = 'UPDATE_PROFILEPIC';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USERNAME:
      return Object.assign({}, state, { username: action.payload});
    case UPDATE_PASSWORD:
      return Object.assign({}, state, { password: action.payload });
    case UPDATE_PROFILEPIC:
      return Object.assign({}, state, { profilePicture: action.payload });
    default:
      return state;
  }
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    payload: username
  }
}

export function updateProfilePicture(profilePicture) {
  return {
    type: UPDATE_PROFILEPIC,
    payload: profilePicture
  }
}

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  }
}

export default reducer;