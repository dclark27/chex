import * as Yup from 'yup'

const validationSchema = [
  Yup.object().shape({
    people: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('It’s ok, you can name them')
    })).min(2, 'If you ate alone you don’t need this!')
  }),
  Yup.object().shape({
    plates: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('Was it good?'),
      price: Yup.number().required('It wasn’t free lol').positive('You got paid to eat??'),
      eatenBy: Yup.array().of(Yup.string()).min(1, 'Someone has to eat it!')
    })).min(1, 'No food, no website')
  }),
  Yup.object().shape({
    price: Yup.number().required('It wasn’t free lol').positive('You got paid to eat??'),
    tip: Yup.number().required('If you didn’t tip this app breaks').positive('You got paid to eat??')
  })
]

export default validationSchema
