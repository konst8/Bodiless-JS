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
import { flowRight } from 'lodash';
import {
  ifEditable,
  useEditContext,
  useContextActivator,
  withNode,
  withMenuOptions,
  withoutProps,
} from '@bodiless/core';
import { BasicEditorProps, Plugin } from 'slate-react';
import { SchemaProperties } from 'slate';
import {
  withSlateEditor,
  Content,
  useSlateContext,
  SlateEditorContext,
} from './core';
import withNodeStateHandlers from './withNodeStateHandlers';
import {
  getPlugins,
  getHoverButtons,
  getGlobalButtons,
  dereferenceItems,
  getSchema,
} from './RichTextItemGetters';
import {
  RichTextItem,
  RichTextItemInput,
} from './Type';
import { uiContext, getUI, UI } from './RichTextContext';
import defaultValue from './default-value';

type WithSlateSchemaTypeProps = {
  schema: object,
};
// Addes a schema prop and hten adds that value to the slate context.
const withSlateSchema = <P extends object>(Component: ComponentType<P>) => (
  (props: P & WithSlateSchemaTypeProps) => {
    const { schema, ...rest } = props;
    const slateContext = useSlateContext();
    const { editorProps } = slateContext!;
    const updatedSlateContext = {
      ...slateContext!,
      editorProps: {
        ...editorProps!,
        schema,
      },
    };
    return (
      <SlateEditorContext.Provider value={updatedSlateContext}>
        <Component {...rest as P} />
      </SlateEditorContext.Provider>
    );
  }
);
// create item to activate the context not sure whats up with all the old vs new
const withSlateActivator = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const previousSlateContext = useSlateContext();
  const previousEditorProps = previousSlateContext!.editorProps;
  const context = useEditContext();
  const { onClick } = useContextActivator();
  const onChange: BasicEditorProps['onChange'] = change => {
    if (typeof previousEditorProps.onChange === 'function' && change) {
      previousEditorProps.onChange(change);
    }
    context.refresh();
  };
  const editorProps = {
    ...previousEditorProps!,
    onChange,
    onClick,
  };

  const slateContext = {
    editorProps,
    editorRef: previousSlateContext!.editorRef,
    value: previousSlateContext!.value,
    editor: previousSlateContext!.editor,
  };
  return (
    <SlateEditorContext.Provider value={slateContext}>
      <Component {...props} />
    </SlateEditorContext.Provider>
  );
};

type UseGetMenuOptionsProps = {
  globalButtons: Function,
};
// This is a call back that goes to withMenuOptions so that we can add button to the global menu
const richTextUseGetMenuOptions = (props: UseGetMenuOptionsProps) => {
  const slateContext = useSlateContext();
  const { editor } = slateContext!;
  return () => props.globalButtons(editor);
};
type RichTextProviderProps = {
  plugins: Plugin[],
  schema?: SchemaProperties,
};
type RichTextProviderType = ComponentType<RichTextProviderProps>;
const RichTextProvider = flowRight(
  withNode,
  withNodeStateHandlers,
  // @ts-ignore
  withSlateEditor,
  ifEditable(withMenuOptions({ useGetMenuOptions: richTextUseGetMenuOptions, name: 'editor' })),
  withoutProps(['className', 'globalButtons', 'plugins', 'readOnly']),
  withSlateSchema,
  ifEditable(withSlateActivator),
)(React.Fragment) as RichTextProviderType;

type RichTextProps<P> = {
  items: RichTextItemInput<P>[],
  ui?: UI,
  initialValue?: object,
  nodeKey?: string,
};

/*
  performs runtime validation of RichTextItem props
*/
const validateRichTextProps = <P extends object>(items: Partial<RichTextItem<P>>[]) => {
  items.forEach(item => {
    if (!item.id) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Id for RichText item is not specified. Please check your RichText component configuration.');
    }
    if (!item.component) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Component for RichText is not specified. Please check your RichText component configuration.');
    }
  });
};

const RichText = <P extends object, D extends object>(props: P & RichTextProps<D>) => {
  const {
    initialValue,
    items,
    ui,
    ...rest
  } = props;
  const sureItems = dereferenceItems(items);
  const { HoverMenu } = getUI(ui);
  const finalUI = getUI(ui);
  // triggering runtime validation of RichText items
  // throwing an error if there is an item for which component or id is not set
  // long term, it would be great to have the validation during compilation
  validateRichTextProps(sureItems);
  const { isEdit } = useEditContext();
  return (
    <uiContext.Provider value={finalUI}>
      <RichTextProvider
        {...rest}
        initialValue={initialValue || defaultValue}
        plugins={getPlugins(sureItems)}
        globalButtons={getGlobalButtons(sureItems)}
        schema={getSchema(sureItems)}
      >
        { isEdit
          && (
          <HoverMenu>
            {
              // TODO: Revist but for now it seems like this will not need to
              // rerender ever so it is ok.
              // eslint-disable-next-line react/no-array-index-key
              getHoverButtons(sureItems).map((C, i) => <C key={i} />)
            }
          </HoverMenu>
          )
        }
        <Content />
      </RichTextProvider>
    </uiContext.Provider>
  );
};
export default RichText;
