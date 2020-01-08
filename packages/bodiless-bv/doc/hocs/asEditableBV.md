# asBodilessBV

One can use this HOC in order to enhance his/her base BV component with bodiless data handlers and product edit form.

## Usage

You need to import the HOC and compose your component

``` js
import { asEditableBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asEditableBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```
