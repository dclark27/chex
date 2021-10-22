import React from 'react'
import { Formik, Form } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import calculateTotals from './utilities/util'
import validationSchema from './utilities/validation'
import initialValues from './utilities/initialValues'
import People from './form/People'
import Dishes from './form/Dishes'
import Cost from './form/Cost'
import Receipts from './components/Receipts'

function App () {

  const [step, setStep] = React.useState(0)

  const submitForm = (values, { setSubmitting, setTouched }) => {
    setStep(step + 1)
    setTouched({})
    setSubmitting(false)
  }

  return (
    <Container maxWidth='sm' sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap'}}>
      <Typography variant='h3' sx={{ width: '100%', m: 12 }}>
			🥄 Chex
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema[step]} onSubmit={submitForm}>
        {({values}) => (
          <Form>
            {step === 0 && <People />}
            {step === 1 && <Dishes />}
            {step === 2 && <Cost />}
            {step === 3 && <Receipts tallies={calculateTotals(values)} />}
            <Stack direction='row' spacing={3} justifyContent='center' sx={{mb: 5}}>
              <Button variant='outlined' disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
              {step !== 3 && <Button variant='outlined' type='submit'>{step === 2 ? 'Finish' : 'Next'}</Button>}
              {step === 3 && <Button variant='outlined' disabled={step === 0} onClick={() => setStep(0)}>Start Over</Button>}
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default App
