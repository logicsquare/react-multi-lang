const initialState = {
  currentLang: "en"
}

export const languageDataReducer = (
  state = initialState,
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case "UPDATE_CURRENT_LANGUAGE": {
      newState = {
        currentLang: action.payload.currentLang
      };
      break;
    }
    default: {
    }
  }
  return newState;
};
