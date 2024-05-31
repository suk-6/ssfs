"use client";

import { useState } from "react";
import { FileUpload } from "./fileUpload";

export const MainModal = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const uploadFile = async () => {
		if (!selectedFile) return;

		const password = (
			document.getElementById("password") as HTMLInputElement
		).value;
		if (!password) {
			alert("비밀번호를 입력하세요.");
			return;
		}

		console.log(selectedFile.name, selectedFile.size, selectedFile.type);
	};

	return (
		<div className=" w-full h-full flex flex-col items-center justify-center gap-7">
			<div className=" w-4/6 h-[500px] border border-gray-200 rounded-lg shadow-2xl">
				<div className=" w-full h-full flex p-5">
					<div className=" w-full h-full flex justify-center items-center">
						<FileUpload
							selectedFile={selectedFile}
							setSelectedFile={setSelectedFile}
						/>
					</div>
				</div>
			</div>
			{selectedFile && (
				<div className=" w-4/6 h-[60px] flex flex-row gap-3">
					<div className=" w-full h-full bg-white border flex justify-center items-center">
						<input
							id="password"
							type="password"
							autoComplete="off"
							className=" w-11/12 h-8/12 focus:outline-none"
							placeholder="비밀번호를 입력하세요."
						/>
					</div>
					<button
						className=" w-1/4 h-full bg-white hover:bg-gray-100 border text-gray-500 rounded-lg"
						onClick={() => uploadFile()}
					>
						업로드
					</button>
				</div>
			)}
		</div>
	);
};
