// pages/api/chatgpt.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { message } = req.body;
  
      // ChatGPT OpenAPIを呼び出す
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            prompt: `以下の文章が不快に感じられるワードを指摘してください: "${message}"`,
            max_tokens: 100,
          }),
        });
  
        const data = await response.json();
        const unpleasantWord = data.choices[0].text.trim();
  
        res.status(200).json({ unpleasantWord });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from ChatGPT API' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  