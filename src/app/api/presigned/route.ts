import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

	const filename = searchParams.get("filename");
	const password = searchParams.get("password");

	if (!filename) {
		return Response.json(
			{ error: "파일이 존재하지 않습니다." },
			{ status: 400 }
		);
	}

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

	const command = new PutObjectCommand({
		Bucket: process.env.S3_BUCKET_NAME,
		Key: filename,
	});

	const url = await getSignedUrl(client, command, { expiresIn: 60 });

	return Response.json({ presignedUrl: url });
};
