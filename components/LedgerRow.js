import { TableRowEntry } from "./Table";

const LedgerRow = ({ date, company, account, amount }) => (
  <>
    <TableRowEntry width="10%">{date}</TableRowEntry>
    <TableRowEntry width="40%">{company}</TableRowEntry>
    <TableRowEntry width="40%">{account}</TableRowEntry>
    <TableRowEntry width="10%">{amount}</TableRowEntry>
  </>
);

export default LedgerRow;
