"use client";

import { useState } from "react";
import { FileUpload } from "./fileUpload";
import { UploadStatus } from "@/misc/uploadStatus";
import { uploadFile } from "@/utils/upload";
import { DotLoader } from "react-spinners";
import { getData } from "@/utils/data/get";

interface MainModalProps {
	setS3Data: (data: any) => void;
}

export const MainModal = ({ setS3Data }: MainModalProps) => {
	const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
		UploadStatus.Idle
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const buttonClick = async () => {
		if (selectedFile && uploadStatus === UploadStatus.Idle) {
			await uploadFile({
				selectedFile,
				setUploadStatus,
				setErrorMessage,
			});
		}
		getData().then((data) => {
			setS3Data(data);
		});
	};

	return (
		<div className=" w-full h-full flex flex-col items-center justify-center gap-7">
			<div className=" w-4/6 h-[500px] border border-gray-200 rounded-lg shadow-2xl">
				<div className=" w-full h-full flex p-5">
					<div className=" w-full h-full flex justify-center items-center">
						{uploadStatus === UploadStatus.Idle && (
							<FileUpload
								selectedFile={selectedFile}
								setSelectedFile={setSelectedFile}
							/>
						)}
						{uploadStatus === UploadStatus.Uploading && (
							<DotLoader color="#afedad" size={50} />
						)}
						{uploadStatus === UploadStatus.Error &&
							errorMessage && (
								<div className=" w-full h-full flex flex-col justify-center items-center text-red-500">
									<p>{errorMessage}</p>
								</div>
							)}
					</div>
				</div>
			</div>
			<div className=" w-4/6 h-[60px] flex flex-row gap-3">
				<div className=" w-full h-full bg-white border flex justify-center items-center">
					<input
						id="password"
						type="password"
						autoComplete="off"
						className=" w-11/12 h-8/12 focus:outline-none"
						placeholder="비밀번호를 입력하세요."
						onKeyDown={(e) => {
							if (e.key === "Enter") buttonClick();
						}}
					/>
				</div>
				<button
					className=" w-1/4 h-full bg-white hover:bg-gray-100 border text-gray-500 rounded-lg"
					onClick={buttonClick}
				>
					{selectedFile && uploadStatus === UploadStatus.Idle
						? "업로드"
						: "파일 목록"}
				</button>
			</div>
		</div>
	);
};
