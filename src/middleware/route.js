import { cookies } from "next/headers";

export async function POST(req) {
  const { token } = await req.json();

  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return Response.json({ success: true });
}
