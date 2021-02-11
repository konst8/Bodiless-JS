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

import { flow } from 'lodash';
import { WithNodeKeyProps } from '@bodiless/core';
import {
  asBlock,
  withKey,
  withButton,
} from '@bodiless/richtext';
import { RichText } from '@bodiless/richtext-ui';
import {
  withDesign,
  replaceWith,
  P,
} from '@bodiless/fclasses';
import {
  asEditable as asBodilessEditable,
} from '@bodiless/components';
import withEditor from './withEditor';
import { EditorClean } from './EditorsClean';

const asIndent = flow(
  withKey('indent'),
  withButton('format_indent_increase'),
  asBlock,
);

const asParagraph = flow(
  replaceWith(P),
  asBlock,
);

const basicSchema = {
  Bold: flow(),
  Italic: flow(),
  Underline: flow(),
  Link: flow(),
  SuperScript: flow(),
  AlignLeft: flow(),
  AlignRight: flow(),
  AlignJustify: flow(),
  AlignCenter: flow(),
  H2: flow(),
  H3: flow(),
  paragraph: asParagraph,
  Indent: asIndent,
};

const fullSchema = {
  ...basicSchema,
  H1: flow(),
};

const asEditorPlainText = (nodeKeys?: WithNodeKeyProps, placeholder?: string) => asBodilessEditable(
  nodeKeys,
  placeholder,
  // Overrides to add auto-superscript.
  () => ({
    sanitizer: (html: string) => html
      .split('')
      .map(c => ('©®'.includes(c) ? `<sup>${c}</sup>` : c))
      .join(''),
  }),
);

const EditorPlainText = flow(
  withDesign({
    Editor: asEditorPlainText(),
  }),
)(EditorClean);

const EditorRichTextBasicBase = withDesign(basicSchema)(RichText as any);
const EditorRichTextBasic = flow(
  withDesign({
    Editor: replaceWith(EditorRichTextBasicBase),
  }),
)(EditorClean);

const EditorRichTextFullBase = withDesign(fullSchema)(RichText as any);
const EditorRichTextFull = flow(
  withDesign({
    Editor: replaceWith(EditorRichTextFullBase),
  }),
)(EditorClean);

const withEditorPlainText = withEditor(EditorPlainText);
const withEditorRichTextBasic = withEditor(EditorRichTextBasic);
const withEditorRichTextFull = withEditor(EditorRichTextFull);

export {
  EditorPlainText,
  EditorRichTextBasic,
  EditorRichTextFull,
  withEditorPlainText,
  withEditorRichTextBasic,
  withEditorRichTextFull,
};
