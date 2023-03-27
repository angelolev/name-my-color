import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const color = req.body.color || '';
  if (color.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid color",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(color),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(color) {
  const capitalizedColor =
    color[0].toUpperCase() + color.slice(1).toLowerCase();
  return `Suggest a SCSS variable for this color. It has to be an utility class name

Color: #2ecc71
Names: $success-color, $submited-color
Color: #e74c3c
Names: $error-color, $catch-color
Color: ${capitalizedColor}
Names:`;
}
