import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

export interface PrismicConfiguration {
  apiEndpoint: string;
  accessToken?: string;
  linkResolver: () => void;
  ref?: string;
  introspectionFragmentMatcher?: IntrospectionFragmentMatcher;
}
