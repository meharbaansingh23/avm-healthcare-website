import {defineField, defineType} from 'sanity'

import {statusField, submittedAtField} from './submissionFields'

export const careerSubmission = defineType({
  name: 'careerSubmission',
  title: 'Career Submission',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'roleInterest', title: 'Role Interest', type: 'string'}),
    defineField({
      name: 'cv',
      title: 'CV',
      type: 'file',
      description: 'Uploaded CV / résumé.',
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
    select: {title: 'name', role: 'roleInterest', status: 'status'},
    prepare: ({title, role, status}) => ({
      title: title || 'Unnamed applicant',
      subtitle: [status, role].filter(Boolean).join(' · '),
    }),
  },
})
