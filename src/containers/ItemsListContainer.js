import { connect } from "react-redux";
import ItemsList from "../components/ItemsList";
import { updateItem } from "../actions";

const mapStateToProps = (state) => ({
  items: state.items,
});

const ItemsListContainer = connect(mapStateToProps, { updateItem })(ItemsList);

export default ItemsListContainer;
