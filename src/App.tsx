import { ThemeProvider } from '@mui/material'
import Theme from './styles/Theme'
import MortgageRates from './components/MortgageRates'

const App = () => {
  return (
 <ThemeProvider theme={Theme}>
      <MortgageRates />
    </ThemeProvider>
  )
}

export default App

 /*  
 import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, Typography, Slider, TextField, MenuItem, Select, CircularProgress,
  InputLabel, FormControl,
} from '@mui/material';
import { fetchMortgageRates } from '../services/mortgageService';
import { MortgageRate } from '../types/mortgageRates';
import states from '../helpers/states.json';

interface State {
  name: string;
  abbreviation: string;
}

const MortgageRates: React.FC = () => {
  const [state, setState] = useState<string>('AL'); // Store the abbreviation here
  const [housePrice, setHousePrice] = useState<number>(200000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [loanAmount, setLoanAmount] = useState<number>(180000);
  const [creditScoreRange, setCreditScoreRange] = React.useState<number[]>([600, 620]);
  const [rateType, setRateType] = useState<string>('fixed');
  const [loanType, setLoanType] = useState<string>('conf');
  const [loanTerm, setLoanTerm] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);
  const [rates, setRates] = useState<MortgageRate[]>([]);

  const handleFetchRates = async () => {
    setLoading(true);
    try {
      const data = await fetchMortgageRates({
        state,
        creditScoreRange,
        loanAmount,
        rateType,
        loanType,
        housePrice,
        loanTerm
      });
      setRates(data);
    } catch (error) {
      console.error("Failed to fetch mortgage rates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchRates();
  }, [state, creditScoreRange, loanAmount, rateType, loanType, loanTerm]);

  console.log('rates are', rates);

    const handleCreditScoreChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const [start, end] = newValue;
      // Ensure the minimum range of 20 points
      if (end - start >= 20) {
        setCreditScoreRange(newValue);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Mortgage Rates in Your Area
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <Typography variant="h6" align="center" gutterBottom>
              Mortgage Rate Distribution
            </Typography>
            <div style={{ height: 300 }}>
              {loading ? (
                <CircularProgress />
              ) : (
                null
              )}
            </div>
          </Card>
        </Grid>

        <Grid  item xs={12} md={4}>
          
          <Card style={{ padding: '16px' }}>
            <Typography variant="h6">Explore Rate Options</Typography>

            <TextField
              label="House Price $"
              variant="outlined"
              fullWidth
              margin="normal"
              value={housePrice}
              onChange={(e) => setHousePrice(Number(e.target.value))}
            />

            <TextField
              label="Down Payment $"
              variant="outlined"
              fullWidth
              margin="normal"
              value={downPayment}
              onChange={(e) => {
                const value = Number(e.target.value);
                setDownPayment(value);
                setLoanAmount(housePrice - value);
              }}
            />

            <TextField
              label="Loan Amount $"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled
              value={loanAmount}
            />

            <div>
              <Typography gutterBottom>Credit Score Range</Typography>
              <Slider
                value={creditScoreRange}
                min={600}
                max={850}
                step={10}
                marks
                valueLabelDisplay="auto"
                onChange={handleCreditScoreChange}
                disableSwap
              />
              <Typography>Selected Range: {creditScoreRange[0]} - {creditScoreRange[1]}</Typography>
            </div>

            <FormControl fullWidth margin="normal">
              <InputLabel id="state-select-label">Choose your state</InputLabel>
              <Select
                labelId="state-select-label"
                value={state}
                onChange={(e) => setState(e.target.value as string)}
                displayEmpty
                label="Choose your state"
              >
                {states.map((state: State) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="rate-select-label">Rate Type</InputLabel>
              <Select
                labelId="rate-select-label"
                value={rateType}
                onChange={(e) => setRateType(e.target.value as string)}
                label="Rate Type"
              >
                <MenuItem value="fixed">Fixed</MenuItem>
                <MenuItem value="arm">Adjustable</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="loan-select-label">Loan Type</InputLabel>
              <Select
                labelId="loan-select-label"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value as string)}
                label="Loan Type"
              >
                <MenuItem value="conf">Conventional</MenuItem>
                <MenuItem value="fha">FHA</MenuItem>
                <MenuItem value="va">VA</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="loan-term-select-label">Loan Term</InputLabel>
              <Select
                labelId="loan-term-select-label"
                value={loanTerm.toString()}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                label="Loan Term"
              >
                <MenuItem value={15}>15 years</MenuItem>
                <MenuItem value={30}>30 years</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MortgageRates;

 */