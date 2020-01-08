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

import { Value, Block, Editor } from 'slate';
import { DataJSON } from '../../Type';

const DEFAULT_NODE = 'paragraph';
export const hasBlock = (value: Value, blockType: string) => (
  value.blocks.some(block => Boolean(block && block.type === blockType))
);
export const getBlock = (value: Value, blockType: string) => value.blocks
  .filter(block => Boolean(block && block.type === blockType))
  .first();
export const createBlock = (blockType: string, data: DataJSON) => ({
  data,
  type: blockType,
});
export const hasMultiBlocks = (value: Value) => value.blocks.size > 1;
export const removeBlock = (editor: Editor, blockType: string) => (
  editor.setBlocks(DEFAULT_NODE).unwrapBlock(blockType)
);

export const removeBlockByNode = (editor: Editor, node: Block) => editor
  .moveToRangeOfNode(node)
  .setBlocks(DEFAULT_NODE)
  .unwrapBlock(node.type);

export const wrapBlock = (
  editor: Editor,
  blockType: string,
  data: DataJSON,
) => {
  editor.setBlocks(createBlock(blockType, data));
};

export type UpdateBlockOptions = {
  editor: Editor;
  componentData: DataJSON;
  node: Block;
};

export type ToggleBlockOptions = {
  editor: Editor;
  value: Value;
  blockType: string;
};

export type createToggleBlockOptions = {
  editor: Editor,
  value: Value,
};

export const updateBlock = ({
  editor,
  componentData,
  node,
}: UpdateBlockOptions) => {
  const { value } = editor;
  const { selection, fragment } = value;
  const { text } = fragment;
  if (selection.isCollapsed) {
    editor.moveFocusBackward(text.length);
  }

  editor
    .moveToRangeOfNode(node)
    .setBlocks({ type: node.type, data: { ...componentData } });

  return editor;
};

export const toggleBlock = ({
  editor,
  value,
  blockType,
}: ToggleBlockOptions) => {
  if (hasBlock(value, blockType)) {
    removeBlock(editor, blockType);
  } else {
    wrapBlock(editor, blockType, {});
  }
  return editor;
};

export const createToggleBlock = (blockType: string) => (
  { editor, value }:createToggleBlockOptions,
) => (
  toggleBlock({
    editor,
    value,
    blockType,
  })
);

export const insertBlock = ({
  editor,
  value,
  blockType,
}: ToggleBlockOptions) => {
  editor.insertBlock(createBlock(blockType, value));
  return editor;
};
