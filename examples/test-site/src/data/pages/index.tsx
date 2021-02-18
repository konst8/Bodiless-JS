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
import flow from 'lodash/flow';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { Div, withDesign } from '@bodiless/fclasses';

import {
  withEditorPlain,
  withEditorBasic,
  withEditorFull,
} from '@canvasx/editors';

const Plain1 = flow(
  withEditorPlain('plain_hoc', 'Plain HOC'),
)(Div);

const extraSanitizer = () => ({
  sanitizer: (html: string) => `${html} extra text`,
});

const Plain2 = flow(
  withEditorPlain('plain_hoc_2', 'Plain HOC extra overrides', extraSanitizer),
)(Div);

const Basic1 = flow(
  withEditorBasic('basic_hoc', 'RTE Basic HOC'),
  withDesign({
    Editor: withDesign({
      Bold: flow(),
    }),
  }),
)(Div);

const Full1 = flow(
  withEditorFull('full_hoc', 'RTE Full HOC'),
)(Div);

const HomePage = (props: any) => (
  <Page {...props}>
    <Plain1 className="p-10" />
    <Plain2 className="p-10" />
    <Basic1 className="p-10" />
    <Full1 className="p-10" />
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;

export default HomePage;
