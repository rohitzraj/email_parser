import { openai } from '../config/openai';

async function generateResponse(category: string): Promise<string> {
  const prompt1 : any = {
    'Interested': 'Generate a response asking if the recipient is willing to hop on a demo call by suggesting a time.',
    'Not Interested': 'Generate a polite response acknowledging their disinterest.',
    'More information': 'Generate a response asking for specific information they would like to know more about.'
  }[category];

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: prompt1,
    max_tokens: 50,
  });

  return response.choices[0].text.trim();
}

export { generateResponse };
