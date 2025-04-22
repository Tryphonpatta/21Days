export async function POST() {
  // remove accesstoken and redirect to login page
  return new Response("Logout successful", {
    status: 200,
    headers: {
      "Set-Cookie": `access_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
    },
  });
}
