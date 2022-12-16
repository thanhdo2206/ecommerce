import React from "react";
import { Col, Row, Card } from "@themesberg/react-bootstrap";

import { useSelector } from "react-redux";

export const ProfileCardWidget = () => {
  const userLogin = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Card border="light" className="text-center p-0 mb-4">
      {/* <div
        style={{ backgroundImage: `url(./img/profile-cover.jpg)` }}
        className="profile-cover rounded-top"
      /> */}
      <Card.Body className="pb-5 card_profile" >
        <Card.Img
          src={userLogin.avatar}
          alt="Neil Portrait"
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
          
        />
        <Card.Title>{userLogin.user_name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export const CardWidget = (props) => {
  const { title, value } = props;

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-flex align-items-center text-center">
          <Col xs={12} xl={12} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{title}</h5>
              <h3 className="mb-1">{value}</h3>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
