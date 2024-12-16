// pages/api/search.js
import axios from 'axios';

export default async function handler(req, res) {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
            headers: {
                'Ocp-Apim-Subscription-Key': 'YOUR_BING_API_KEY',  // Replace with your Bing API key
            },
            params: { q: query },
        });

        const searchResults = response.data.webPages?.value.map((item) => ({
            title: item.name,
            link: item.url,
            description: item.snippet,
        }));

        return res.status(200).json({ results: searchResults });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch search results' });
    }
}
