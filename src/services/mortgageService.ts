
// import axios, { AxiosResponse } from 'axios';
// import { MortgageRate } from '../types/mortgageRates';

// const refererUrl = import.meta.env.VITE_REFERER;

// interface FetchMortgageRatesParams {
//   state: string;
//   creditScoreRange: number[];
//   loanAmount: number;
//   rateType: string;
//   loanType: string;
//   housePrice: number;
//   loanTerm: number;
// }

// export const fetchMortgageRates = async ({
//   state,
//   creditScoreRange,
//   loanAmount,
//   rateType,
//   loanType,
//   housePrice,
//   loanTerm,
// }: FetchMortgageRatesParams): Promise<MortgageRate> => {
//   try {
//     const apiBaseUrl = import.meta.env.MODE === 'production'
//       ? 'https://www.consumerfinance.gov/oah-api'
//       : '/oah-api';

//     const response: AxiosResponse<MortgageRate> = await axios.get(`${apiBaseUrl}/rates/rate-checker`, {
//       params: {
//         state,
//         minfico: creditScoreRange[0],
//         maxfico: creditScoreRange[1],
//         loan_amount: loanAmount,
//         rate_structure: rateType,
//         loan_type: loanType,
//         price: housePrice,
//         loan_term: loanTerm,
//       },
//       headers: {
//         'Accept': 'application/json',
//         'User-Agent': 'Mozilla/5.0',
//         'Referer': refererUrl,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching mortgage rates:', error);
//     throw error;
//   }
// };

import axios, { AxiosResponse } from 'axios';
import { MortgageRate } from '../types/mortgageRates';

interface FetchMortgageRatesParams {
  state: string;
  creditScoreRange: number[];
  loanAmount: number;
  rateType: string;
  loanType: string;
  housePrice: number;
  loanTerm: number;
}

export const fetchMortgageRates = async ({
  state,
  creditScoreRange,
  loanAmount,
  rateType,
  loanType,
  housePrice,
  loanTerm,
}: FetchMortgageRatesParams): Promise<MortgageRate> => {
  try {
    const apiBaseUrl = '/api/rates';

    const response: AxiosResponse<MortgageRate> = await axios.get(apiBaseUrl, {
      params: {
        state,
        minfico: creditScoreRange[0],
        maxfico: creditScoreRange[1],
        loan_amount: loanAmount,
        rate_structure: rateType,
        loan_type: loanType,
        price: housePrice,
        loan_term: loanTerm,
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching mortgage rates:', error);
    throw error;
  }
};
