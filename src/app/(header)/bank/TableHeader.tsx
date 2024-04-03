export default function TableHeader({
  rows,
}: {
  rows: { value: string; highlighted?: boolean }[];
}) {
  return (
    <thead>
      <tr>
        {rows.map((item, idx) => (
          <th
            key={idx}
            className={`w-10 text-[0.8125rem] font-semibold ${
              item.highlighted ? "text-[#559465]" : "text-[#525C52]"
            }`}
          >
            {item.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
