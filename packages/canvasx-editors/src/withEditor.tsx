/**
 * Copyright © 2020 Johnson & Johnson
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
import { ComponentType as CT } from 'react';
import flow from 'lodash/flow';
import { withChild, withNodeKey, WithNodeKeyProps } from '@bodiless/core';
import { withPlaceholder } from '@bodiless/components';
import {
  RichText,
} from '@bodiless/richtext-ui';
import { stylable } from '@bodiless/fclasses';
import {
  asEditorPlain,
  withBasicEditorButtons,
  withFullEditorButtons,
} from './Editors.schema';
import { withBasicTypography, withFullTypography } from './Typography.token';

const withEditor = (Editor:CT<any>) => (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
) => withChild(
  flow(
    withPlaceholder(placeholder),
    withNodeKey(nodeKey),
  )(Editor),
  'Editor', // design key
);

const withEditorPlain = asEditorPlain;

const EditorBasicClean = flow(
  stylable,
  withBasicEditorButtons,
)(RichText);

const EditorBasic = flow(
  withBasicTypography,
)(EditorBasicClean);

const withEditorBasicClean = flow(
  withEditor(EditorBasicClean),
);

const withEditorBasic = flow(
  withEditorBasicClean,
  withBasicTypography,
);

const EditorFullClean = flow(
  stylable,
  withFullEditorButtons,
)(RichText);

const EditorFull = flow(
  withFullTypography,
)(EditorFullClean);

const withEditorFullClean = flow(
  withEditor(EditorFullClean),
);

const withEditorFull = flow(
  withEditorFullClean,
  withFullTypography,
);

export {
  withEditor,
  withEditorPlain,
  withEditorBasicClean,
  withEditorFullClean,
  withEditorBasic,
  withEditorFull,
  EditorBasicClean,
  EditorFullClean,
  EditorBasic,
  EditorFull,
};
