import InputPanel from "./InputPanel.jsx";
import LogLogPanel from "./LogLogPanel.jsx";

function AnalysisSection({ resultData, showLoglog, setShowLoglog }) {
	return (
		<div className="w-full px-30 mb-30">
			<div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">
				<InputPanel resultData={resultData} />
				<LogLogPanel resultData={resultData} showLoglog={showLoglog} setShowLoglog={setShowLoglog} />
			</div>
		</div>
	);
}

export default AnalysisSection;
