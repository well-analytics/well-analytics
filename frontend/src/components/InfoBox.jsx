import { COLORS } from "../constants/colors"

export default function InfoBox({ text }) {
	return (
		<p className="m-3 pr-1 pl-1 border-2 rounded-full text-xs" style={{ borderColor: COLORS.SECONDARY, color: COLORS.SECONDARY }} title={text}><i><b>i</b></i></p>
	)
}