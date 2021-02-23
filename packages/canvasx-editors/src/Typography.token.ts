/**
 * Copyright © 2021 Johnson & Johnson
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
import { addClasses, asToken } from '@bodiless/fclasses';

const asBold = asToken(
  addClasses('font-bold'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Font Weight'],
      Component: ['Element'],
    },
  },
);

const withItalic = asToken(
  addClasses('italic'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Font Style'],
      Component: ['Element'],
    },
  },
);

const withRichTextLinkStyle = asToken(
  addClasses('underline'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Link', 'Font Color', 'Font Decoration'],
      Component: ['Element'],
    },
  },
);

const withLinkStyle = asToken(
  addClasses('underline'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Link', 'Font Color', 'Font Decoration'],
      Component: ['Element'],
    },
  },
);

const asUnderline = asToken(
  addClasses('underline'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Font Decoration'],
      Component: ['Element'],
    },
  },
);

const withTextAlignLeft = asToken(
  addClasses('text-left'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Text Align'],
      Component: ['Element'],
    },
  },
);

const withTextAlignRight = asToken(
  addClasses('text-right'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Text Align'],
      Component: ['Element'],
    },
  },
);

const withTextAlignCenter = asToken(
  addClasses('text-center'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Text Align'],
      Component: ['Element'],
    },
  },
);

const withTextAlignJustify = asToken(
  addClasses('text-justify'),
  {
    categories: {
      Category: ['Typography'],
      Attribute: ['Text Align'],
      Component: ['Element'],
    },
  },
);

const asSuperScript = asToken(
  addClasses(''),
  {
    categories: {
      Category: ['Typography'],
      Attribute: [''],
      Component: ['Element'],
    },
  },
);

const asHeader1 = asToken(
  addClasses('text-2xl'),
  {
    categories: {
      Category: ['Typography', 'Header'],
      Attribute: ['Font Size'],
      Component: ['Element'],
    },
  },
);

const asHeader2 = asToken(
  addClasses('text-xl'),
  {
    categories: {
      Category: ['Typography', 'Header'],
      Attribute: ['Font Size'],
      Component: ['Element'],
    },
  },
);

const asHeader3 = asToken(
  addClasses('text-lg'),
  {
    categories: {
      Category: ['Typography', 'Header'],
      Attribute: ['Font Size'],
      Component: ['Element'],
    },
  },
);

export {
  asBold,
  withItalic,
  withRichTextLinkStyle,
  withLinkStyle,
  asUnderline,
  withTextAlignLeft,
  withTextAlignRight,
  withTextAlignCenter,
  withTextAlignJustify,
  asSuperScript,
  asHeader1,
  asHeader2,
  asHeader3,
};
