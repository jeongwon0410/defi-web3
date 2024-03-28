export default function TableHeader({ rows }: { rows: string[] }) {
  return (
    <thead>
      <tr>
        {rows.map((item: string, index: number) => (
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
