import moment from "moment";
import { uuid } from "uuidv4";

import dollar from "../../utils/dollar";

export const FETCH_TRANSACTIONS_START = "main/FETCH_TRANSACTIONS_START";
export const FETCH_TRANSACTIONS_SUCCESS = "main/FETCH_TRANSACTIONS_SUCCESS";
export const FETCH_TRANSACTIONS_FAILURE = "main/FETCH_TRANSACTIONS_FAILURE";

const initialState = {
  transactions: [],
  sum: 0,
  totalCount: 0,
  error: "",
  loading: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_START: {
      return {
        ...state,
        loading: true,
        error: "",
        loading: [...state.loading, action.page],
      };
    }
    case FETCH_TRANSACTIONS_SUCCESS: {
      const { transactions, totalCount, page } = action;
      return {
        ...state,
        loading: state.loading.filter((p) => p !== page),
        /*
            need every transaction to have a uuid
            to differentiate it from other transactions
            especially in edge case where two transactions happened
            on the same day, for the same company, with the same account.
        */
        sum:
          state.sum +
          transactions.reduce((acc, t) => {
            if (!acc) {
              return Number(t.Amount);
            }
            return acc + Number(t.Amount);
          }, 0),
        transactions: [
          ...state.transactions,
          ...transactions.map((t) => ({
            ...t,
            id: uuid(),
            Amount: dollar(Number(t.Amount)),
          })),
        ].sort((a, b) => moment(b.Date).diff(a.Date, "days")), // sort to see most recent transactions at top of the list
        totalCount,
      };
    }
    case FETCH_TRANSACTIONS_FAILURE: {
      return {
        ...state,
        error:
          action.error && action.error.message
            ? action.error.message
            : JSON.stringify(action.error),
      };
    }

    default:
      return state;
  }
}
