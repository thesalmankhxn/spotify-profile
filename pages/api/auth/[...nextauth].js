import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { RequestDefaults } from "../../../lib/spotify";

const returnAccessToken = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    };

    RequestDefaults.changeToken(token?.accessToken);
    spotifyApi.setAccessToken(RequestDefaults.token);

    return headers;
  } catch (error) {
    console.log(error);
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images[0].url,
        };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return { ...token, accessToken: account.access_token };
      }

      return (await returnAccessToken(token)) && token;
    },
    // async jwt(token, user, account = {}) {
    //   if (account.provider && !token[account.provider]) {
    //     token[account.provider] = {};
    //   }

    //   if (account.accessToken) {
    //     token[account.provider].accessToken = account.accessToken;
    //   }

    //   if (account.refreshToken) {
    //     token[account.provider].refreshToken = account.refreshToken;
    //   }

    //   return token;
    // },

    async session({ session, user, token }) {
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
