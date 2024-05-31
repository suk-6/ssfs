"use client";

import { FileUpload } from "./fileUpload";

export const MainModal = () => {
	return (
		<div className=" w-full h-full flex flex-col items-center justify-center">
			<div className=" w-4/6 h-[500px] border border-gray-200 rounded-lg shadow-2xl">
				<div className=" w-full h-full flex p-5">
					<div className=" w-full h-full flex justify-center items-center">
						<FileUpload />
					</div>
				</div>
			</div>
		</div>
	);
};
