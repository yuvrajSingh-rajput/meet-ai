import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal } from "@polar-sh/better-auth";

import { db } from "@/db";
import * as schema from "@/db/schema";

import { polarClient } from "./polar";

const plugins =
  process.env.POLAR_ACCESS_TOKEN
    ? [
        polar({
          client: polarClient,
          createCustomerOnSignUp: true,
          use: [
            checkout({
              authenticatedUsersOnly: true,
              successUrl: "/upgrade",
            }),
            portal(),
          ],
        }),
      ]
    : [];

export const auth = betterAuth({
  // Allow both the default Next.js dev port and the fallback port used when 3000 is busy.
  trustedOrigins: ["https://meeting-ai-saa-s-1r8l.vercel.app"],
  plugins,
  socialProviders: {
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    },
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
