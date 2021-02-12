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
import { stylable } from '@bodiless/fclasses';
import {
  EditorPlainTextBase,
  EditorRichTextBasicBase,
  EditorRichTextFullBase,
} from './Editors.schema';
import { withEditorDefaultStyles } from './Editors.token';

const EditorPlainText = flow(
  withEditorDefaultStyles,
)(EditorPlainTextBase);

const EditorRichTextBasic = flow(
  stylable,
  withEditorDefaultStyles,
)(EditorRichTextBasicBase);

const EditorRichTextFull = flow(
  stylable,
  withEditorDefaultStyles,
)(EditorRichTextFullBase);

export {
  EditorPlainText,
  EditorRichTextBasic,
  EditorRichTextFull,
};
