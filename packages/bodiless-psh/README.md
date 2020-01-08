# Bodiless integration with platform.sh

This package provides standard configuration files and helper scripts which
make it easy for a bodiless site to be deployed to platform.sh.

## Setting up your project

### Pre-requisites

- Admin access to a [platform.sh](https://platform.sh/) project.
- A service user with *admin access* to a repository in a Bitbucket Server instance.
- The [platform.sh cli](https://docs.platform.sh/gettingstarted/cli.html)

### Step 1. Gather required information

To continue, you will need the following:

#### The platform.sh project key
- Log in via the platform.sh cli.  From your local machine execute:
  ```
  platform login
  ```
  You will directed to log in via a web browser
- Execute
  ```
  platform project:list
  ```
  You should see a list of all projects you have access to, something like:
  ```
    Your projects are:
  +---------------+-------------------------+-----------------------------------------------------+
  | ID            | Title                   | URL                                                 |
  +---------------+-------------------------+-----------------------------------------------------+
  | abcdefghijklm | project_a               | https://console.platform.sh/webalerts/abcdefghijklm |
  | lmnopqrstuvwx | project_b               | https://console.platform.sh/webalerts/lmnopqrstuvwx |
  +---------------+-------------------------+-----------------------------------------------------+`
  ```
- Take note of the project ID for your project. This is the value you will use below.

### Step 2. Initialize your project configuration files

Platform.sh requires several configuration files to be in place
in your repository. This package contains default versions of these
files for a BodilessJS.  To install or update them:

1. Add this package as a dependency of your project:
  ```
  npm i --save-dev @bodiless/psh
  ```
2. Add the following to your `package.json` scripts:
  ```
  "init-psh": "bodiless-psh-init"
  ```
3. Install or update the configuration files:
  ```
  npm run init-psh
  ```
4. Commit the added configuration files to your repository.  These include
   ```
   .platform.app.yaml
   .platform/*
   edit/*
   docs/*
   ```

## Step 3. Create platform.sh environment variables.

First, configure your local install to connect to your platform.sh project. From
within your project root, execute
```
platform project:set-remote {project id}
```
where {project id} is the platform.sh project id you acquired above.

#### NPM private registry

In order to deploy from NPM private registry two variables must be set:

env:APP_NPM_REGISTRY
env:APP_NPM_AUTH

If the variables are not set, npm will try to load packages from the public registry:
//registry.npmjs.org/

To set the `env:APP_NPM_REGISTRY` variable perform the next steps:

```
$ platform variable:create
* Level (--level)
The level at which to set the variable
  [project    ] Project-wide
  [environment] Environment-specific
> project

* Name (--name)
The variable name
> APP_NPM_REGISTRY

* Value (--value)
The variable's value
> //registry.npmjs.org/

JSON (--json)
Is the value JSON-formatted? [y|N] N

Sensitive (--sensitive)
Is the value sensitive? [y|N] y

Prefix (--prefix)
The variable name's prefix
Default: none
  [none] No prefix: The variable will be part of $PLATFORM_VARIABLES.
  [env:] env: The variable will be exposed directly, e.g. as $APP_NPM_REGISTRY.
> env:

Visible at build time (--visible-build)
Should the variable be available at build time? [Y|n] Y

Visible at runtime (--visible-runtime)
Should the variable be available at runtime? [Y|n] Y
```

- Verify that the variable was created properly by executing:
  ```
  platform variable:get env:APP_NPM_REGISTRY
  ```
  You should see something like:
  ```
  $ platform variable:get env:APP_NPM_REGISTRY
  +-----------------+------------------------------------------------------+
  | Property        | Value                                                |
  +-----------------+------------------------------------------------------+
  | id              | env:APP_NPM_REGISTRY                                 |
  | created_at      | 2019-10-10T13:20:13+02:00                            |
  | updated_at      | 2019-10-10T13:20:13+02:00                            |
  | name            | env:APP_NPM_REGISTRY                                 |
  | attributes      | {  }                                                 |
  | value           | //registry.npmjs.org/                                |
  | is_json         | false                                                |
  | is_sensitive    | false                                                |
  | visible_build   | true                                                 |
  | visible_runtime | true                                                 |
  | level           | project                                              |
  +-----------------+------------------------------------------------------+

  ```

#### Authorization token for NPM private registry

From within your project root, execute `platform variable:create` and follow the prompts as:
```
$ platform variable:create
* Level (--level)
The level at which to set the variable
  [project    ] Project-wide
  [environment] Environment-specific
> project

* Name (--name)
The variable name
> APP_NPM_AUTH

* Value (--value)
The variable's value
> {paste the token acquired above here}

JSON (--json)
Is the value JSON-formatted? [y|N] N

Sensitive (--sensitive)
Is the value sensitive? [y|N] y

Prefix (--prefix)
The variable name's prefix
Default: none
  [none] No prefix: The variable will be part of $PLATFORM_VARIABLES.
  [env:] env: The variable will be exposed directly, e.g. as $APP_NPM_AUTH.
> env:

Visible at build time (--visible-build)
Should the variable be available at build time? [Y|n] Y

Visible at runtime (--visible-runtime)
Should the variable be available at runtime? [Y|n] Y
```

- Verify that the variable was created properly by executing:
  ```
  platform variable:get env:APP_NPM_AUTH
  ```
  You should see something like:
  ```
  $ platform variable:get env:APP_NPM_AUTH
  +-----------------+---------------------------+
  | Property        | Value                     |
  +-----------------+---------------------------+
  | id              | env:APP_NPM_AUTH          |
  | created_at      | 2019-08-09T06:48:52-04:00 |
  | updated_at      | 2019-08-09T06:48:52-04:00 |
  | name            | env:APP_NPM_AUTH          |
  | attributes      | {  }                      |
  | is_json         | false                     |
  | is_sensitive    | true                      |
  | visible_build   | true                      |
  | visible_runtime | true                      |
  | level           | project                   |
  +-----------------+---------------------------+
  ```

### Step 4. Configure the platform.sh Bitbucket integration.

##### Use the platform cli

From your project root, execute `platform integration:add` and follow
the prompts, as:

```bash
$ platform integration:add
* Integration type (--type)
Enter a number to choose:
  [0] bitbucket
  [1] bitbucket_server
  [2] github
  [3] gitlab
  [4] hipchat
  [5] webhook
  [6] health.email
  [7] health.pagerduty
  [8] health.slack
> 1

* Username (--username)
The Bitbucket Server username
> {bitbukcet service username}

* Token (--token)
An access token for the integration
> {bitbucket service user password}

* Repository (--repository)
The repository (e.g. 'foo/bar')
> {project/repository, eg: foo/bar}

Build pull requests (--build-pull-requests)
Build every pull request as an environment? [Y|n] N

Clone data for pull requests (--pull-requests-clone-parent-data)
Clone the parent environments data for pull requests? [Y|n] Y

Fetch branches (--fetch-branches)
Fetch all branches from the remote (as inactive environments)? [Y|n] Y

Prune branches (--prune-branches)
Delete branches that do not exist on the remote? [Y|n] Y

Warning: adding a 'bitbucket_server' integration will automatically synchronize code from the external Git repository.
This means it can overwrite all the code in your project.

Are you sure you want to continue? [y/N] y
```

##### Verify the integration

- Visit the "webhooks" section of your bitbucket repository settings, eg
  ```
  https://domain/plugins/servlet/webhooks/projects/{project-key}/repos/{repo-name}
  ```
  and verify that a webhook to platform.sh has been added. Note you will need admin access
  to the project in order to view the webhooks.
- Activate a branch in your project (as described below) and validate that an environment
  is created and deployed to platform.sh. *Note you must first push the branch to bitbucket*.

### Step 5. Configure the Jenkins Git integration.

#### Provide an access for Jenkins Service Account to platfrom.sh project
Open the settings of platform.sh project:  
https://console.platform.sh/webalerts/XXX/settings/access, where XXX is platform.sh project id  

#### Configure bitbucket webhook to Jenkins
In order to enable integration between bitbucket and newly created repository, webhook should be configured.  
In order to do so, go to "Repository settings" > "Webhooks" > "Create webhook".  pajoh

#### Create Jenkins Pipeline
Unless its automated the following Jenkins items should be created manually in Jenkins instance.  
It should have the following pipeline inside
```
@Library('nameof-shared-lib') _
platformshActivatorPipeline(platformshProjectId: 'XXX', branchNamingConvention: '^changeset/.*$')
```
XXX should be replaced with platform.sh project id.  
```^changeset/.*$``` could be changed if you like to have different naming convention for branches which are automatically provisioned to platform.sh

## Building and Deploying

### Pre-requisites

- Access to a [platform.sh](https://platform.sh/) project.
- The [platform.sh cli](https://docs.platform.sh/gettingstarted/cli.html)

### Local setup

- Obtain the project key of the project you wish to deploy: see
  [The platform.sh project key](#the-platform.sh-project-key), above.
- Connect your local repository to the correct platform.sh remote. From within the repository root:
  ```
  platform project:set-remote {project id}
  ```

### Initial deployment of a new branch

- Ensure you are on the correct branch locally.
- Push the branch to bitbucket.
  ```
  git push origin <branch>
  ```
- Execute
    ```
    platform env:activate
    ```
  Note - you may have to wait a few moments after pushing the branch to
  bitbucket before activating the environment, in order to allow the branch to
  sync to p.sh. If, when you try to activate, you are asked for an "Environment
  ID", wait a bit and try again.
- The public url of the new environment will be printed to the console.
- You can display (and open) the public urls for your site by checking out the
  corresponding branch and executing `platform url`.

#### Basic Authentication

Note that basic authentication may be configured for your environment by
default, and this may prevent access via your browser. To verify, use the
platform cli:
```
platform env:http-access
```

You can also use this command to enable or disable authentication, and to
add/remove credentials.
```
platform help env:http-access
```
to learn more.

### Pushing changes

Once a new branch is created, changes pushed to Bitbucket will be automatically
deployed to the static site onplatform.sh. You can run `platform activity:log`
to see the current build status, or visit [console.platform.sh](https://console.platform.sh),
locate your build, and click "View Logs".

Changes are *not* automatically deployed to an edit environment; you must manually
trigger an update of the edit environment by executing:
  ```
  platform ssh -e <env-id> 'bash platform.sh deploy'
  ```
  Or, to force a fresh install (same as npm fresh):
  ```
  platform ssh -e <env-id> 'bash platform.sh fresh'
  ```
  You may omit the "-e <env-id>" if you have the active branch checked out locally.

### Deleting an environment

The platform.sh environment will be deleted when you remove the corresponding
branch from bitbucket. *Please delete obsolete branches*.

You can also remove an environment without deleting your branch by checking
out the branch locally and executing `platform env:delete -y`.

### Merging to master

When you merge a feature branch to master, the updated master branch will be automatically deployed
to the static environment on platform.sh.  To deploy changes to the edit environment, you must follow the same process as in [Pushing Changes](#pushing-changes) above.

## How to load environment specific html snippets

When you want to inject different html snippets depending on your environment type, you can use Server Side Includes (SSI) mechanism.

### Activate SSI

* Activate SSI for your route(s) in your routes.yaml file. See: https://docs.platform.sh/configuration/routes/ssi.html
* Use SSI_ENV enviroment variable to specify type of your environment. Default value is 'dev'.
* Ensure ssi configs are loaded to psh container and set SSI_CONF_PATH environment variable to path to json file containing SSI configs.
* Ensure your .platform.app.yaml contains invocation of generate-ssi-files.js node scripts. The script should be invoked during build and deploy phases. PSH phase (build or deploy) should be passed as an argument to the script.
* Ensure the files of you app, that will be served by psh, contain SSI directives.
* Ensure a writable volume is mounted to your app.

### SSI config format

SSI configuration file should be in json format.

```
{
  key1: {
    pragma: "<!--# ssi data should go here -->",
    env1: {
      file: "key1.env1.html"
    }
    ...
    envN: {
      file: "key1.envN.html"
    }
  }
  ...
  keyN: {
    pragma: "<!--# ssi data should go here -->",
    ...
    env1: {
      file: "keyN.envN.html"
    }
    ...
    envN: {
      file: "keyN.envN.html"
    }
  }
}
```
### How it works

* during build phase, generate-ssi-files reads SSI configs and for each key it creates symlink from PLATFORM_DOCUMENT_ROOT/filename.html into APP_VOLUME/filename.html. Filename is generated based on key. There is an opportunity to improve this logic. We can read and parse pragma field, exract filename from it. But it makes the things more complicated and in addition, pragma may not have files at all.
* during deploy phase, generate-ssi-files reads SSI configs and SSI_ENV and for each key it copies the file defined in conf.{key}.{env}.{file} to APP_VOLUME/filename.html that was created during build phase.

## How to replace your site prod url with psh environment url in a public file

If you want to make urls in a particular public file match psh environment url, you can leverage psh-url-replacer node script. For instance, your site sitemap.xml, which is generated during build time, contains production urls and you want to replace the production url with psh environment url, to which your website is deployed to.

### Why

Platform.sh does not allow to expose environment level environment variables to the application build stage.

### How it works

on psh build stage:

- it moves your source file from public dir to a tmp directory
- then it creates a symlink from a writable volume file to the source public file

on psh deploy stage:

- it copies the file from the tmp directory to the writable volume file
- then it replaces production url with psh environment url in the file

### How to activate this feature

By default, the feature is activated for sitemap.xml and robots.txt. If you want to activate the feature for some other files or if you have custom installation of sitemap.xml or robots.txt, please follow the following steps:

1. ensure writable volume mounting is configured for your app

1. export environment variables and invoke psh-url-replacer in build section of your psh app .platform.app.yaml

```bash

hooks:
    build: |
        export PSH_URL_REPLACER_SRC_FILE=/path/to/your/src/public/file
        export PSH_URL_REPLACER_TMP_FILE=/path/to/a/tmp/file
        export PSH_URL_REPLACER_TARGET_FILE=/path/to/writable/volume/file
        node /path/to/psh-url-replacer.js build

```

1. export environment variables and invoke psh-url-replacer in deploy section of your psh app .platform.app.yaml

```bash

hooks:
    deploy: |
        export PSH_URL_REPLACER_TMP_FILE=/path/to/the/tmp/file/you/saved/during/build/phase
        export PSH_URL_REPLACER_TARGET_FILE=/path/to/writable/volume/file
        export PSH_URL_REPLACER_SRC_URL=https://your-site-production-url.com
        export PSH_URL_REPLACER_TARGET_URL=https://your-psh-env.url.site
        export PSH_URL_REPLACER_PROD_ENV='0' # set to '1' if you want to disable the replacement
        node /path/to/psh-url-replacer.js deploy
```

## Known limitations

- PR Branches and Feature branches created in bitbucket will always inherit from
  master. This means that you must manually configure basic authentication for
  these branches if you want them protected from the public internet.
- There is a 64-character limit on hostnames for TLS, and platform.sh uses 43 of
  them. Since hostnames are created based on branch names, and since the edit
  environment uses an additional 5 ("edit."), your branch names should be
  limited to a maximum of 16 characters to avoid certificate warnings.
- When you create a bitbucket integration, a webhook is added to your bitbucket
  repository. However, deleting the integration does not remove the webhook, you
  must do this manually.

## Troubleshooting

### Viewing Logs

Build, deploy and application logs for an environment are available using the
platform cli. If you want logs for an environment other than the currently
checked-out branch (e.g. for a pull request), you must use the `-e` flag. You
can first get a list of all available environments by running
```
platform env:list
```
You can then use the identifier from the first column in the commands below.
If you want logs from the environment associated with your current local
branch, you can omit the `-e` flag.

- Tail/print most recent build log (this now includes deploy log):
  ```
  platform activity:log -e <env-id> 
  ```
  Note that you may have to wait a few moments after performing
  a git push in order for the new p.sh deployment to begin.
- Print deploy logs for all builds to the edit environment:
  ```
  platform log -e <env-id> -A edit deploy <--lines n>
  ```
  (where n is the number of lines.)
- View or tail application logs for the edit environment
  ```
  platform log -e <env-id> -A edit app <--lines n> <--tail>
  ```

Alternatively, you can visit [the platform.sh console](https://console.platform.sh/webalerts/abcdefghi) and locate
your build to view the build log (deployment and application logs
are only available from the command line).

### Hints

- If the `platform` command is not found, you probably have to run
  `source .bashrc` to ensure it is in your path.
- For all deployments in which the app is restarted, the environment may not be
  fully available for up to a minute after the deployment is complete.
- You may see errors in the application log relating to insufficient file
  watchers. This is a known issue. Currently the only workaround is to reduce
  the number of active environments.
- Public urls for an environment are available by running
  ```
  platform url -e <env-id>
  ```
- There are many other useful platform cli subcommands.  Run `platform list`
  to see them all.

## Deploying bodiless packages from a private registry

By default the public regisry will be used to download bodiless packages: //registry.npmjs.org/

In order to switch to a private registry follow Step 3 (Create platform.sh environment variables.) of this doc.
