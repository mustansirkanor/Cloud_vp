import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const users = [
	{
		id: "1",
		name: "Aayush",
		email: "aayush@example.com",
		password: await bcrypt.hash("password123", 10),
	},
];

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials) {
				const user = users.find((u) => u.email === credentials.email);
				if (
					user &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					return { id: user.id, name: user.name, email: user.email };
				}
				return null;
			},
		}),
	],
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
