import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import * as Prismic from 'prismic-javascript';

const PRISMIC_ENDPOINT_REG = /^(https?):\/\/([^.]+)\.(cdn.)?([^.]+\.[^.]+)\/graphql\/?$/;
const parseURI = endpoint => {
  const [, protocol, repository, cdn, domain] = endpoint.match(
    PRISMIC_ENDPOINT_REG
  );

  if (protocol && repository && domain) {
    return {
      protocol,
      repository,
      domain,
    };
  }

  return null;
};

export const PrismicLink = (prismicLinkData: PrismicLinkData) => {
  const parsedURI = parseURI(prismicLinkData.uri);

  if (parseURI) {
    const { protocol, repository, domain } = parsedURI;
    const baseURI = `${protocol}://${repository}.cdn.${domain}`;
    const prismicClient = Prismic.client(`${baseURI}/api`, {
      accessToken: prismicLinkData.accessToken,
    });
    const prismicLink = setContext((request, options) => {
      return prismicClient.getApi().then(api => {
        const authorizationHeader = prismicLinkData.accessToken
          ? { Authorization: `Token ${prismicLinkData.accessToken}` }
          : {};
        return {
          headers: {
            'Prismic-ref': prismicLinkData.ref
              ? prismicLinkData.ref
              : api.masterRef.ref,
            ...options.headers,
            ...authorizationHeader,
          },
        };
      });
    });

    const httpLink = new HttpLink({
      uri: `${baseURI}/graphql`,
      useGETForQueries: true,
    });

    return prismicLink.concat(httpLink);
  } else {
    throw new Error(
      `${prismicLinkData.uri} no es un endpoint válido de Prismic GraphQL`
    );
  }
};

interface PrismicLinkData {
  uri: string;
  accessToken: string;
  ref?: string;
}
