import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'


const Receipts = ({ tallies }) => {
  const { values } = useFormikContext()

  return (
    <Stack spacing={6} sx={{ m:3 }}>
      <Paper sx={{ width: 200, p: 2}}>
        <Typography variant='h6'>Big Receipt</Typography>
        {values.plates.map((plate, index) => (
          <Stack key={index} spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
            <Typography variant='caption'>{plate.name}</Typography>
            <Typography variant='body2' sx={{ textAlign: 'right'}}>${plate.price}</Typography>
          </Stack>
        ))}
        <Divider sx={{ mt: 2, mb: 2}} />
        <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
          <Typography variant='caption'>Tax</Typography>
          <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.taxTotal}</Typography>
        </Stack>                
        <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
          <Typography variant='caption'>Tip</Typography>
          <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.tip}</Typography>
        </Stack>               
        <Divider sx={{ mt: 2, mb: 2}} />
        <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
          <Typography variant='caption'>Total</Typography>
          <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.total}</Typography>
        </Stack>
      </Paper>
      {Object.keys(tallies.splits).map((name) => (
        <Paper sx={{ width: 200, p: 2}} key={name}>
          <Typography variant='h6'>{name}</Typography>
          {tallies.splits[name].ledger.map((plate, index) => (
            <Stack key={index} spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
              <Typography variant='caption'>{plate.name}</Typography>
              <Typography variant='body2' sx={{ textAlign: 'right'}}>${plate.plateCost}</Typography>
            </Stack>
          ))}
          <Divider sx={{ mt: 2, mb: 2}} />
          <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
            <Typography variant='caption'>Tax</Typography>
            <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.splits[name].tax.toFixed(2)}</Typography>
          </Stack>                
          <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
            <Typography variant='caption'>Tip</Typography>
            <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.splits[name].tip.toFixed(2)}</Typography>
          </Stack>               
          <Divider sx={{ mt: 2, mb: 2}} />
          <Stack spacing={2} direction='row' justifyContent='space-between' sx={{ pb: 1}}>
            <Typography variant='caption'>Total</Typography>
            <Typography variant='body2' sx={{ textAlign: 'right'}}>${tallies.splits[name].total.toFixed(2)}</Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

Receipts.propTypes = {
  tallies: PropTypes.shape({
    splits: PropTypes.shape({
      total: PropTypes.number,
      tax: PropTypes.number,
      tip: PropTypes.number,
      ledger: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        plateCost: PropTypes.number,
        plateTotal: PropTypes.number,
        tipCost: PropTypes.number,
        taxCost: PropTypes.number,
      }))
    }),
    subTotal: PropTypes.number,
    taxRate: PropTypes.number,
    taxTotal: PropTypes.number,
    preTipTotal: PropTypes.number,
    tip: PropTypes.number,
    total: PropTypes.number,
  }),
}

export default Receipts