import {defineField} from 'sanity'

/**
 * Shared tail fields for every inbound form submission type
 * (contact, career, catalogue, innovation).
 *
 * `submittedAt` is auto-set: submissions created through the site set it
 * explicitly on write, and the initialValue covers documents created by hand
 * in the Studio.
 */
export const submittedAtField = defineField({
  name: 'submittedAt',
  title: 'Submitted At',
  type: 'datetime',
  readOnly: true,
  initialValue: () => new Date().toISOString(),
})

export const statusField = defineField({
  name: 'status',
  title: 'Status',
  type: 'string',
  options: {
    list: [
      {title: 'New', value: 'new'},
      {title: 'Read', value: 'read'},
      {title: 'Responded', value: 'responded'},
    ],
    layout: 'radio',
  },
  initialValue: 'new',
  validation: (rule) => rule.required(),
})
