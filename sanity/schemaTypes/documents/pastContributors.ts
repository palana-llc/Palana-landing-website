import {defineField, defineType} from 'sanity';

const pastContributors = defineType({
  name: 'pastContributors',
  title: 'Past Contributors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string'
    },
    {
      name: 'cohort',
      title: 'Start Cohort (AU25, SU25, SP25, ...)',
      type: 'string',
      validation: rule => rule.required(),
    }
  ],
});

export default pastContributors;

