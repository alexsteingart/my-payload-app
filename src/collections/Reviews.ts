import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'source',
      type: 'text',
      required: true,
    },
    {
      name: 'sourceAbbr',
      type: 'text',
      required: true,
    },
    {
      name: 'score',
      type: 'number',
      required: true,
    },
    {
      name: 'reviewText',
      type: 'textarea',
    },
    ...slugField(),
  ],
}
