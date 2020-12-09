import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  INITIALIZE_LEDGER,
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
} from "../redux/modules/main";

import { fetchTransactions } from "../api/bench";

import dollar from "../utils/dollar";

import { Table, TableRow } from "../components/Table";
import LedgerRow from "../components/LedgerRow";

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

  // @TODO consider moving data load from the componentDidMount lifecycle hook to .getInitialProps in order to load the data serverside
  useEffect(() => {
    dispatch({ type: INITIALIZE_LEDGER });
    // make the first call to find out information about the # of more calls that need to be made to get the full list
    fetchTransactionsWrapper({ page: 1 });
  }, []);

  useEffect(() => {
    /*
        @TODO confirm with dev team that pages are sorted in order of date,
        if so, consider adding a pagination UI 
        or additional load on scroll to page bottom
        for cases that have too many entries
    */
    // make the rest of the calls for the remaining pages
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
        <LedgerRow
          date="Date"
          company="Company"
          account="Account"
          amount={dollar(sum)}
        />
      </TableRow>
      {transactions.map((t) => (
        <TableRow key={t.id}>
          <LedgerRow
            date={moment(t.Date).format("MMM Do, YYYY")}
            company={t.Company}
            account={t.Ledger}
            amount={t.Amount}
          />
        </TableRow>
      ))}
      {loading.length ? "...Loading" : ""}
    </Table>
  );
};

export default Ledger;
