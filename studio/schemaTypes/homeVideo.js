import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeVideo',
  title: 'Home Video Section',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section heading',
      type: 'string',
      initialValue: "Watch your child's path come to life.",
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      description: 'Upload an MP4. Leave empty to use the external video URL instead, or to keep the placeholder mockup.',
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
      name: 'poster',
      title: 'Poster / thumbnail image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Floating badge label',
      description: 'e.g. "Career DNA Report"',
      type: 'string',
      initialValue: 'Career DNA Report',
    }),
    defineField({
      name: 'captionTitle',
      title: 'Caption title',
      description: 'e.g. "Your Career Pathway Report"',
      type: 'string',
      initialValue: 'Your Career Pathway Report',
    }),
    defineField({
      name: 'captionSubtitle',
      title: 'Caption subtitle',
      description: 'e.g. "Personalised · 3 min · AI-generated"',
      type: 'string',
      initialValue: 'Personalised · 3 min · AI-generated',
    }),
    defineField({
      name: 'careerTags',
      title: 'Career tags',
      description: 'Short labels shown above the progress bar, e.g. UX Designer, Data Analyst, Architect',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Video Section' }),
  },
});
