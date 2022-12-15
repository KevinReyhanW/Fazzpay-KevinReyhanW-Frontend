import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function Topup(props) {
  const [amount, setAmount] = useState(0);

  return (
    <Modal {...props} aria-labelledby="modalTopUp" centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="modalTopUp">Topup </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <h6 className="text-black-50">
          Enter the amount of money you want to TopUp
        </h6>
        <div className="d-flex justify-content-center">
          <Form.Control
            type="number"
            placeholder="________________"
            min="0"
            className="text-center my-3 text-black-50 fs-1 fw-bold rounded-pill"
            onChange={({ target }) => setAmount(target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={() => props.submit(amount)}
          className="p-2 px-4 rounded-pill"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
