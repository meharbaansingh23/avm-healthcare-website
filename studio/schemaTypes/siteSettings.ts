import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Singleton: exactly one siteSettings document should ever exist. It is pinned
 * in the structure (see sanity.config.ts) and hidden from the "create new"
 * menu, so editors reach it only through the Site Settings entry.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'address', title: 'Address', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description:
        'WhatsApp number including country code, digits only (e.g. 919810345155) — no spaces, no +, no leading 0.',
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'certificationWording',
      title: 'Certification Wording',
      type: 'text',
      rows: 4,
      description:
        'The exact certification claim text used across the site. Edit here so every page stays consistent.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
