import { openai } from '../config/openai';

async function categorizeEmail(emailContent: string): Promise<string> {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Categorize this email: ${emailContent}\n\nCategories:\n1. Interested\n2. Not Interested\n3. More information`,
    max_tokens: 10,
  });

  return response.choices[0].text.trim();
}

export { categorizeEmail };
