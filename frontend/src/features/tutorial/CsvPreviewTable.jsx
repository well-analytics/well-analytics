import { COLORS } from "../../constants/colors";

function formatCell(value, decimals = 3) {
	if (value === null || value === undefined) return "";

	const num = Number(value);
	if (Number.isNaN(num)) return value; // keep strings as-is

	return num.toFixed(decimals);
}

function CsvPreviewTable({ columns, rows, title }) {
	return (
		<div className="border rounded-lg p-3 shadow-sm text-black" style={{ backgroundColor: COLORS.BACKGROUND }}>
			{title && (
				<div className="font-semibold text-sm mb-2 text-gray-700x">
					{title}
				</div>
			)}
			<table className="w-full text-xs border-collapse">
				<thead>
					<tr>
						{columns.map((col) => (
							<th
								key={col}
								className="border px-2 py-1 bg-gray-100 text-left"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j} className="border px-2 py-1">
									{formatCell(cell)}
								</td>

							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CsvPreviewTable;
