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
import { RichText } from '@bodiless/richtext-ui';
import {
  // Div,
  withDesign,
} from '@bodiless/fclasses';
import {
  asEditable as asBodilessEditable,
} from '@bodiless/components';
import withEditor from './withEditor';
import { EditorClean } from './EditorsClean';
import {
  asBold,
  asItalic,
  asLink,
  asUnderline,
  asAlignLeft,
  asAlignRight,
  asAlignCenter,
  asAlignJustify,
  asSuperScript,
  asHeader1,
  asHeader2,
  asHeader3,
  asIndent,
  asParagraph,
} from './Editors.token';

const simpleDesign = {
  SuperScript: asSuperScript,
};

const basicDesign = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: asLink,
  ...simpleDesign,
  AlignLeft: asAlignLeft,
  AlignRight: asAlignRight,
  AlignJustify: asAlignJustify,
  AlignCenter: asAlignCenter,
  H2: asHeader2,
  H3: asHeader3,
};

const fullDesign = {
  ...basicDesign,
  paragraph: asParagraph,
  H1: asHeader1,
  Indent: asIndent,
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
    Editor: asEditorPlainText('testEditorPlainText', 'edit plain text'),
  }),
)(EditorClean);

// @ts-ignore
const EditorRichTextBasic = withDesign(basicDesign)(RichText);
// @ts-ignore
const EditorRichTextFull = withDesign(fullDesign)(RichText);
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
