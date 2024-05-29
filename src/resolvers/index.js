import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getNotes', async (req) => {
  const response = await fetch('https://tspc--uat.sandbox.my.salesforce-sites.com/services/apexrest/api/release-info/tspc');
  return await response.json();
});

export const handler = resolver.getDefinitions();

