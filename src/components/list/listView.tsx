import { ListObjectsV2Output } from "@aws-sdk/client-s3";

interface ListViewProps {
	contents: ListObjectsV2Output["Contents"];
}

export const ListView = ({ contents }: ListViewProps) => {
	contents = contents!.sort((a, b) =>
		a.LastModified! > b.LastModified! ? -1 : 1
	);

	return (
		<div className=" w-full h-full flex flex-col items-center justify-center gap-7">
			<div className=" w-5/6 h-fit border border-gray-200 rounded-lg shadow-2xl overflow-y-scroll scrollbar-hide m-10">
				<div className=" w-full h-fit flex p-5">
					<table className=" w-full h-full">
						<thead>
							<tr className=" w-full h-12 border-b border-gray-200">
								<th className=" w-1/2 h-full text-left">
									파일명
								</th>
								<th className=" w-2/6 h-full text-right">
									마지막 수정
								</th>
								<th className=" w-1/6 h-full text-right">
									파일 크기
								</th>
							</tr>
						</thead>
						<tbody>
							{contents!.map((content) => (
								<tr
									key={content.Key}
									className=" w-full h-10 border-b border-gray-200"
								>
									<td className=" w-1/2 h-full text-left">
										<a
											href={`${process.env.NEXT_PUBLIC_S3_URL}/${content.Key}`}
											target="_blank"
										>
											{decodeURIComponent(content.Key!)}
										</a>
									</td>
									<td className=" w-2/6 h-full text-right">
										{new Date(
											content.LastModified!
										).toLocaleString()}
									</td>
									<td className=" w-1/6 h-full text-right">
										{(content.Size! / 1024 / 1024).toFixed(
											1
										)}{" "}
										MB
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
