import {defineField, defineType} from 'sanity'

import {statusField, submittedAtField} from './submissionFields'

export const innovationProposal = defineType({
  name: 'innovationProposal',
  title: 'Innovation Proposal',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({
      name: 'proposalDetails',
      title: 'Proposal Details',
      type: 'text',
      rows: 8,
    }),
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
      title: title || 'Unnamed proposal',
      subtitle: [status, company].filter(Boolean).join(' · '),
    }),
  },
})
