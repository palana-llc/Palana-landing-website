import { defineField, defineType } from 'sanity';

const laptopFeature = defineType({
  name: 'laptopFeature',
  title: 'Laptop Feature',
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
      name: 'laptopScreenImage',
      title: 'Laptop Screen Image',
      type: 'image',
    }),
    defineField({
      name: 'laptopScreenVideo',
      title: 'Laptop Screen Video (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
  ],
});

export default laptopFeature;
