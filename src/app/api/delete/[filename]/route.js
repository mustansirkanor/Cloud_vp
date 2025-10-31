import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(req, { params }) {
	const session = await getServerSession(authOptions);
	if (!session) return new Response("Unauthorized", { status: 401 });

	const filePath = path.join("/home/ubuntu/uploads", params.filename);
	if (!fs.existsSync(filePath)) {
		return new Response("File not found", { status: 404 });
	}

	fs.unlinkSync(filePath);
	return new Response(JSON.stringify({ message: "File deleted" }), {
		status: 200,
	});
}
