declare namespace NodeJS {
	interface ProcessEnv {
		S3_REGION: string;
		S3_BUCKET_NAME: string;
		S3_ACCESS_KEY: string;
		S3_SECRET_KEY: string;
		PASSWORD: string;
	}
}
