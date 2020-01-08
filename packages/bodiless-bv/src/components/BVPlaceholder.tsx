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

import React, { FC, HTMLProps } from 'react';
import { BVProps } from './BVProps';

type DivProps = HTMLProps<HTMLDivElement>;

type Props = DivProps & BVProps;

const BVPlaceholder: FC<Props> = ({ componentName, productId, ...rest }) => {
  const BVWidgetName = componentName || 'BV widget';
  return (
    <div {...rest}>
      {`
      ${BVWidgetName} with Product External Id: "${productId}" will be rendered here.
      If your domain is whitelisted, you will see BV generated widget in preview mode.
    `}
    </div>
  );
};

export default BVPlaceholder;
