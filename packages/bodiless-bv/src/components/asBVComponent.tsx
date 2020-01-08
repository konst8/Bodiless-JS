/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { ComponentType, FC } from 'react';
import { useEditContext } from '@bodiless/core';
import { useBVLoader } from './BVLoader';
import BVLoading from './BVLoading';
import { BVProps } from './BVProps';
import BVProductIsNotMapped from './BVErrors';
import BVPlaceholder from './BVPlaceholder';

const asBVComponent = (
  componentName: string,
  onLoaded?: (bvprops: BVProps) => void,
) => <P extends BVProps>(
  Component: ComponentType<P>,
): FC<P> => (props: P) => {
    const { isEdit } = useEditContext();
    const { productId, ...rest } = props;
    if (!productId) {
      return <BVProductIsNotMapped {...rest} />;
    }
    if (isEdit) {
      return <BVPlaceholder componentName={componentName} {...props} />;
    }
    const { isLoaded } = useBVLoader();
    if (isLoaded && onLoaded) {
      onLoaded({ productId });
    }
    if (!isLoaded) {
      return <BVLoading {...(props as P)} />;
    }
    return <Component {...(props as P)} />;
  };

export default asBVComponent;
