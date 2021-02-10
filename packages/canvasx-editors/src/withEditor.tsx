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

import { flow } from 'lodash';
import { ComponentType as CT } from 'react';
import { withChild, withNodeKey, WithNodeKeyProps } from '@bodiless/core';
import { withPlaceholder } from '@bodiless/components';
import { addClasses, Div } from '@bodiless/fclasses';

const withEditor = (Editor:CT<any>) => (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
) => (
  flow(
    addClasses('overflow-hidden'),
    withChild(flow(
      addClasses('flex-grow'),
      withChild(flow(
        withPlaceholder(placeholder),
        withNodeKey(nodeKey),
      )(Editor)),
    )(Div)),
  )
);

export default withEditor;
export {
  withPlaceholder,
};
