"use client";

import { ListView } from "@/components/list/listView";
import { MainModal } from "@/components/main/modal";
import { ListObjectsV2Output } from "@aws-sdk/client-s3";
import { useState } from "react";

export default function Home() {
	const [s3Data, setS3Data] = useState<ListObjectsV2Output | null>(null);

	return (
		<main className=" w-screen h-screen">
			{s3Data ? (
				<ListView contents={s3Data.Contents} />
			) : (
				<MainModal setS3Data={setS3Data} />
			)}
		</main>
	);
}
