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

/* eslint-disable no-alert */

import { AxiosPromise, AxiosResponse } from 'axios';
import { showError } from '@bodiless/core-ui';

// eslint-disable-next-line arrow-body-style
const isResponseSuccessful = (res: AxiosResponse<any>): boolean => {
  return res.status === 200 || res.status === 201;
};

const handle = (promise: AxiosPromise<any>) => promise
  .then(res => {
    if (!isResponseSuccessful(res)) {
      showError('An unknown error has occured.');
      return false;
    }
    return true;
  })
  .catch(err => {
    // Use back-end crafted error message if available.
    if (err.response && err.response.data) {
      showError(err.response.data);
    } else {
      showError(err.message);
    }
    return false;
  });

export default handle;
