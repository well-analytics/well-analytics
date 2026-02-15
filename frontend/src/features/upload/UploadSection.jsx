import FileUpload from "./FileUpload.jsx";

function UploadSection({ onUploadSuccess, setShowLoglog }) {
	return (
		<div className="max-w-screen-2xl mx-auto px-6">
			<div className="p-5">
				<FileUpload
					uploadUrl="/"
					onSuccess={(result) => {
						setShowLoglog(false);
						onUploadSuccess(result);
					}}
				/>
			</div>
		</div>
	);
}

export default UploadSection;
