# Configuration

This section describes configuration steps required in order to use BV Components.

## Prerequisites

In order to use BV components, you need to know:

* URL of main Baazarvoice script. Example: https://display.ugc.bazaarvoice.com/bvstaging/static/clientid/main_site/en_US/bvapi.js, or
* client_name, site_ID, environment and locale of your Baazarvoice account.

## How to configure

In order to connect your BV components to BV service, you need to set BV_SCRIPT environment variable to main BV main script url:

``` bash
BV_SCRIPT="https://display.ugc.bazaarvoice.com/bvstaging/static/clientid/main_site/en_US/bvapi.js"
```

Altenatively, you can set the following environment variables

``` bash
BV_CLIENT_NAME='clientid'
BV_SITE_ID='main_site'
BV_ENVIRONMENT='staging'
BV_LOCALE='en_US'
```
