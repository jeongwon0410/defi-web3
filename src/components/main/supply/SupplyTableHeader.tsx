const tableRow = [
  "Asset",
  "Total Supplied",
  "APY/LTV",
  "Available",
  "",
  "Supply&Withdraw",
  "Supplied",
];

export default function SupplyTableHeader() {
  return (
    <thead>
      <tr>
        {tableRow.map((item: string, index: number) => (
          <th
            key={index}
            className={`text-[14px] font-semibold leading-[20px] ${
              index === 5 ? "text-[#559465]" : "text-[#525C52]"
            }`}
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
}
