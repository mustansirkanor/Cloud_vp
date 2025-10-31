import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) return new Response("Unauthorized", { status: 401 });

	const uploadDir = "/home/ubuntu/uploads";
	const files = fs.readdirSync(uploadDir);
	return new Response(JSON.stringify(files), { status: 200 });
}
