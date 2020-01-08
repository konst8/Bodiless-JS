/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { BVRatingsSummary, BVReviews } from '@bodiless/bv';
import Layout from '../components/Layout';
import {
  ProductTitle,
  ProductImage,
  SectionMargin,
  SectionNegXMargin,
  ProductDetailImageWrapper,
  ProductDetailAccWrapper,
} from '../components/Product';
import { FlexBoxDefault } from '../components/Flexbox';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <SectionMargin>
        <div className="flex flex-wrap md:items-end md:flex-row-reverse">
          <div className="w-full md:flex-1 md:flex-grow-0 md:flex-shrink-0 text-right"><p>Placeholder_for_Share</p></div>
          <div className="w-full md:flex-1">
            <ProductTitle />
          </div>
        </div>
      </SectionMargin>
      <SectionMargin>
        <BVRatingsSummary />
      </SectionMargin>
      <SectionMargin>
        <div className="flex flex-wrap">
          <ProductDetailImageWrapper>
            <ProductImage />
          </ProductDetailImageWrapper>
          <ProductDetailAccWrapper>
            <p>Placeholder for Accordion Details</p>
          </ProductDetailAccWrapper>
        </div>
      </SectionMargin>
      <SectionMargin>
        <BVReviews />
      </SectionMargin>
      <SectionNegXMargin>
        <FlexBoxDefault
          nodeKey="product_touts"
          maxComponents={3}
        />
      </SectionNegXMargin>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
