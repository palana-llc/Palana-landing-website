import { defineField, defineType } from 'sanity';

const studentTutorialStep = defineType({
  name: 'studentTutorialStep',
  title: 'Student Tutorial Step',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: rule => rule.required().integer().positive(),
    }),
    defineField({
      name: 'phoneScreenImage',
      title: 'Phone Screen Image',
      type: 'image',
    }),
    defineField({
      name: 'phoneScreenVideo',
      title: 'Phone Screen Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export default studentTutorialStep;
