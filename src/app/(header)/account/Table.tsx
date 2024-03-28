import BigNumber from "bignumber.js";
import TableHeader from "./TableHeader";
import TableContent, { TableContentProps } from "./TableContent";

export type TableProps = {
  title: string;
  balance: BigNumber;
} & TableContentProps;

export default function Table({ title, balance, header, content }: TableProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <TableHeader title={title} balance={balance} />
      <TableContent header={header} content={content} />
    </div>
  );
}
