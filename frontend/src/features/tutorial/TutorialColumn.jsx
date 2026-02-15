import { COLORS } from "../../constants/colors";

function TutorialColumn({ children }) {
	return (
		<div className="flex flex-col gap-4 p-6 border rounded-xl h-full" style={{ backgroundColor: COLORS.TERTIARY }}>
			{children}
		</div >
	);
}

export default TutorialColumn;
