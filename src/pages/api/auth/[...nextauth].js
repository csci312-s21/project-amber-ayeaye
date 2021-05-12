import NextAuth from "next-auth";
import Providers from "next-auth/providers";




const options = {
  
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
      
      
    }),
  //callbacks:{ signIn: singIn},
  ],
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
  
};



export default (req, res) => NextAuth(req, res, options);
