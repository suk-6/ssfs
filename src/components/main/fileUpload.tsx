import Image from "next/image";
import { useRef } from "react";

interface fileUploadProps {
	selectedFile: File | null;
	setSelectedFile: (file: File) => void;
}

export const FileUpload = ({
	selectedFile,
	setSelectedFile,
}: fileUploadProps) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setSelectedFile(e.dataTransfer.files[0]);
		}
	};

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div
			className=" p-8 border-2 border-dashed border-gray-300 rounded-md"
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<input
				type="file"
				className="hidden"
				onChange={handleFileChange}
				id="file-upload"
				ref={fileInputRef}
			/>
			<label className="cursor-pointer text-center text-gray-500 hover:text-gray-700 w-full h-full flex justify-center items-center">
				{selectedFile ? (
					<div>
						<p className="text-sm text-gray-500 flex justify-center items-center">
							{selectedFile.name}
						</p>
						{selectedFile.type.startsWith("image/") && (
							<Image
								src={URL.createObjectURL(selectedFile)}
								alt={selectedFile.name}
								className="mt-2 w-full h-72 object-cover"
								width={200}
								height={200}
							/>
						)}
					</div>
				) : (
					<p>파일을 드래그하거나 클릭하여 업로드하세요</p>
				)}
			</label>
		</div>
	);
};
