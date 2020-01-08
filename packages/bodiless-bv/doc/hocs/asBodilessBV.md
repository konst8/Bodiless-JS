# asBodilessBV

One can use this HOC in order to enhance his/her base BV component with Bodiless data handlers.

## Usage

You need to import the HOC and compose your component

``` js
import { asBodilessBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asBodilessBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```
