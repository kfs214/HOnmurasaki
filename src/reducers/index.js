import { ADD_ITEM, UPDATE_ITEM } from "../actions";

let latestItemNo = 0;

const initialItem = {
  price: "",
  quantity: 1,
  volume: "",
  unitPrice: "",
};

const initialState = {
  lowestUnitCost: 0,
  items: { [latestItemNo]: initialItem },
};

export const itemApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: { ...state.items, [++latestItemNo]: initialItem },
      };

    case UPDATE_ITEM:
      const newItemList = {
        ...state.items,
        ...action.data,
      };

      const unitCosts = Object.keys(newItemList)
        .map((key) => newItemList[key].unitPrice)
        .filter(
          (unitCost) => unitCost > 0 || unitCost === 0 || unitCost === "0"
        );

      const lowestUnitCost = Math.min(...unitCosts);

      return {
        lowestUnitCost,
        items: newItemList,
      };

    default:
      return state;
  }
};
