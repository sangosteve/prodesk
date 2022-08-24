import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  border-radius: 50%;
`;

const ProfileImage = ({ source }) => {
  return <StyledImage src={source} />;
};

export default ProfileImage;
