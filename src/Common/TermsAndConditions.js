import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function TermsAndConditions() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("terms_agreement") === null) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [show]);

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("terms_agreement", true);
    setShow(false);
  };

  return (
    <Modal size="md" centered show={show}>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Modal.Header className="bg-dark">
          <Modal.Title className="text-white">
            Welcome To Chatterley
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <h6>Agreement</h6>
          <h2 className="mb-2">Terms and Conditions</h2>
          <p>
            Welcome to Chatterley! Thank you for checking out the project new
            features will be implemented in the future! For the sake of the
            project and demonstration purposes please input valid messages and
            room names, no gibbersish. Enjoy!
          </p>
          <Form.Group className="mt-5 mb-3">
            <Form.Check
              required
              type="checkbox"
              name="agreement"
              label="I Agree to the terms and conditions"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">I Agree.</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TermsAndConditions;
