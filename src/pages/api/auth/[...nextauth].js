import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verify_dj } from "../../../lib/next-auth-utils";

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
  callbacks: ({signIn: async function signIn(user) {
    verify_dj(user.email)
  }})
};

export default (req, res) => NextAuth(req, res, options);
