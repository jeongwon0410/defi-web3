interface Props {
  tableRow: string[];
}

export default function SupplyTableField({ tableRow }: Props) {
  return (
    <>
      <tr>
        {tableRow &&
          tableRow.map((item: string, index: number) => (
            <th
              key={index}
              className={
                index === 5
                  ? `font-pretendard font-semibold text-[14px] leading-[20px] text-[#559465]`
                  : `font-pretendard font-semibold text-[14px] leading-[20px] text-[#525C52]`
              }
            >
              {item}
            </th>
          ))}
      </tr>
    </>
  );
}
