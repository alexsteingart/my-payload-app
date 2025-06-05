import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'description',
    type: 'textarea',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'productType',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
]
