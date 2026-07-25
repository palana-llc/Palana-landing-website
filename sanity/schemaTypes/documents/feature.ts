import { defineField, defineType } from 'sanity';

const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      description: 'React-icons identifier, e.g. "FaSearchLocation". Must match an entry in the icon lookup map in code.',
      type: 'string',
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
});

export default feature;
