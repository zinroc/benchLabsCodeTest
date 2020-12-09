import axios from "axios";

export const fetchTransactions = ({ page }) =>
  axios.get(`https://resttest.bench.co/transactions/${page}.json`);

export default {};
