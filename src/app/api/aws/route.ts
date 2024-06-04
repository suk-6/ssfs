import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
	S3Client,
	PutObjectCommand,
	ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const client = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	},
});

export const GET = async (request: NextRequest) => {
	const { searchParams } = request.nextUrl;

	const reqType = searchParams.get("type");
	const filename = searchParams.get("filename");
	const password = searchParams.get("password");

	if (!password) {
		return Response.json(
			{ error: "비밀번호가 필요합니다." },
			{ status: 400 }
		);
	}

	if (password !== process.env.PASSWORD) {
		return Response.json(
			{ error: "비밀번호 오류입니다." },
			{ status: 401 }
		);
	}

	if (!reqType) {
		return Response.json(
			{ error: "요청 타입이 필요합니다." },
			{ status: 400 }
		);
	}

	let command: PutObjectCommand | ListObjectsV2Command;
	let url: string;

	if (reqType === "upload") {
		if (!filename) {
			return Response.json(
				{ error: "파일이 존재하지 않습니다." },
				{ status: 400 }
			);
		}

		command = new PutObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: filename,
		});
		url = await getSignedUrl(client, command, { expiresIn: 60 });

		return Response.json({ presignedUrl: url });
	} else if (reqType === "list") {
		command = new ListObjectsV2Command({
			Bucket: process.env.S3_BUCKET_NAME,
			EncodingType: "url",
		});

		return client.send(command).then((data) => {
			return Response.json(data);
		});
	} else {
		return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
	}
};
