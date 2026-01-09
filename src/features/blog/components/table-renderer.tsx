interface TableRow {
  _key: string;
  _type: "tableRow";
  cells: string[];
}

interface TableValue {
  _type: "table";
  rows: TableRow[];
}

interface TableRendererProps {
  value: TableValue;
}

export function TableRenderer({ value }: TableRendererProps) {
  if (!value?.rows || value.rows.length === 0) {
    return null;
  }

  const hasHeader = value.rows.length > 0;
  const headerRow = hasHeader ? value.rows[0] : null;
  const bodyRows = hasHeader ? value.rows.slice(1) : value.rows;

  return (
    <div className=" overflow-x-auto">
      <table className="min-w-full  not-prose divide-y divide-tertiary-4 border border-tertiary-4">
        {headerRow && (
          <thead className="bg-tertiary-4 border-b border-tertiary-4">
            <tr>
              {headerRow.cells.map((cell, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left font-primary text-sm font-semibold text-tertiary-12"
                >
                  {cell || ""}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-tertiary-2 bg-white">
          {bodyRows.map((row) => (
            <tr key={row._key} className="hover:bg-tertiary-2">
              {row.cells.map((cell, index) => (
                <td
                  key={index}
                  className="px-4 py-3 font-primary text-sm text-tertiary-12"
                >
                  {cell || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
