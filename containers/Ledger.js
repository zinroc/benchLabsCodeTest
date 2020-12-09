import styled from "@emotion/styled";
import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from "../redux/modules/main";

import { fetchTransactions } from "../api/bench";

const Table = styled.div``;

const TableRow = styled.div`
  padding: 25px;
  background-color: ${({ isHeader }) => (isHeader ? "white" : "#ebebeb")};
  color: ${({ isHeader }) => (isHeader ? "#2f9685" : "black")};
  font-weight: ${({ isHeader }) => (isHeader ? "600" : "400")};
  border: 1px solid #d1d1d1;
  display: flex;
  margin-top: -1px;
  hover {
    color: #2f9685;
  }
`;

const TableRowEntry = styled.div`
  width: ${({ width }) => width};
  display: inline-flex;
`;

const Ledger = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.main.loading);
  const transactions = useSelector((state) => state.main.transactions);
  const totalCount = useSelector((state) => state.main.totalCount);
  const sum = useSelector((state) => state.main.sum);

  const fetchTransactionsWrapper = async ({ page }) => {
    dispatch({ type: FETCH_TRANSACTIONS_START, page });
    try {
      // axios returns body in response.data.
      const { data } = await fetchTransactions({ page });
      dispatch({
        type: FETCH_TRANSACTIONS_SUCCESS,
        ...data,
      });
    } catch (error) {
      dispatch({ type: FETCH_TRANSACTIONS_FAILURE, error });
    }
  };

  useEffect(() => {
    // make the first call to find out information about the # of more calls that need to be made to get the full list
    fetchTransactionsWrapper({ page: 1 });
  }, []);

  useEffect(() => {
    // make the rest of the calls for the remaining pages
    // @TODO consider adding a pagination UI for cases that have too many entries
    if (totalCount !== 0) {
      const numPages = Math.ceil(totalCount / transactions.length);
      for (let i = 1; i < numPages; i += 1) {
        const pageNumber = i + 1;
        fetchTransactionsWrapper({ page: pageNumber });
      }
    }
  }, [totalCount]);

  return (
    <Table>
      <TableRow isHeader>
        <TableRowEntry width="10%">Date</TableRowEntry>
        <TableRowEntry width="40%">Company</TableRowEntry>
        <TableRowEntry width="40%">Account</TableRowEntry>
        <TableRowEntry width="10%">
          {sum < 0
            ? sum.toLocaleString("en-IN").replace("-", "-$")
            : "$".concat(sum.toLocaleString("en-IN"))}
        </TableRowEntry>
      </TableRow>
      {transactions.map((t) => (
        <TableRow key={t.id}>
          <TableRowEntry width="10%">
            {moment(t.Date).format("MMM Do, YYYY")}
          </TableRowEntry>
          <TableRowEntry width="40%">{t.Company}</TableRowEntry>
          <TableRowEntry width="40%">{t.Ledger}</TableRowEntry>
          <TableRowEntry width="10%">{t.Amount}</TableRowEntry>
        </TableRow>
      ))}
      {loading.length ? "...Loading" : ""}
    </Table>
  );
};

export default Ledger;
