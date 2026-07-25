import { defineField, defineType } from 'sanity';

const schoolTutorialStep = defineType({
  name: 'schoolTutorialStep',
  title: 'School Tutorial Step',
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
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export default schoolTutorialStep;
