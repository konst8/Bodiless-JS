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

import React, { ComponentType, HTMLProps } from 'react';
import ReactDOM from 'react-dom';
import { flow } from 'lodash';
import { observer } from 'mobx-react';
import { useEditContext } from '@bodiless/core';

import {
  removeClasses, addProps,
} from '@bodiless/fclasses';
import { Spinner, ComponentFormCloseButton } from '@bodiless/ui';

type OverlaySettings = {
  isActive?: boolean,
  hasCloseButton?: boolean,
  hasSpinner?: boolean,
  maxTimeout?: number | null,
  message?: string,
};

type OverlayProps = {
  ui: {
    OvSpinner: ComponentType<HTMLProps<HTMLDivElement>>,
    OvCloseButton: ComponentType<HTMLProps<HTMLDivElement>>,
  },
  settings: OverlaySettings,
};

// const defaultSettings: OverlaySettings = {
//   isActive: false,
//   hasCloseButton: false,
//   hasSpinner: true,
//   message: '',
//   maxTimeout: null,
// };

// export const overlayStore = observable({ data: defaultSettings });

// export const showOverlay = (props: OverlaySettings = {}) => {
//   const settings = {
//     ...defaultSettings,
//     ...props,
//     isActive: true,
//   };

//   overlayStore.data = settings;

//   if (props.maxTimeout) {
//     setTimeout(() => {
//       if (!overlayStore.data.hasCloseButton) {
//         overlayStore.data = {
//           ...settings,
//           message: 'The operation has timed out',
//           hasSpinner: false,
//           hasCloseButton: true,
//         };
//       }
//     }, props.maxTimeout * 1000);
//   }
// };

// export const showError = (message: string = 'An error has occurred.') => {
//   showOverlay({
//     message,
//     hasSpinner: false,
//     hasCloseButton: true,
//   });
// };

// export const hideOverlay = () => {
//   overlayStore.data.isActive = false;
// };

const DefaultSpinner = () => <Spinner color="bl-bg-white" />;

const DefaultCloseButton = props => {
  const context = useEditContext();
  const Button = flow(
    addProps({
      onClick: () => {
        context.hidePageOverlay();
        props.onClick();
      },
    }),
    removeClasses('bl-float-right'),
  )(ComponentFormCloseButton);
  return <Button />;
};

export const Overlay = ({ ui, settings }: OverlayProps) => {
  console.log('overlay rendered');
  const { OvSpinner, OvCloseButton } = ui;
  const { message, hasCloseButton, hasSpinner } = settings;
  return (
    <div
      id="overlay"
      className="bl-px-20 bl-py-10 bl-bg-black bl-opacity-75
        bl-w-full bl-h-full bl-fixed bl-top-0 bl-z-50
        bl-flex bl-flex-col bl-justify-center bl-items-center"
    >
      {hasCloseButton && (
        <div className="bl-flex bl-justify-end bl-w-full">
          <OvCloseButton onClick={() => { settings.onClose(); }} />
        </div>
      )}
      {hasSpinner && (
        <div className="bl-py-5">
          <OvSpinner />
        </div>
      )}
      {message && (
        <h1 className="bl-text-gray-100 bl-text-center bl-text-2xl bl-whitespace-pre-line">
          {message}
        </h1>
      )}
    </div>
  );
};

export const OverlayPortal = observer(({ store }) => {
  const root = typeof window !== 'undefined' ? window.document.body : null;
  return store.data.isActive
  && root
  && ReactDOM.createPortal(
    <Overlay
      ui={{
        OvSpinner: DefaultSpinner,
        OvCloseButton: DefaultCloseButton,
      }}
      settings={{ ...store.data }}
    />,
    root,
  );
});

export const PageOverlay = () => {
  const pageOverlayStore = useEditContext().pageOverlay;
  return <OverlayPortal store={pageOverlayStore} />;
};

export default PageOverlay;
