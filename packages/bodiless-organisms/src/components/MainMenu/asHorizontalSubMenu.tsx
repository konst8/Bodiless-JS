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
import { withDesign, addProps, addClasses } from '@bodiless/fclasses';

/**
 * HOC, sets the Submenu in a horizontal menu and setups the offset of submenu,
 * to zero, so it will be rendered render right after the submenu <Item />
 */
const asHorizontalSubMenu = withDesign({
  Wrapper: flow(
    addClasses('inline-block'),
    addProps({ popupOffset: '[0,0]' }),
  ),
  Item: addClasses('block'),
});

export default asHorizontalSubMenu;
