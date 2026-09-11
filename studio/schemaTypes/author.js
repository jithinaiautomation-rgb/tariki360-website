import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      description: 'e.g. Head of Curriculum, Tariki 360',
      type: 'string',
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      description: 'Shown in the avatar circle, e.g. "AF"',
      type: 'string',
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
});
