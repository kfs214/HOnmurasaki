import React from "react";
import { Jumbotron, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import funchan from "../funchan-best.png";

const Item = ({ itemKey, item, lowest, updateItem }) => {
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
    updateItem({
      [itemKey]: { ...newItem, unitPrice },
    });
  };

  const getFormControl = ({ key, label }) => (
    <FormControl
      value={item[key]}
      type="number"
      placeholder={label}
      aria-label={label}
      onChange={(e) => handleUpdateItem(key, e.target.value)}
    />
  );

  return (
    <Jumbotron>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text className="px-1">¥</InputGroup.Text>
        </InputGroup.Prepend>

        {getFormControl({ key: "price", label: "価格" })}

        <InputGroup.Text className="px-1">÷</InputGroup.Text>
        <InputGroup.Text className="px-1">{"("}</InputGroup.Text>

        {getFormControl({ key: "volume", label: "量" })}

        <InputGroup.Text className="px-1">×</InputGroup.Text>
        {getFormControl({ key: "quantity", label: "数" })}

        <InputGroup.Text className="px-1">{")"}</InputGroup.Text>
      </InputGroup>

      <Row>
        {lowest ? (
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
