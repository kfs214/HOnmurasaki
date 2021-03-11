import { ADD_ITEM, UPDATE_ITEM } from "../actions";

let latestItemNo = 0;

const initialItem = {
  price: "",
  quantity: 1,
  volume: "",
  unitPrice: "",
  lowest: false,
};

const initialState = {
  items: { [++latestItemNo]: initialItem },
};

export const itemApp = (state = initialState, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case ADD_ITEM:
      return { items: { ...state.items, [++latestItemNo]: initialItem } };

    case UPDATE_ITEM:
      let newItemList = {
        ...state.items,
        ...action.data,
      };

      return {
        ...state,
        items: newItemList,
      };

    default:
      return state;
  }
};
