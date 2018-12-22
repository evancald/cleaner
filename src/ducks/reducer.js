const initialState = {
  //Auth
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
  //Form inputs
  type: null,
  title: '',
  description: '',
  price: 0,
  address: '',
  city: '',
  usState: '',
  zip: '',
  photos: []
}

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PROFILEPIC = 'UPDATE_PROFILEPIC';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_TYPE = 'UPDATE_TYPE';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_PRICE = 'UPDATE_PRICE';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_USSTATE = 'UPDATE_USSTATE';
const UPDATE_ZIP = 'UPDATE_ZIP';
const CLEAR_INPUTS = 'CLEAR_INPUTS';
const RESET_STATE = 'RESET_STATE';
const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
const UPDATE_CONFIRM_PASSWORD = 'UPDATE_CONFIRM_PASSWORD';

function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USERNAME:
      return Object.assign({}, state, { username: action.payload});
    case UPDATE_EMAIL:
      return Object.assign({}, state, { email: action.payload});
    case UPDATE_PASSWORD:
      return Object.assign({}, state, { password: action.payload });
    case UPDATE_CONFIRM_PASSWORD:
      return Object.assign({}, state, { confirmPassword: action.payload});
    case UPDATE_PROFILEPIC:
      return Object.assign({}, state, { profilePicture: action.payload });
    case UPDATE_TYPE:
      return Object.assign({}, state, { type: action.payload });
    case UPDATE_TITLE:
      return Object.assign({}, state, { title: action.payload });
    case UPDATE_DESCRIPTION:
      return Object.assign({}, state, { description: action.payload });
    case UPDATE_PRICE:
      return Object.assign({}, state, { price: action.payload });
    case UPDATE_ADDRESS:
      return Object.assign({}, state, { address: action.payload });
    case UPDATE_CITY:
      return Object.assign({}, state, { city: action.payload });
    case UPDATE_USSTATE:
      return Object.assign({}, state, { usState: action.payload });
    case UPDATE_ZIP:
      return Object.assign({}, state, { zip: action.payload });
    case UPDATE_PHOTOS:
      return Object.assign({}, state, { photos: action.payload });
    case CLEAR_INPUTS:
      return Object.assign({}, state, action.payload);
    case RESET_STATE:
      return action.payload;
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

export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    payload: email
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

export function updateConfirmPassword(confirmPassword) {
  return {
    type: UPDATE_CONFIRM_PASSWORD,
    payload: confirmPassword
  }
}

export function updateType(type) {
  return {
    type: UPDATE_TYPE,
    payload: type
  }
}

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    payload: title
  }
}

export function updateDescription(description) {
  return {
    type: UPDATE_DESCRIPTION,
    payload: description
  }
}

export function updatePrice(price) {
  return {
    type: UPDATE_PRICE,
    payload: price
  }
}

export function updateAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    payload: address
  }
}

export function updateCity(city) {
  return {
    type: UPDATE_CITY,
    payload: city
  }
}

export function updateUsState(usState) {
  return {
    type: UPDATE_USSTATE,
    payload: usState
  }
}

export function updateZip(zip) {
  return {
    type: UPDATE_ZIP,
    payload: zip
  }
}

export function updatePhotos(photos) {
  return {
    type: UPDATE_PHOTOS,
    payload: photos
  }
}

export function clearInputs() {
  return {
    type: CLEAR_INPUTS,
    payload: {
      type: null,
      title: '',
      description: '',
      price: 0,
      address: '',
      city: '',
      usState: '',
      zip: '',
      photos: []
    }
  }
}

export function resetState() {
  return {
    type: RESET_STATE,
    payload: initialState
  }
}
export default reducer;