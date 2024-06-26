"use client";

import { UploadStatus } from "@/misc/uploadStatus";

interface FileUploadProps {
	selectedFile: File | null;
	setUploadStatus: (status: UploadStatus) => void;
	setErrorMessage: (message: string) => void;
}

export const uploadFile = async ({
	selectedFile,
	setUploadStatus,
	setErrorMessage,
}: FileUploadProps) => {
	if (!selectedFile) return;

	const password = (document.getElementById("password") as HTMLInputElement)
		.value;
	if (!password) {
		alert("비밀번호를 입력하세요.");
		return;
	}

	// Uploading Start
	setUploadStatus(UploadStatus.Uploading);

	const presignedRes = await fetch(
		`/api/aws?type=upload&filename=${selectedFile.name}&password=${password}`
	);

	if (!presignedRes.ok) {
		const { error } = (await presignedRes.json()) as { error: string };
		setErrorMessage(error);
		setUploadStatus(UploadStatus.Error);
		return;
	}

	const { presignedUrl } = (await presignedRes.json()) as {
		presignedUrl: string;
	};

	const uploadRes = await fetch(presignedUrl, {
		method: "PUT",
		body: selectedFile,
		headers: {
			"Content-Type": selectedFile.type,
		},
	});

	if (uploadRes.ok) {
		setUploadStatus(UploadStatus.Success);
	} else {
		setUploadStatus(UploadStatus.Error);
	}
};
