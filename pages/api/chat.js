import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messages } = req.body;

    // Filter and format messages to match Groq API requirements
    const formattedMessages = messages
      .filter((msg) => msg.role === "user" || msg.role === "system") // Exclude bot messages
      .map((msg) => ({
        role: msg.role,
        content: msg.content || "", // Ensure content is always present
        name: msg.name || undefined, // Include name only if provided
      }));

    console.log("Formatted Messages:", formattedMessages);

    try {
      // Call the Groq AI API
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions", // Replace with the actual Groq API endpoint
        {
          model: "llama3-8b-8192", // Replace with the correct model
          messages: formattedMessages, // Send the correctly formatted messages
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0]?.message?.content || "No response.";
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error communicating with Groq API:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      res.status(500).json({ error: "Failed to fetch response from Groq AI" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
