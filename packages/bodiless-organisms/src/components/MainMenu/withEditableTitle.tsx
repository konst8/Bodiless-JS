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
import { flow } from 'lodash';
import { withDesign } from '@bodiless/fclasses';
import { asBodilessLink, asEditable, withLinkToggle } from '@bodiless/components';
import { withNode, withNodeKey } from '@bodiless/core';

/**
 * HOC, that injects editable link toggle component into component design (usually Menu or Submenu)
 */
const withEditableTitle = withDesign({
  Title: flow(
    asBodilessLink('title-link'),
    withLinkToggle,
    withNode,
    withNodeKey('title'),
    asEditable('text', 'Menu Item'),
  ),
});

export default withEditableTitle;
