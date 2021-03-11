import React from "react";
import { Jumbotron, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import funchan from "../funchan-best.png";

const Item = ({ itemKey, item, updateItem }) => {
  const handleUpdateItem = (attribute, value) => {
    const newItem = {
      ...item,
      [attribute]: value,
    };
    const unitPrice = newItem.price
      ? Math.ceil(
          (newItem.price * 100) /
            ((newItem.volume || 1) * (newItem.quantity || 1))
        ) / 100
      : "";
    console.log(newItem.price, newItem.volume || 1, newItem.quantity || 1);
    updateItem({
      [itemKey]: { ...newItem, unitPrice },
    });
  };

  return (
    <Jumbotron>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text className="px-1">¥</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={item.price}
          type="number"
          placeholder="価格"
          aria-label="価格"
          onChange={(e) => handleUpdateItem("price", e.target.value)}
        />

        <InputGroup.Text className="px-1">÷</InputGroup.Text>
        <InputGroup.Text className="px-1">{"("}</InputGroup.Text>

        <FormControl
          value={item.volume}
          type="number"
          placeholder="量"
          aria-label="量"
          onChange={(e) => handleUpdateItem("volume", e.target.value)}
        />

        <InputGroup.Text className="px-1">×</InputGroup.Text>
        <FormControl
          value={item.quantity}
          type="number"
          placeholder="数"
          aria-label="数"
          onChange={(e) => handleUpdateItem("quantity", e.target.value)}
        />

        <InputGroup.Text className="px-1">{")"}</InputGroup.Text>
      </InputGroup>

      <Row>
        {item.lowest ? (
          <Col xs={3}>
            <img style={{ height: "2em" }} src={funchan} alt="lowest" />
          </Col>
        ) : (
          ""
        )}
        <Col />
        <Col xs={3}>@ {item.unitPrice}</Col>
      </Row>
    </Jumbotron>
  );
};

export default Item;
