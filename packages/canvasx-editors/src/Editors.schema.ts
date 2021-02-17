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
  WithNodeKeyProps,
} from '@bodiless/core';
import {
  asBlock,
  withButton,
} from '@bodiless/richtext';
import { RichText } from '@bodiless/richtext-ui';
import {
  withDesign,
  replaceWith,
  P,
  stylable,
} from '@bodiless/fclasses';
import {
  asEditable,
  UseEditableOverrides,
} from '@bodiless/components';

const asIndent = flow(
  withButton('format_indent_increase'),
  asBlock,
);

const asParagraph = flow(
  replaceWith(P),
  asBlock,
);

const withSuperScriptSanitizer = () => ({
  sanitizer: (html: string) => html
    .split('')
    .map(c => ('©®'.includes(c) ? `<sup>${c}</sup>` : c))
    .join(''),
});

const asEditorPlain = (
  nodeKeys?: WithNodeKeyProps,
  placeholder?: string,
  useOverrides?: UseEditableOverrides,
) => asEditable(
  nodeKeys,
  placeholder,
  useOverrides || withSuperScriptSanitizer,
);

const identity = (val:any) => val;

const basicSchema = {
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
};

const fullSchema = {
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
};

const StylableRichText = flow(
  stylable,
)(RichText);

const EditorBasic = withDesign(basicSchema)(StylableRichText);
const EditorFull = withDesign(fullSchema)(StylableRichText);

export {
  asEditorPlain,
  EditorBasic,
  EditorFull,
};
