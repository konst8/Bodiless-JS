/**
 * Copyright © 2021 Johnson & Johnson
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
import flow from 'lodash/flow';
import identity from 'lodash/identity';
import { withDesign, replaceWith, P } from '@bodiless/fclasses';
import {
  asBlock,
  withButton,
} from '@bodiless/richtext';
import {
  asBold,
  withItalic,
  withLinkStyle,
  asUnderline,
  withTextAlignLeft,
  withTextAlignRight,
  withTextAlignCenter,
  withTextAlignJustify,
  asSuperScript,
  asHeader1,
  asHeader2,
  asHeader3,
  withIndent,
} from './Typography.token';

const asIndent = flow(
  withButton('format_indent_increase'),
  asBlock,
);

const asParagraph = flow(
  replaceWith(P),
  asBlock,
);

const withBasicEditorButtons = withDesign({
  Bold: identity,
  Italic: identity,
  Underline: identity,
  Link: identity,
  SuperScript: identity,
  AlignLeft: identity,
  AlignRight: identity,
  AlignJustify: identity,
  AlignCenter: identity,
  H2: identity,
  H3: identity,
  paragraph: asParagraph,
  Indent: asIndent,
});

const withFullEditorButtons = withDesign({
  Bold: identity,
  Italic: identity,
  Underline: identity,
  Link: identity,
  SuperScript: identity,
  AlignLeft: identity,
  AlignRight: identity,
  AlignJustify: identity,
  AlignCenter: identity,
  H1: identity,
  H2: identity,
  H3: identity,
  paragraph: asParagraph,
  Indent: asIndent,
});

const withBasicTypography = withDesign({
  Bold: asBold,
  Italic: withItalic,
  Underline: asUnderline,
  Link: withLinkStyle,
  SuperScript: asSuperScript,
  AlignLeft: withTextAlignLeft,
  AlignRight: withTextAlignRight,
  AlignJustify: withTextAlignJustify,
  AlignCenter: withTextAlignCenter,
  H2: asHeader2,
  H3: asHeader3,
  Indent: withIndent,
});

const withFullTypography = flow(
  withBasicTypography,
  withDesign({
    H1: asHeader1,
  }),
);

export {
  withBasicEditorButtons,
  withFullEditorButtons,
  withBasicTypography,
  withFullTypography,
};
