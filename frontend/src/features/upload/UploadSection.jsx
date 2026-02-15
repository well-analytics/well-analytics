import FileUpload from "./FileUpload.jsx";

function UploadSection({ onUploadSuccess }) {
	return (
		<div className="max-w-screen-2xl mx-auto px-6">
			<div className="p-5">
				<FileUpload
					uploadUrl="/"
					onSuccess={(result) => {
						onUploadSuccess(result);
						console.log(result.loglog_normalized);
					}}
				/>
			</div>
		</div>
	);
}

export default UploadSection;
