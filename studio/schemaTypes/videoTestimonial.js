import { defineField, defineType } from 'sanity';
import { languageField } from './language';

export default defineType({
  name: 'videoTestimonial',
  title: 'Video Testimonial',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      description: 'e.g. Grade 11 Student, Abu Dhabi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      description: 'Upload an MP4. Leave empty to use the external video URL instead.',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'videoUrl',
      title: 'External video URL',
      description: 'Optional — link to a YouTube/Vimeo hosted video instead of an uploaded file.',
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'thumbnail' },
  },
});
