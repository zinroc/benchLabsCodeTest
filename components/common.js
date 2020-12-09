import styled from "@emotion/styled";

export const Header = styled.div`
  background-color: #2f9685;
  text-align: center;
  width: 100%;
  color: white;
  padding: 10px;
  font-weight: 500;
  cursor: default;
  position: fixed;
  justify-content: space-around;
  display: flex;
  padding: 50px;
  :hover {
    color: lightblue;
  }
`;

export const Spacer = styled.div`
  height: ${({ height }) => (height ? height : "0px")};
`;

export const Margin = styled.div`
  margin-top: ${({ top }) => (top ? top : "0px")};
  margin-left: ${({ left }) => (left ? left : "0px")};
  margin-right: ${({ right }) => (right ? right : "0px")};
  margin-bottom: ${({ bottom }) => (bottom ? bottom : "0px")};
`;

export const Error = styled.div`
  color: red;
`;

export default {};
