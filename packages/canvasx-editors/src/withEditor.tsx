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
import { stylable, asToken } from '@bodiless/fclasses';
import {
  EditorPlain,
  asEditorPlain,
} from './Editors.schema';
import {
  withBasicTypography,
  withFullTypography,
} from './RichText.token';

const withEditor = (Editor:CT<any>) => (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
) => asToken(
  withChild(
    flow(
      withPlaceholder(placeholder),
      withNodeKey(nodeKey),
    )(Editor),
    'Editor', // design key
  ),
  {
    categories: {
      Category: ['Editor'],
      Component: ['RichText'],
    },
  },
);

const withEditorPlain = asEditorPlain;

const EditorBasicClean = flow(
  stylable,
)(RichText);

const EditorFullClean = EditorBasicClean;

const EditorBasic = asToken(
  withBasicTypography as any,
  {
    categories: {
      Category: ['Editor'],
      Attribute: ['Basic'],
    },
  },
)(EditorBasicClean);

const withEditorBasicClean = flow(
  withEditor(EditorBasicClean),
);

const withEditorBasic = flow(
  withEditor(EditorBasic),
);

const EditorFull = asToken(
  withFullTypography as any,
  {
    categories: {
      Category: ['Editor'],
      Attribute: ['Full'],
    },
  },
)(EditorFullClean);

const withEditorFullClean = flow(
  withEditor(EditorFullClean),
);

const withEditorFull = flow(
  withEditor(EditorFull),
);

export {
  withEditor,
  withEditorPlain,
  withEditorBasicClean,
  withEditorFullClean,
  withEditorBasic,
  withEditorFull,
  EditorPlain,
  EditorBasicClean,
  EditorFullClean,
  EditorBasic,
  EditorFull,
  withBasicTypography,
  withFullTypography,
};
