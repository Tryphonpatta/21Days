import axios from "axios";

export async function POST(request: Request) {
  // Check if the request is a POST request
  const req = await request.json();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      username: req.username,
      password: req.password,
    }
  );
  if (res.status !== 200 && res.status !== 201) {
    return new Response("Login failed!", { status: 401 });
  }
  const { access_token } = res.data;
  //   localStorage.setItem("access_token", access_token);
  return new Response("Login successful", {
    status: 200,
    headers: {
      "Set-Cookie": `access_token=${access_token}; Path=/; HttpOnly; SameSite=Strict`,
    },
  });
}
