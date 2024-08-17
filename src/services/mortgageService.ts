// src/services/mortgageService.ts

import axios, { AxiosResponse } from 'axios';
import { MortgageRate } from '../types/mortgageRates';

const BASE_URL = import.meta.env.BASE_URL

interface FetchMortgageRatesParams {
  state: string;
  creditScoreRange: number[];
  loanAmount: number;
  rateType: string;
  loanType: string;
  housePrice: number;
  loanTerm:number
}

console.log('baseurlrir',BASE_URL);


export const fetchMortgageRates = async ({
  state,
  creditScoreRange,
  loanAmount,
  rateType,
  loanType,
  housePrice,
  loanTerm
}: FetchMortgageRatesParams): Promise<MortgageRate> => {
  try {
    const response: AxiosResponse<MortgageRate> = await axios.get('/oah-api/rates/rate-checker', {
      params: {
        state,
        minfico: creditScoreRange[0],
        maxfico: creditScoreRange[1],
        loan_amount: loanAmount,
        rate_structure: rateType,
        loan_type: loanType,
        price: housePrice,
        loan_term:loanTerm
      },
       headers: {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0',
    // 'Referer': 'http://localhost:5173/',
  },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching mortgage rates:', error);
    throw error;
  }
};
