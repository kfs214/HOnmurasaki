import React from "react";
import PropTypes from "prop-types";
import { Jumbotron, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import funchan from "../funchan-best.png";

const Item = ({ price, quantity, volume, unitPrice, lowest }) => (
  <Jumbotron>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text className="px-1">¥</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        value={price}
        type="number"
        placeholder="価格"
        aria-label="価格"
      />

      <InputGroup.Text className="px-1">÷</InputGroup.Text>
      <InputGroup.Text className="px-1">{"("}</InputGroup.Text>

      <FormControl
        value={quantity}
        type="number"
        placeholder="量"
        aria-label="量"
      />

      <InputGroup.Text className="px-1">×</InputGroup.Text>
      <FormControl
        value={volume}
        type="number"
        placeholder="数"
        aria-label="数"
      />

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
      <Col xs={3}>@ {unitPrice}</Col>
    </Row>
  </Jumbotron>
);

Item.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  lowest: PropTypes.bool.isRequired,
};

export default Item;
