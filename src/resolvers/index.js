import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

const mockData = [
  {
    name: 'Release 1.285',
    releaseDate: '2024-05-06',
    versionId: '',
    versionNumber: '1.285',
    items: [{
      module: 'Common',
      title: '',
      type: 'feature',
      tickets: 'CP-1234',
      docLink: '',
      description: [
        'Added client/server currency conversion related utilities',
        'Extending the ability to search for opportunities by specific fields to Opportunity standalone view',
        'Modified the record page layout selection in the PDF export to reflect the page layout assignment configuration and returned a layout that would display the record detail for that user.',
        'Minor enhancement, refactoring'
      ]
    },
    {
      module: 'Account Plan',
      type: 'feature',
      description: [
        'Added support for currency conversion for multi-currency orgs.',
        'Whitespace number formatting fixes',
      ]
    },
    {
      module: 'Opportunity',
      type: 'bug',
      description: [
        'Fixed an issue where the ClosePlan Tabs component was displaying a license warning for a licensed user.',
        'Added ability to surface ClosePlan from parent Opportunity in its descendants',
      ]
    },
    {
      module: 'Opportunity: Playbook',
      type: 'new',
      description: [
        'Minor fixes in usage tracking when opening PDF Export.'
      ]
    },
    {
      module: 'Scorecard',
      type: 'bug',
      description: [
        'PDF Export now renders Rich-text answers in original HMTL form instead of extracted plain-text',
        'he dashboard charting library has been replaced by the Highcharts library to make it consistent with the rest of the application',
        'Ability to render Scorecard VFP page component within Experience cloud without surrounding Community page'
      ]
    },
    {
      module: 'Relationship Maps',
      type: 'bug',
      description: [
        'ZoomInfo Integration: improved duplicate management so that identified duplicates are automatically displayed in the list of duplicate removal tool.',
        ' Organiram: Minor update to the way contacts that report to someone outside the current account are presented and handled'
      ]
    },
    {
      module: 'Admin',
      type: 'bug',
      description: [
        'Picklist field value configurators were enhanced with capability to Find/Replace values currently in use.',
        'Optimization of error handling when importing templates with modified Playbook that contain errors in references',
        'Fixed an issue where the help center could display a "no content" message instead of content.',
        'Added ability to target other People.ai API environments then the production to support debugging or early testing.',
        'An option has been added to the User Manager to revoke all licenses that are currently occupied by inactive SFDC users.'
      ]
    }
  ]
  },
  {
    name: 'Release 1.284',
    releaseDate: '2024-04-1',
    versionId: '',
    versionNumber: '1.284',
    items: [{
      module: 'Common',
      type: 'new',
      description: [
        'PDF Export enhancements / fixes',
        'Added ZoomInfo integration usage tracking',
        'Task creation behavior enhancements',
        'Minor enhancements',
        'Ability to search for opportunities using additional configured fields'
      ]
    },
    {
      module: 'Account Plan',
      type: 'feature',
      description: [
        'Unlocking restrictions to allow account plans to be reparented under a different account.'
      ]
    },
    {
      module: 'Opportunity: Playbook',
      type: 'feature',
      description: [
        'Removed independent save/submit button for Key Opportunity fields when editing Event. Fields will be saved automatically when the Event is saved.',
        'Support for additional custom states for the Playbook event. Such statuses will be treated as "In Progress" type.',
        'Fixed an issue when creating Event with Checklist in a Gantt chart where the message "Not Found" was displayed.'
      ]
    },
    {
      module: 'Scorecard',
      type: 'bug',
      description: [
        'Contact tracking enhancements',
        'Added Scorecard outline in the Question detail modal to easily navigate between questions and autosave option on transition.'
      ]
    },
    {
      module: 'Relationship Maps',
      type: 'new',
      description: [
        'Fixed an issue where the phone field was still visible in the stakeholder detail even though it was disabled.',
        'Fixed unhandled error issues when opening Contact detail in Organigram',
        'Minor fixes related to Map Import',
        'Fixed issue where duplicate notification remains visible when creating a new contact from ZoomInfo Integration'
      ]
    }
  ]
  },
];

resolver.define('getMockData', (req) => {
  console.log('mockData', mockData);
  return mockData;
});

resolver.define('getNotes', async (req) => {
  const response = await fetch('https://tspc--uat.sandbox.my.salesforce-sites.com/services/apexrest/api/release-info/tspc');
  console.log('response', response);
  return await response.json();
});

export const handler = resolver.getDefinitions();

