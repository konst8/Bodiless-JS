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

import React from 'react';
import ReactDOM from 'react-dom';
import { flow } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  removeClasses,
} from '@bodiless/fclasses';
import { Spinner, ComponentFormCloseButton } from '@bodiless/ui';

export const overlayStore = observable({
  isActive: false,
  isManageable: false,
  message: '',
});

export const showOverlay = (
  { message, isManageable }:
  { message: string,
    isManageable: boolean,
  } = {
    message: '',
    isManageable: false,
  },
) => {
  overlayStore.isActive = true;
  overlayStore.message = message;
  overlayStore.isManageable = isManageable;
};

export const hideOverlay = () => {
  overlayStore.isActive = false;
};

const OverlayCloseButton = flow(
  removeClasses('bl-float-right'),
)(ComponentFormCloseButton);

export const OverlayUI = ({
  message,
  isManageable,
}: {
  message: string,
  isManageable: boolean,
}) => (
  <div
    id="overlay"
    className="bl-bg-black bl-opacity-75
      bl-w-full bl-h-full bl-fixed bl-top-0 bl-z-50 flex flex-col justify-around items-center"
  >
    <div>
      <Spinner color="bl-bg-white" />
    </div>
    {/* temporary inline-styled. */}
    {message && <h1 style={{ color: 'white', fontSize: '30px' }}>{message}</h1>}
    {isManageable && <OverlayCloseButton onClick={() => hideOverlay()} />}
  </div>
);

export const OverlayPortal = observer(({ store }) => {
  const root = typeof window !== 'undefined' ? window.document.body : null;
  return store.isActive
  && root
  && ReactDOM.createPortal(
    <OverlayUI
      message={store.message}
      isManageable={store.isManageable}
    />,
    root,
  );
});

export const Overlay = () => (
  <OverlayPortal store={overlayStore} />
);

export default Overlay;
