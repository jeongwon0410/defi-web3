interface Props {
    tableRow: Array<string>;
    tableCol: Array<any>;
    flag: boolean;
}
export default function Table({ tableRow, tableCol, flag }: Props) {
    return (
        <div className="w-full">
            <table className="table w-full text-center">
                <thead className="">
                    <tr>
                        {tableRow.map((item: string, index: number) => (
                            <th
                                key={index}
                                className="font-pretendard  text-[14px] leading-[20x] text-[#B0B0B0]"
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableCol.map((item: any, index: number) => (
                        <tr
                            className="h-[60px] w-full rewardColum "
                            key={index}
                        >
                            <td className="font-pretendard text-[14px] leading-[20px] text-[#B0B0B0] ">
                                <div className="flex">
                                    <img
                                        src={item[0]}
                                        className="h-[15px] w-[15px] mr-2 mt-1"
                                    />
                                    <div className="flex ">{item[1]}</div>
                                </div>
                            </td>
                            <td className="font-pretendard text-[14px] leading-[20px] text-[#B0B0B0]">
                                {flag === true ? (
                                    <div
                                        className="tooltip  tooltip-top"
                                        data-tip={item[2]}
                                    >
                                        <p className="overflow-hidden truncate w-20">
                                            {item[2]}
                                        </p>
                                    </div>
                                ) : (
                                    item[2]
                                )}
                            </td>
                            <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                                {item[3]}
                            </td>
                            {flag === true ? (
                                <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                                    {item[4]}
                                </td>
                            ) : (
                                <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                                    {item[4]}
                                </td>
                            )}

                            {flag && (
                                <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                                    {item[5]}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
