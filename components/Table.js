import styled from "@emotion/styled";

import colors from "../constants/colors";

export const Table = styled.div``;

export const TableRow = styled.div`
  padding: 25px;
  background-color: ${({ isHeader }) =>
    isHeader ? "white" : colors.lightgrey};
  color: ${({ isHeader }) => (isHeader ? colors.green : "black")};
  font-weight: ${({ isHeader }) => (isHeader ? "600" : "400")};
  border: 1px solid ${colors.grey};
  display: flex;
  margin-top: -1px;
  :hover {
    color: ${colors.green};
  }
`;

export const TableRowEntry = styled.div`
  width: ${({ width }) => width};
  display: inline-flex;
`;

export default Table;
