import {defineField, defineType} from 'sanity';

const people = defineType({
  name: 'people',
  title: 'People',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: rule => rule.required(),
    },
    {
      name: 'founder',
      title: 'Founder',
      type: 'boolean',
      validation: rule => rule.required(),
    },
    {
      name: 'team',
      title: 'Team',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile Dev', value: 'Mobile Dev' },
          { title: 'UI/UX', value: 'UI/UX' },
          { title: 'Web Dev', value: 'Web Dev' },
          { title: 'Marketing', value: 'Marketing' },
        ],
      },
      validation: rule => rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: rule => rule.required(),
    }, 
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url'
    }, 
    {
      name: 'current',
      title: 'Current',
      type: 'boolean',
      validation: rule => rule.required(),
    }
  ],
});

export default people;

