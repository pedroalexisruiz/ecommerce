import { PrismicGraphqlService } from '../prismic-graphql/prismic-graphql.service';
import { PrismicConfiguration } from '../prismic-graphql/prismic-configuration';

export class PrismicPreviewResolver {
  constructor(
    private corePrismicService: PrismicGraphqlService,
    private config: PrismicConfiguration
  ) {}

  setPrismicPreviewToken() {
    const ref = this.getParameterByName('token');
    this.config.ref = ref;
    this.corePrismicService.setConfigPrismic(this.config);
  }

  private getParameterByName(name: string) {
    const url = window.location.href;
    name = name.replace(/[[]]/g, '$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace('/+/g', ' '));
  }
}
