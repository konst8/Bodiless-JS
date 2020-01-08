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

import { ComponentType } from 'react';
import { flow } from 'lodash';
import {
  RichTextItemObject,
  RichTextItemInput,
  RichTextItemType,
} from './Type';
import { getData } from './RichTextItemGetters';

/**
 * With Component returns a function that will add the provided Componet to a RichTextItem.
 */
const withComponent = <P extends object> (Component:ComponentType<P>) => (
  (data:RichTextItemInput<P>) => (
    { ...getData(data), component: Component }
  )
);

/**
 * asBlock returns a function that will add the fact that an item is a block to a RichTextItem.

 */
const asBlock = <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), type: RichTextItemType.block }
);

/**
 * asInline returns a function that will add the fact that
 * an item is an inline to a RichTextItem.
 */
const asInline = <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), type: RichTextItemType.inline }
);

/**
 * asMark returns a function that will add the fact that an item is a mark to a RichTextItem.
*/
const asMark = <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), type: RichTextItemType.mark }
);

/**
 * asVoid marks the item to be inserted as a void item
*/
const asVoid = <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), isVoid: true }
);

/**
 * asAtomicBlock marks the item to be inserted as block
 */
const asAtomicBlock = <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), isAtomicBlock: true }
);

/**
 * withKey will return a function that will add a keyboardKey to a RichTextItem.
*/
const withKey = (key:string) => <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), keyboardKey: key }
);

/**
 * withId will return a function that will add a Id to a RichTextItem.
*/
const withId = (id:string) => <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), id }
);

/**
 * withGlobalButton will return a function that will add a GlobalButton to a RichTextItem.
*/
const withGlobalButton = (icon:string) => <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), globalButton: { icon } }
);

/**
 * withHoverButton will return a function that will add a HoverButton to a RichTextItem.
*/
const withHoverButton = (icon:string) => <P extends object> (data:RichTextItemInput<P>) => (
  { ...getData(data), hoverButton: { icon } }
);

/**
 * withButton will return a function that will add a hover or global button depending on the type.
*/
const withButton = (icon:string) => <P extends object> (input:RichTextItemInput<P>) => {
  const data = getData(input);
  return withHoverButton(icon)(data);
};

/*
  withMethod will add a set of methods to a RichTextItemInput that
  can be used to chain actions on the item
*/
const withMethods = <P extends object> (input:RichTextItemInput<P>) => {
  const data:RichTextItemObject<P> = {
    ...getData(input),
    // @ts-ignore ignoring that flow can not take 0 arguments.
    flow: (...funcs: Function[]) => withMethods(flow(...funcs)(data)),
    asBlock: () => data.flow(asBlock),
    asMark: () => data.flow(asMark),
    asInline: () => data.flow(asInline),
    withButton: (icon:string) => data.flow(withButton(icon)),
    withId: (id:string) => data.flow(withId(id)),
    withKey: (key:string) => data.flow(withKey(key)),
  };
  return data;
};
/*
  asItem takes a component and returns a Function that will add a component to a item
  but also it wrapps that in withMethods so one can chain items.
*/
const asItem = (Component:ComponentType) => withMethods(withComponent(Component));

export {
  withComponent,
  asItem,
  asBlock,
  asInline,
  asMark,
  asVoid,
  asAtomicBlock,
  withKey,
  withId,
  withButton,
  withGlobalButton,
  withHoverButton,
};
