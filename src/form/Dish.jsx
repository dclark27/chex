import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'formik-mui'
import { useFormikContext, Field, ErrorMessage } from 'formik'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const Dish = ({ index, remove }) => {
  const { values } = useFormikContext()

  return (
    <Stack 
      justifyContent="center"
      alignItems="center"
      direction='column'
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
      </Stack>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography variant='caption'>who ate it?</Typography>
        <Field
          component='select'
          name={`plates.${index}.eatenBy`}
          multiple={true}
          style={{width: 56, height: 56}}
        >
          {values.people.map(({ name }, index) => ( <option key={index} value={name}>{name}</option>))}
        </Field>
        <ErrorMessage name={`plates.${index}.eatenBy`}>{msg => <div><Typography variant='caption' sx={{ m: 4, color: 'error.main'}}>{msg}</Typography></div>}</ErrorMessage>
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
    </Stack>
  )
}

Dish.propTypes = {
  index: PropTypes.number,
  remove: PropTypes.func,
}

export default Dish