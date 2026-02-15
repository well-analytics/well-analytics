import TutorialColumn from "./TutorialColumn.jsx";
import CsvPreviewTable from "./CsvPreviewTable.jsx";
import inputPlot from "../../assets/newplot(2).png"
import loglogPlot from "../../assets/loglogPlot.png"
import { useCsvPreview } from "./useCsvPreview.js";
const baseUrl = import.meta.env.BASE_URL;

import ArrowSVG from "./ArrowSVG.jsx";


function Arrow() {
	return (
		<div className="hidden lg:flex self-center items-center justify-center">
			<ArrowSVG className="hover:text-gray-950 transition-colors text-black" />
		</div>
	);
}


function TutorialSection({ resultData }) {
	if (resultData) return null;
	const bhp = useCsvPreview(`${baseUrl}/tutorial-data/pressure.csv`, 7);
	const rate = useCsvPreview(`${baseUrl}/tutorial-data/rate.csv`, 7);
	const interval = useCsvPreview(`${baseUrl}/tutorial-data/intervals.csv`, 7);
	const loglog = useCsvPreview(`${baseUrl}/tutorial-data/loglog.csv`, 3);
	return (
		<div className="max-w-[1800px] mx-auto px-6 py-5">
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,2fr)_auto_minmax(0,1.2fr)] gap-6 items-stretch">
				{/* Column 1 — Upload */}
				<TutorialColumn>
					<div className="font-bold text-lg">Upload CSV Files</div>

					<CsvPreviewTable
						title="Pressure CSV"
						columns={bhp.columns}
						rows={bhp.rows}
					/>

					<CsvPreviewTable
						title="Rate CSV"
						columns={rate.columns}
						rows={rate.rows}
					/>
				</TutorialColumn>

				<Arrow />


				{/* Column 2 — First graph */}
				<TutorialColumn>
					<div className="font-bold text-lg">Get Input Intervals Plot</div>

					<img
						src={inputPlot}
						className="border border-black rounded"
					/>

					<CsvPreviewTable
						title="Interval Data (downloadable)"
						columns={interval.columns}
						rows={interval.rows}
					/>
				</TutorialColumn>

				<Arrow />


				{/* Column 3 — Second graph */}
				<TutorialColumn>
					<div className="font-bold text-lg">Get Log-Log Plot</div>

					<img
						src={loglogPlot}
						className="w-full border border-black rounded"
					/>
					<CsvPreviewTable
						title="Pressure and Derivative Data CSV (downloadable)"
						columns={loglog.columns}
						rows={loglog.rows}
					/>
				</TutorialColumn>

			</div>
		</div>
	);
}

export default TutorialSection;
