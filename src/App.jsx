import * as React from 'react'
import * as Yup from 'yup'
import { TextField } from 'formik-mui'
import { Formik, Field, Form, FieldArray } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

const AppSchema = [
  Yup.object().shape({
    people: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('It’s ok, you can name them')
    })).min(2, 'If you ate alone you don’t need this!')
  }),
  Yup.object().shape({
    plates: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('Was it good?'),
      price: Yup.number().required('It wasn’t free lol').positive('You got paid to eat??').integer()
    })).min(1, 'No food, no website')
  }),
  Yup.object().shape({
    price: Yup.number().required('It wasn’t free lol').positive('You got paid to eat??').integer(),
    tip: Yup.number().required('If you didn’t tip this app breaks').positive('You got paid to eat??').integer()
  })
]

const initialValues = {
  people: [
    {
      name: 'Devin'
    },
    {
      name: 'Robbie'
    },
  ],
  plates: [
    {
      name: 'Ramen',
      price: '10',
      eatenBy: ['Devin']
    },
    {
      name: 'Pizza',
      price: '10',
      eatenBy: ['Robbie']
    },
    {
      name: 'Fries',
      price: '10',
      eatenBy: ['Robbie', 'Devin']
    }
  ],
  price: '35',
  tip: '10'
}

function App () {

  const [step, setStep] = React.useState(0)
	
  const [tallies, setTallies] = React.useState({ 
    subtotal: 0, 
    taxRate: 0, 
    taxTotal: 0, 
    preTipTotal: 0, 
    tip: 0, 
    total: 0, 
    split: {}
  })

  const calculateTotals = (values) => {
    setStep(3)
    let subtotal = 0
    let taxTotal = 0
    let taxRate = 0
    let tipRate = 0
    let preTipTotal = parseInt(values.price)
    let tip = parseInt(values.tip)
    let total = preTipTotal + tip
    let splits = {}

    // calculate subtotal
    values.plates.forEach(({price}) => subtotal += parseInt(price))

    // calculate tax total
    taxTotal = preTipTotal - subtotal

    // calculate tax rate
    taxRate = taxTotal / subtotal

    // calculate tip percentage
    tipRate = tip / preTipTotal

    // plate map
    values.people.forEach(({name}) => {
      splits[name] = { total: 0, tax: 0, tip: 0, ledger: [] }
    })
		
    Object.keys(splits).forEach((person) => {
      values.plates.forEach((plate) => {
        if (plate.eatenBy.includes(person)) {
          const splitAmount = plate.eatenBy.length
          const plateCost = parseInt(plate.price) / splitAmount
          const taxCost = plateCost * taxRate
          const tipCost = (taxCost + plateCost) * tipRate
          const plateTotal = plateCost + tipCost + taxCost
          splits[person].ledger.push({
            name: plate.name,
            plateCost,
            plateTotal,
            tipCost,
            taxCost
          })
          splits[person].total += plateTotal
          splits[person].tip += tipCost
          splits[person].tax += tipCost
        }
      })
    })


    setTallies({ 
      subtotal, 
      taxRate, 
      tipRate,
      taxTotal, 
      preTipTotal, 
      tip,
      total,
      splits
    })
  }

  return (
    <Container maxWidth='sm' sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap'}}>
      <Typography variant='h3' sx={{ width: '100%', m: 12 }}>
			🥄 Chex
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={AppSchema[step]}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          values,
          errors,
          isValid
          /* and other goodies */
        }) => (
          <Form>
            {/* get names */}
            {step === 0 && <FieldArray name="people">
              {({ remove, push }) => (
                <>
                  <Typography>Who ate? 😋</Typography>
                  {values.people.length > 0 && values.people.map((friend, index) => (
                    <Stack 
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{ m: 2 }}
                      key={index}
                    >
                      <Field
                        name={`people.${index}.name`}
                        label='Name'
                        component={TextField}
                      />
                      <Tooltip title="Delete">
                        <Button
                          type="button"
                          variant='outlined'
                          sx={{ minWidth: 0, height: 56, width: 56}}
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          {'🗑️'}
                        </Button>
                      </Tooltip>
                    </Stack>
                  ))}
                  <Button
                    type="button"
                    sx={{ m: 2 }}
                    variant='outlined'
                    className="secondary"
                    onClick={() => push({ name: '' })}
                  >
                    {'Add Friend 💃'}
                  </Button>
                  {typeof errors.people === 'string' ? <Typography variant='body2' sx={{ m: 4, color: 'red'}}>{errors.people}</Typography> : null}
                </>
              )}
            </FieldArray>}
										
            {/* get meals */}
            {step === 1 && <FieldArray name="plates">
              {({ remove, push }) => (
                <Stack spacing={2} alignItems='center'>
                  <Typography>What did you order? 🥘</Typography>
                  {values.plates.length > 0 && values.plates.map((friend, index) => (
                    <Stack 
                      justifyContent="center"
                      alignItems="center"
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      key={index}
                    >
                      <Stack direction='row' spacing={2}>
                        <Field
                          name={`plates.${index}.name`}
                          placeholder='Dish'
                          label='Dish'
                          component={TextField}
                        />
                        <Field
                          name={`plates.${index}.price`}
                          placeholder='Price'
                          label='Price'
                          type='number'
                          component={TextField}
                        />
                        <Tooltip title="Delete">
                          <Button
                            type="button"
                            variant='outlined'
                            sx={{ minWidth: 0, height: 56, width: 56}}
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            {'🗑️'}
                          </Button>
                        </Tooltip>
                      </Stack>
                      <Typography variant='caption'>who ate it?</Typography>
                      <Field
                        component='select'
                        name={`plates.${index}.eatenBy`}
                        multiple={true}
                      >
                        {values.people.map(({ name }, index) => ( <option key={index} value={name}>{name}</option>))}
                      </Field>
                    </Stack>
                  ))}
                  <Stack>
                    <Button
                      type="button"
                      variant='outlined'
                      className="secondary"
                      sx={{ mb: 2 }}
                      onClick={() => push({ name: '' })}
                    >
                      {'Add Dish 😋'}
                    </Button>
                    {typeof errors.plates === 'string' ? <Typography variant='body2' sx={{ m: 4, color: 'red'}}>{errors.plates}</Typography> : null}
                  </Stack>
                </Stack>
              )}
            </FieldArray>}

            {step === 2 && (
              <>
                <Typography>What did it cost? 💰</Typography>
                <Stack 
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ m: 2 }}
                  spacing={2}
                >
                  <Field
                    name='price'
                    placeholder='Price'
                    type='number'
                    label='Price'
                    component={TextField}
                  />
                  <Field
                    name='tip'
                    type='number'
                    placeholder='Tip'
                    label='Tip'
                    component={TextField}
                  />
                </Stack>
              </>)
            }

            {step === 3 && (
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
                    <Typography variant='h6'>{name}’s Receipt</Typography>
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
            )}
            <Stack direction='row' spacing={3} justifyContent='center' sx={{mb: 5}}>
              <Button variant='outlined' disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
              {step < 2 && <Button variant='outlined' disabled={!isValid} onClick={() => setStep(step + 1)}>Next</Button>}
              {step === 2 && <Button variant='outlined' disabled={!isValid} onClick={() => calculateTotals(values)}>Finish</Button>}
              {step === 3 && <Button variant='outlined' onClick={() => setStep(0)}>Start Over</Button>}
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default App
