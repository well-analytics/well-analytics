import PlotInput from "./PlotInput.jsx";
import DownloadButton from "../../components/DownloadButton.jsx";

function InputPanel({ resultData }) {
	if (!resultData) return null;

	return (
		<div>
			<PlotInput
				df_bhp={resultData.df_bhp}
				df_rate={resultData.df_rate}
				shutin={resultData.shutin}
				flowing={resultData.flowing}
			/>
			<DownloadButton
				data={[resultData.shutin, resultData.flowing]}
				text="Download Target Interval Data"
				CSVGenerator="targetInterval"
			/>
		</div>
	);
}

export default InputPanel;
