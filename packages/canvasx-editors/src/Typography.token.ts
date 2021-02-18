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
import { addClasses, withDesign } from '@bodiless/fclasses';

const asBold = addClasses('font-bold');
const withItalic = addClasses('italic');
const asLink = addClasses('');
const asUnderline = addClasses('');
const asAlignLeft = addClasses('');
const asAlignRight = addClasses('');
const asAlignCenter = addClasses('');
const asAlignJustify = addClasses('');
const asSuperScript = addClasses('');
const asHeader1 = addClasses('');
const asHeader2 = addClasses('');
const asHeader3 = addClasses('');
const asIndent = addClasses('');
const asParagraph = addClasses('');

const withBasicTypography = withDesign({
  Bold: asBold,
  Italic: withItalic,
  Underline: asUnderline,
  Link: asLink,
  SuperScript: asSuperScript,
  AlignLeft: asAlignLeft,
  AlignRight: asAlignRight,
  AlignJustify: asAlignJustify,
  AlignCenter: asAlignCenter,
  H2: asHeader2,
  H3: asHeader3,
  paragraph: asParagraph,
  Indent: asIndent,
});

const withFullTypography = flow(
  withBasicTypography,
  withDesign({
    H1: asHeader1,
  }),
);

export {
  asBold,
  withItalic,
  asLink,
  asUnderline,
  asAlignLeft,
  asAlignRight,
  asAlignCenter,
  asAlignJustify,
  asSuperScript,
  asHeader1,
  asHeader2,
  asHeader3,
  asIndent,
  asParagraph,
  withBasicTypography,
  withFullTypography,
};