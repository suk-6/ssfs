"use client";

import { ListObjectsV2Output, _Object } from "@aws-sdk/client-s3";

export const getData = async () => {
	const password = (document.getElementById("password") as HTMLInputElement)
		.value;
	if (!password) {
		alert("비밀번호를 입력하세요.");
		return;
	}

	const res = await fetch(`/api/aws?type=list&password=${password}`);

	if (!res.ok) {
		const { error } = (await res.json()) as { error: string };
		return error;
	}

	return res.json() as ListObjectsV2Output;
};
