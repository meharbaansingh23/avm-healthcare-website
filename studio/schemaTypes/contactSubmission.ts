import {defineField, defineType} from 'sanity'

import {statusField, submittedAtField} from './submissionFields'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 6}),
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
    select: {title: 'name', subtitle: 'email', status: 'status'},
    prepare: ({title, subtitle, status}) => ({
      title: title || 'Unnamed submission',
      subtitle: [status, subtitle].filter(Boolean).join(' · '),
    }),
  },
})
