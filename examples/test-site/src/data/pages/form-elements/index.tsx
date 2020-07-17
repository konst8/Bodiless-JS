/**
 * Copyright © 2020 Johnson & Johnson
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
import { graphql } from 'gatsby';
import { addClasses } from '@bodiless/fclasses';
import {
  ComponentFormWrapper as BaseComponentFormWapper,
  ComponentFormFieldWrapper,
  ComponentFormFieldTitle,
  ComponentFormDescription,
  ComponentFormLabel,
  ComponentFormTitle,
  ComponentFormText,
  ComponentFormTextArea,
  ComponentFormRadioGroup,
  ComponentFormRadio,
  ComponentFormCheckbox,
  ComponentFormSelect,
  ComponentFormOption,
} from '@bodiless/ui';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';

const ComponentFormWrapper = addClasses(
  'bl-mt-grid-10 bl-mb-grid-10 bl-w-1/4 bl-rounded'
)(BaseComponentFormWapper);

const ExampleForm = () => {
  return (
    <ComponentFormWrapper>
      <ComponentFormTitle>Multi-Field Example Form</ComponentFormTitle>

      <ComponentFormFieldWrapper>
        <ComponentFormDescription>
          Description or instructions. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ComponentFormDescription>
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
        <ComponentFormFieldTitle>Text</ComponentFormFieldTitle>
        <ComponentFormText field="text-field" placeholder="Name" />
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
        <ComponentFormFieldTitle>Text Area</ComponentFormFieldTitle>
        <ComponentFormTextArea field="text-area" placeholder="Comments" />
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
      <ComponentFormFieldTitle>Radio Button Group</ComponentFormFieldTitle>
        <ComponentFormRadioGroup field="gender" style={{backgroundColor: 'blue'}}>
          <ComponentFormLabel><ComponentFormRadio value="male" />Male</ComponentFormLabel>
          <ComponentFormLabel><ComponentFormRadio value="female" />Female</ComponentFormLabel>
          <ComponentFormLabel><ComponentFormRadio value="other" />Other</ComponentFormLabel>       
        </ComponentFormRadioGroup>
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
        <ComponentFormFieldTitle>Checkbox</ComponentFormFieldTitle>
        <ComponentFormLabel><ComponentFormCheckbox field="checkbox" />I agree</ComponentFormLabel>
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
      <ComponentFormFieldTitle>Select</ComponentFormFieldTitle>
        <ComponentFormSelect field="city">
          <ComponentFormOption value="" disabled>
            Select      
          </ComponentFormOption>
          <ComponentFormOption value="ny">NY</ComponentFormOption>
          <ComponentFormOption value="nj">NJ</ComponentFormOption>
          <ComponentFormOption value="ct">CT</ComponentFormOption>
        </ComponentFormSelect>
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
        <ComponentFormFieldTitle>Multi-Select</ComponentFormFieldTitle>
        <ComponentFormSelect
          field="colors"
          id="select-colors"
          multiple
        >
          <ComponentFormOption value="red">Red</ComponentFormOption>
          <ComponentFormOption value="green">Green</ComponentFormOption>
          <ComponentFormOption value="blue">Blue</ComponentFormOption>
          <ComponentFormOption value="yellow">Yellow</ComponentFormOption>
          <ComponentFormOption value="orange">Orange</ComponentFormOption>
          <ComponentFormOption value="purple">Purple</ComponentFormOption>
        </ComponentFormSelect>
      </ComponentFormFieldWrapper>

      <ComponentFormFieldWrapper>
        <ComponentFormFieldTitle>Number</ComponentFormFieldTitle>
        <ComponentFormText field="number-text-field" type="number" placeholder="100" />
      </ComponentFormFieldWrapper>
    </ComponentFormWrapper>
  );
};

export default props => (
  <Page {...props}>
    <Layout>
      <ExampleForm />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
