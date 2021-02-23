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
import {
  withDesign,
  replaceWith,
  P,
  asToken,
} from '@bodiless/fclasses';
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
} from './Typography.token';
import {
  withIndent,
} from './Spacing.token';

const asIndent = flow(
  withButton('format_indent_increase'),
  asBlock,
);

const asParagraph = flow(
  replaceWith(P),
  asBlock,
);

const withBasicTypography = asToken(
  withDesign({
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
    paragraph: asParagraph,
    Indent: flow(
      asIndent,
      withIndent,
    ),
  }) as any,
  {
    categories: {
      Category: ['Editor'],
      Attribute: ['Basic'],
    },
  },
);

const withFullTypography = asToken(
  withBasicTypography,
  withDesign({
    H1: asHeader1,
  }) as any,
  {
    categories: {
      Category: ['Editor'],
      Attribute: ['Full'],
    },
  },
);

export {
  withBasicTypography,
  withFullTypography,
};
