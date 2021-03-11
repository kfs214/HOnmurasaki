// action types
export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";

// actions
export const addItem = () => ({
  type: ADD_ITEM,
});

export const updateItem = (data) => ({
  type: UPDATE_ITEM,
  data,
});
