# withBVLoader

One can use this HOC in order to enhance his/her custom BV component with loading main BV script.

## Usage

You need to import the HOC and compose your component

``` js
import { withBVLoader } from '@bodiless/bv';
const BVComponentWithLoader = withBVLoader(YourCustomBVComponent);
```

Then you can add your component on a page

``` js
<BVComponentWithLoader />
```
