function ArrowSVG({ className = "" }) {
	return (
		<div className="hidden lg:flex self-center">
			<svg
				viewBox="0 0 48 48"
				className={`w-15 h-15 ${className}`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10 24H38"
					stroke="currentColor"
					strokeWidth="5"
					strokeLinecap="round"
				/>
				<path
					d="M30 16L38 24L30 32"
					stroke="currentColor"
					strokeWidth="5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

export default ArrowSVG;
