import {defineField, defineType} from 'sanity'

import {statusField, submittedAtField} from './submissionFields'

export const catalogueRequest = defineType({
  name: 'catalogueRequest',
  title: 'Catalogue Request',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'department', title: 'Department', type: 'string'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({
      name: 'productsRequested',
      title: 'Products Requested',
      type: 'text',
      rows: 4,
    }),
    defineField({name: 'notes', title: 'Notes', type: 'text', rows: 4}),
    submittedAtField,
    statusField,
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'name', company: 'company', status: 'status'},
    prepare: ({title, company, status}) => ({
      title: title || 'Unnamed request',
      subtitle: [status, company].filter(Boolean).join(' · '),
    }),
  },
})
