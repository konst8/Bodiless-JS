/* eslint-disable import/prefer-default-export */
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

import React, { FC, ComponentType } from 'react';
import {
  Div, designable, DesignableComponentsProps,
} from '@bodiless/fclasses';

type EditorComponents = {
  EditorWrapper: ComponentType<any>,
  Editor: ComponentType<any>,
};

type EditorProps = DesignableComponentsProps<EditorComponents>;

const EditorComponents: EditorComponents = {
  EditorWrapper: Div,
  Editor: Div,
};

const EditorBase: FC<EditorProps> = ({ components, ...rest }) => {
  const {
    EditorWrapper, Editor,
  } = components;

  return (
    <EditorWrapper>
      <Editor {...rest} />
    </EditorWrapper>
  );
};

const EditorClean = designable(EditorComponents, 'Editor')(EditorBase);

export {
  EditorClean,
};
