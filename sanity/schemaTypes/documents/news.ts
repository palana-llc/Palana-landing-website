import {defineField, defineType} from 'sanity';

const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    },
    {
      name: 'description',
      title: 'Brief Description',
      type: 'text',
      validation: rule => rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional. Leave empty for text-only posts.',
    },
    {
      name: 'slug',
      title: 'Slug (in the form )',
      description: 'This is used to generate the URL for the news article. It should be in the format of "word1-word2-wordn".',
      type: 'text',
      validation: rule => rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: rule => rule.required(),
    },
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Updates', value: 'updates'},
          {title: 'Partnerships', value: 'partnerships'},
          {title: 'Features', value: 'features'},
        ],
        layout: 'radio',
      },
    }),
    {
      name: 'contents',
      title: 'News Content',
      type: 'text',
      validation: rule => rule.required(),
    },
    {
      name: 'linkUrl',
      title: 'Related link URL',
      type: 'url',
      description:
        'Optional. Shown at the bottom of the full article (e.g. partner site, press release, or another page).',
    },
    {
      name: 'linkLabel',
      title: 'Related link label',
      type: 'string',
      description: 'Button text for the related link. Defaults to "Learn more" if empty.',
    },
  ],
});

export default news;

