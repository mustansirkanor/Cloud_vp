import fs from "fs";
import path from "path";
import formidable from "formidable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const config = {
	api: { bodyParser: false },
};

export async function POST(req) {
	const session = await getServerSession(authOptions);
	if (!session) return new Response("Unauthorized", { status: 401 });

	const uploadDir = "/home/ubuntu/uploads";
	if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

	const form = formidable({
		multiples: false,
		uploadDir,
		keepExtensions: true,
	});

	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err)
				return reject(new Response("Upload failed", { status: 500 }));

			const file = files.file[0];
			const newPath = path.join(uploadDir, file.originalFilename);
			fs.renameSync(file.filepath, newPath);

			resolve(
				new Response(
					JSON.stringify({
						message: "Upload successful",
						filename: file.originalFilename,
					}),
					{
						status: 200,
						headers: { "Content-Type": "application/json" },
					}
				)
			);
		});
	});
}
