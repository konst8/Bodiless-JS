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
import { flow } from 'lodash';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { Div } from '@bodiless/fclasses';

import {
  EditorPlainText,
  EditorRichTextBasic,
  EditorRichTextFull,
  withEditorPlainText,
  withEditorRichTextBasic,
  withEditorRichTextFull,
  withPlaceholder,
} from '@canvasx/editors';

const Plain1 = flow(
  withPlaceholder('plain 1'),
  withEditorPlainText(),
)(Div);

const Basic1 = flow(
  withPlaceholder('basic 1'),
  withEditorRichTextBasic(),
)(Div);

const Full1 = flow(
  withPlaceholder('full 1'),
  withEditorRichTextFull(),
)(Div);

const HomePage = (props: any) => (
  <Page {...props}>
    <EditorPlainText className="p-10" nodeKey="plain" placeholder="plain" />
    <EditorRichTextBasic className="p-10" nodeKey="basic" placeholder="basic" />
    <EditorRichTextFull className="p-10" nodeKey="full" placeholder="full" />
    <Plain1 className="p-10" nodeKey="plain-hoc" placeholder="plain hoc" />
    <Basic1 className="p-10" nodeKey="basic-hoc" placeholder="basic hoc" />
    <Full1 className="p-10" nodeKey="full-hoc" placeholder="full hoc" />
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;

export default HomePage;
