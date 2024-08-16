import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Slider,
  TextField,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { fetchMortgageRates } from '../services/mortgageService';
import { MortgageRate } from '../types/mortgageRates';
import states from '../helpers/states.json';
import { styled } from '@mui/system';
import MortgageRateChart from './MortgageRatesChart';

interface State {
  name: string;
  abbreviation: string;
}

const GreenToggleButton = styled(ToggleButton)({
  border: '1px solid #399918',
  color: '#000',
  '&.Mui-selected': {
    backgroundColor: '#06D001',
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: '#9BEC00',
    color: '#fff',
  },
});

const MortgageRates: React.FC = () => {
  const [state, setState] = useState<string>('AL');
  const [housePrice, setHousePrice] = useState<number>(200000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [loanAmount, setLoanAmount] = useState<number>(180000);
  const [creditScoreRange, setCreditScoreRange] = useState<number[]>([700, 720]);
  const [rateType, setRateType] = useState<string>('fixed');
  const [loanType, setLoanType] = useState<string>('conf');
  const [loanTerm, setLoanTerm] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);
  const [rates, setRates] = useState<MortgageRate>({data:{},request:{},timestamp:''});

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
        loanTerm,
      });
      setRates(data);
    } catch (error) {
      console.error('Failed to fetch mortgage rates', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchRates();
  }, [state, creditScoreRange, loanAmount, rateType, loanType, loanTerm]);

  const handleCreditScoreChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const [start, end] = newValue;
      if (end - start >= 20) {
        setCreditScoreRange(newValue);
      }
    }
  };

  return (
    <Container>
      <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Mortgage Rates in Your Area
        </Typography>

        <Box border={'2px solid #399918'} padding={'1rem'} borderRadius={'1rem'} width={'80%'}>
          <Typography variant="h6">Explore Rate Options</Typography>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="House Price $"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={housePrice}
                  onChange={(e) => setHousePrice(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Amount $"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  disabled
                  value={loanAmount}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ marginBottom: '16px' }}>
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
                    sx={{ color: '#399918' }}
                  />
                  <Typography>Selected Range: {creditScoreRange[0]} - {creditScoreRange[1]}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="state-select-label">Choose your state</InputLabel>
                  <Select
                    labelId="state-select-label"
                    value={state}
                    onChange={(e) => setState(e.target.value as string)}
                    label="Choose your state"
                  >
                    {states.map((state: State) => (
                      <MenuItem key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Typography gutterBottom>Rate Type</Typography>
                  <ToggleButtonGroup
                    value={rateType}
                    exclusive
                    onChange={(_e, newRateType) => setRateType(newRateType)}
                    aria-label="rate type"
                    fullWidth
                  >
                    <GreenToggleButton value="fixed">Fixed</GreenToggleButton>
                    <GreenToggleButton value="arm">Adjustable</GreenToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Typography gutterBottom>Loan Type</Typography>
                  <ToggleButtonGroup
                    value={loanType}
                    exclusive
                    onChange={(_e, newLoanType) => setLoanType(newLoanType)}
                    aria-label="loan type"
                    fullWidth
                  >
                    <GreenToggleButton value="conf">Conventional</GreenToggleButton>
                    <GreenToggleButton value="fha">FHA</GreenToggleButton>
                    <GreenToggleButton value="va">VA</GreenToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Typography gutterBottom>Loan Term</Typography>
                  <ToggleButtonGroup
                    value={loanTerm}
                    exclusive
                    onChange={(_e, newLoanTerm) => setLoanTerm(parseInt(newLoanTerm))}
                    aria-label="loan term"
                    fullWidth
                  >
                    <GreenToggleButton value={15}>15 Years</GreenToggleButton>
                    <GreenToggleButton value={30}>30 Years</GreenToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>


        <Box width={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} border={'2px solid #399918'} borderRadius={'1rem'}>
          <Typography variant="h6" align="center" gutterBottom>
            Mortgage Rate Distribution
          </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <MortgageRateChart data={rates} />
            )}
        </Box>
      </Box>
    </Container>
  );
};

export default MortgageRates;
