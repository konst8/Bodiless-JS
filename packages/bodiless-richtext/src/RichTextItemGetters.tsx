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

import React, { ComponentType } from 'react';
import { Value, Editor, SchemaProperties } from 'slate';
import { v1 } from 'uuid';
import { useNode, NodeProvider, withoutProps } from '@bodiless/core';
import { RenderNodeProps } from 'slate-react';
import { flow } from 'lodash';
import {
  createBlockButton,
  createInlineButton,
  createMarkButton,
  createNodeRenderPlugin,
  createMarkRenderPlugin,
  createKeyboardPlugin,
  blockUtils,
  hasInline,
  hasMark,
  toggleInline,
  toggleMark,
  createToggleMark,
  createToggleInline,
  withToggle,
  updateInline,
} from './plugin-factory';
import {
  RichTextItem,
  RichTextItemInput,
  RichTextItemType,
} from './Type';
import { useUI } from './RichTextContext';

const defaultItem = () => ({
  type: RichTextItemType.block,
});
/*
  getData will return a RichTextItem that combines the default
  Item with the hoc or Item passed in.
*/
const getData = <P extends object> (data:RichTextItemInput<P>):RichTextItem<P> => (
  typeof data === 'function'
    ? data(defaultItem)
    : { ...defaultItem, ...data });

const addAttributes = <P extends object> (Component:ComponentType<P>) => (
  (props:P & RenderNodeProps) => {
    const { attributes } = props;
    return <Component {...props} {...attributes} />;
  }
);
const SlateComponentProvider = (update:Function) => (
  <P extends object, D extends object>(Component:ComponentType<P>) => (
    (props:P & RenderNodeProps) => {
      const { editor, node } = props;
      const data = node.data.toJS();
      const newData = { nodeKey: v1() };
      if (!data.nodeKey) {
        update({ node, editor, componentData: newData });
      }
      const nodeKey = data.nodeKey || newData.nodeKey;
      // We might need to understand if we need a nodecollection
      const contentNode = useNode<D>().node.child(nodeKey);
      return (
        <NodeProvider node={contentNode}>
          <Component {...props} />
        </NodeProvider>
      );
    }
  )
);

/*
  getPlugin will use the data passed in build a slate Plugin that can be passed to a slate editor.
*/
const getRenderPlugin = <P extends object> (data:RichTextItemInput<P>) => {
  const {
    component,
    type,
    id,
    isVoid,
  } = getData(data);
  const { creates, WrappedComponent } = {
    [RichTextItemType.block]: {
      creates: createNodeRenderPlugin,
      WrappedComponent: SlateComponentProvider(blockUtils.updateBlock)(component),
    },
    [RichTextItemType.inline]: {
      creates: createNodeRenderPlugin,
      WrappedComponent: SlateComponentProvider(updateInline)(component),
    },
    [RichTextItemType.mark]: {
      creates: createMarkRenderPlugin,
      WrappedComponent: component,
    },
  }[type];
  // Clean up th component to add Attributes and remove unused props.
  const CleanComponent = flow(
    withoutProps(['isFocused', 'isSelected']),
    // Remove Children if Void Component.
    withoutProps(isVoid ? ['children'] : []),
    addAttributes,
  )(WrappedComponent as ComponentType<P & RenderNodeProps>);
  return creates({
    Component: CleanComponent,
    type: id,
  });
};
const getShortcutPlugin = <P extends object> (data:RichTextItemInput<P>) => {
  const {
    type,
    id,
    keyboardKey,
  } = getData(data);
  if (!keyboardKey) {
    throw Error('keyboardKey need to get ShortcutPlugin');
  }
  const toggle = {
    [RichTextItemType.block]: blockUtils.createToggleBlock(id),
    [RichTextItemType.mark]: createToggleMark(id),
    [RichTextItemType.inline]: createToggleInline(id),

  }[type];
  return createKeyboardPlugin({
    toggle,
    key: keyboardKey,
  });
};
/*
  getPlugins takes an array of data items and pass them though to getPlugin
*/
const getPlugins = (datas:RichTextItem<any>[]) => [
  ...datas.map(data => getRenderPlugin(data)),
  ...datas.filter(data => data.keyboardKey).map(data => getShortcutPlugin(data)),
];
/*
  get HoverButton takes a Item and convert it
*/
const getHoverButton = <P extends object> (data:RichTextItem<P>) => {
  if (!data.hoverButton) {
    throw new Error('getHoverButton requires a hoverButton property on RichTextItem');
  }
  const creates = {
    [RichTextItemType.block]: createBlockButton,
    [RichTextItemType.inline]: createInlineButton,
    [RichTextItemType.mark]: createMarkButton,
  };
  return creates[data.type](data.id, data.hoverButton.icon);
};

/*
  getHoverButtons takes a array of Rich Text Items and maps that to a set of Hover Buttons
*/
const getHoverButtons = (datas:RichTextItem<any>[]) => datas
  .filter(data => data.hoverButton)
  .map(data => getHoverButton(data));

const getGlobalButton = (data: RichTextItem<any>) => (editor: Editor) => {
  if (data.globalButton) {
    return {
      icon: data.globalButton.icon,
      name: data.id,
      global: true,
      isActive: () => blockUtils.hasBlock(editor.value, data.id),
      handler: () => {
        const options = {
          editor,
          blockType: data.id,
          value: editor.value,
        };
        if (data.isAtomicBlock) {
          blockUtils.insertBlock(options);
        } else {
          blockUtils.toggleBlock(options);
        }
      },
    };
  }
  return null;
};
const getSchema = <D extends object>(datas:RichTextItem<any>[]) => (
  datas.filter(data => data.isVoid)
    .reduce((previous, data) => {
      const next = { ...previous };
      const type = data.type === RichTextItemType.block ? 'blocks' : 'inlines';
      if (!(type in next)) {
        next[type] = {};
      }
      if (!(data.id in next[type]!)) {
        next[type]![data.id] = {};
      }
      next[type]![data.id].isVoid = true;
      return next;
    }, {} as SchemaProperties)
);
type getSelectorButtonToggleType = {
  value: Value,
  editor: Editor,
  name: string,
};
type getSelectorButtonToggleMarkType = {
  editor: Editor,
  name: string,
};
/*
  getSelectorButton takes a Rich Text Item and returns a button used in the RichText Selector
*/
const getSelectorButton = <P extends object> (data:RichTextItem<P>) => (props:P) => {
  const { toggleFuc, has } = {
    [RichTextItemType.block]: {
      toggleFuc: ({ value, editor, name }:getSelectorButtonToggleType) => (
        blockUtils.toggleBlock({ value, editor, blockType: name })
      ),
      has: blockUtils.hasBlock,
    },
    [RichTextItemType.inline]: {
      toggleFuc: ({ value, editor, name }:getSelectorButtonToggleType) => (
        toggleInline({ value, editor, inlineType: name })
      ),
      has: hasInline,
    },
    [RichTextItemType.mark]: {
      toggleFuc: ({ editor, name }:getSelectorButtonToggleMarkType) => (
        toggleMark({ editor, markType: name })
      ),
      has: hasMark,
    },
  }[data.type];
  const { ClickableWrapper } = useUI();
  const Component = data.component;
  const Button:ComponentType = withToggle({
    toggle: ({ value, editor }) => {
      toggleFuc({ value, editor, name: data.id });
    },
    isActive: value => has(value, data.id),
    icon: 'none',
  })(ClickableWrapper);
  return <Button><Component {...props}>Lorem ipsum dolor</Component></Button>;
};

/*
  getSelectorButtons takes an array of RichTextitems and maps that to a array of buttons
  used in the Rich Text selector
*/
const getSelectorButtons = (datas:RichTextItem<any>[]) => datas
  .filter(data => data.type !== RichTextItemType.block)
  .map(data => getSelectorButton(data));
/*
  getGlobalButtons takes an array of RichTextitems and maps that to a array of objects used
  to create global buttons
*/
const getGlobalButtons = (datas:RichTextItem<any>[]) => (editor:Editor) => datas
  .filter(data => data.globalButton)
  .map(data => getGlobalButton(data)(editor));

/*
  dereferenceItems take a array of Items or High order items and ensure they are all Items
*/
const dereferenceItems = (unsureItems:RichTextItemInput<any>[]) => (
  unsureItems.map(d => getData(d))
);

export {
  getPlugins,
  getSelectorButtons,
  getHoverButtons,
  getGlobalButtons,
  getSchema,
  dereferenceItems,
  getData,
};
