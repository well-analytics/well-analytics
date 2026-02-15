import { useState } from "react";
import PlotTIFamily from "./PlotTIFamily.jsx";
import DownloadButton from "../../components/DownloadButton.jsx";
import { COLORS } from "../../constants/colors";

function LogLogPanel({ resultData }) {
	const [showLoglog, setShowLoglog] = useState(false);

	if (!resultData) return null;

	return (
		<div className="flex items-center justify-center">
			{showLoglog ? (
				<div className="w-full">
					<PlotTIFamily logs={resultData.loglog_normalized} />
					<div className="flex justify-end">
						<DownloadButton
							data={resultData.loglog_normalized}
							text="Download Pressure and Derivative Data"
							CSVGenerator="loglog"
						/>
					</div>
				</div>
			) : (
				<div
					className="flex items-center justify-center border-4 border-dotted w-full h-full"
					style={{ borderColor: COLORS.PRIMARY }}
				>
					<button
						onClick={() => setShowLoglog(true)}
						className="px-4 py-2 bg-blue-600 text-white rounded"
					>
						Show log-log plot
					</button>
				</div>
			)}
		</div>
	);
}

export default LogLogPanel;
