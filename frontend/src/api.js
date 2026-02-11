export async function generateAI(prompt) {
  const response = await fetch("https://healthpro-ai.onrender.com/api/generate", {

    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  return response.json();
}
