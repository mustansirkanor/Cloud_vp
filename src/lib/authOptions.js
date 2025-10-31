import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials) {
				const user = {
					id: "1",
					name: "Aayush",
					email: "aayush@example.com",
					password: "$2a$10$...",
				};
				if (
					credentials.email === user.email &&
					(await bcrypt.compare(credentials.password, user.password))
				) {
					return user;
				}
				return null;
			},
		}),
	],
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
};
