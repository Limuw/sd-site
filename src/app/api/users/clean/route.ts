export const GET = async () => {
  const response = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users.json",
    {
      method: "DELETE",
    }
  );

  return Response.json(response);
};
