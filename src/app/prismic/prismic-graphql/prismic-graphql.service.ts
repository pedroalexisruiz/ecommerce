import { PrismicConfiguration } from './prismic-configuration';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { PrismicLink } from './prismic-graphql-util';

export class PrismicGraphqlService {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor() {}

  setConfigPrismic(config: PrismicConfiguration): void {
    const configuration = config;
    const cache = configuration.introspectionFragmentMatcher
      ? new InMemoryCache({
          fragmentMatcher: configuration.introspectionFragmentMatcher,
        })
      : new InMemoryCache();
    const link = PrismicLink({
      uri: configuration.apiEndpoint,
      accessToken: configuration.accessToken,
      ref: configuration.ref,
    });
    this.client = new ApolloClient({
      link,
      cache,
    });
  }

  executeQuery(query): Promise<any> {
    return this.client.query({
      query: gql`
        ${query}
      `,
    });
  }
}
