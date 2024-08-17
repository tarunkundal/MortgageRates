import axios from 'axios';

export default async function handler(req, res) {
    const { state, minfico, maxfico, loan_amount, rate_structure, loan_type, price, loan_term } = req.query;

    try {
        const response = await axios.get('https://www.consumerfinance.gov/oah-api/rates/rate-checker', {
            params: {
                state,
                minfico,
                maxfico,
                loan_amount,
                rate_structure,
                loan_type,
                price,
                loan_term
            },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://mortgage-rates-nb5y.vercel.app/', // Update this to match your production URL
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching mortgage rates:', error);
        res.status(500).json({ error: 'Failed to fetch mortgage rates' });
    }
}
