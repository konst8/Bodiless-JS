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

import {
  addClasses,
  withDesign,
  Img,
  Div,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';
import React, { HTMLProps, FC, ComponentType } from 'react';
import { withNode, WithNodeProps } from '@bodiless/core';
import Carousel from 'nuka-carousel';

type SliderComponents = {
  Wrapper: ComponentType<any>,
  CarouselImage: ComponentType<any>,
};

const sliderComponents: SliderComponents = {
  Wrapper: Div,
  CarouselImage: Img,
};

// Basic Tout
const SliderBase: FC<DesignableComponentsProps<SliderComponents>> = ({ components }) => {
  const {
    Wrapper,
    CarouselImage,
  } = components;

  return (
    // TO DO replace Carousel with being able to add in allowed types of components.
    <Wrapper>
      <Carousel>
        <CarouselImage nodeKey="image1" />
        <CarouselImage nodeKey="image2" />
        <CarouselImage nodeKey="image3" />
      </Carousel>
    </Wrapper>

  );
};

const CleanSlider = designable(sliderComponents)(SliderBase);

const asBasicSlider = withDesign({
  Wrapper: addClasses('container w-full h-64'),
  CarouselImage: addClasses('m-0 w-full h-64'),
});

type SBasicSliderProps = React.ComponentType<HTMLProps<HTMLDivElement> & WithNodeProps>;
export default withNode(asBasicSlider(CleanSlider)) as SBasicSliderProps;
