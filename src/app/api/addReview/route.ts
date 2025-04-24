import { Review } from "@/lib/content";

export const POST = async (request: Request) => {
  const { email, message } = await request.json();

  const getReviews = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/reviews.json"
  );

  const reviews: Review[] | null = await getReviews.json();

  const newReview = {
    email,
    message,
  };

  const updatedReviews = reviews ? [...reviews, newReview] : [newReview];

  try {
    await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/reviews.json",
      {
        method: "PUT",
        body: JSON.stringify(updatedReviews),
      }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error adding review:", error);
    return Response.json({ success: false });
  }
};
