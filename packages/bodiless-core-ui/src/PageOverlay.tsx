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
import { flow } from 'lodash';

import { Div, Spinner, ComponentFormCloseButton } from '@bodiless/ui';
import { PageOverlay as CleanPageOverlay } from '@bodiless/core';
import { addClasses, removeClasses, addProps } from '@bodiless/fclasses';

const OverlayWrapper = flow(
  addClasses([
    'bl-p-20 bl-py-10 bl-w-full bl-h-full bl-fixed bl-top-0 bl-z-50',
    'bl-flex bl-flex-col bl-justify-center bl-items-center',
  ]),
  addProps({
    id: 'page_overlay',
    style: {
      backgroundColor: '#00000066',
    },
  }),
)(Div);

const PopupWrapper = addClasses('bl-p-5 bl-rounded bl-bg-black')(Div);

const Button = (props: any) => {
  const ButtonWrapper = addClasses('bl-flex bl-pb-5 bl-justify-end bl-w-full')(Div);
  const ButtonEl = removeClasses('bl-float-right')(ComponentFormCloseButton);
  return (
    <ButtonWrapper>
      <ButtonEl {...props} />
    </ButtonWrapper>
  );
};

const WrappedSpinner = () => {
  const SpinnerWrapper = addClasses('h-15')(Div);
  return <SpinnerWrapper><Spinner color="bl-bg-white" /></SpinnerWrapper>;
};

const Message = addClasses([
  'bl-text-gray-100 bl-text-center bl-text-2xl bl-whitespace-pre-line clear-right',
])(Div);

const ui = {
  OverlayWrapper,
  PopupWrapper,
  Button,
  Spinner: WrappedSpinner,
  Message,
};

const PageOverlay = () => <CleanPageOverlay ui={ui} />;

export default PageOverlay;
