# BodilessJS

BodilessJS is a toolset for building editable websites in a JAMStack. It is based on the idea that, for many sites, a full-blown CMS is unnecessary overhead and introduces more problems than it solves, including:

- Complex workflows, especially when changes to "content" and "presentation" are linked
- Complex editorial interfaces, especially when "presentation" is treated as "content"
- Increased security vulnerabilities
- Higher hosting, maintenance, and operational costs

CMS's are great for some use-cases--for example when there is a lot of reusable content, where content is highly relational, or where presentation is highly standardized and templatized. However, for the most part, CMS's are simply unnecessary.

Sites built in a JAMStack tend to fall into two categories:

- "Headless" implementations, where content is managed in a CMS and pulled into the site at build time,
- "Bodiless" implementations, where content is managed alongside the code in the repository (often in markdown files). 
  
As you might expect, BodilessJS follows the latter pattern, and provides tools which allow non-developers to edit the content inline using a browser. This is not to say that a website built with BodilessJS can't pull content from an external CMS, but if *most* of your content is managed externally, there may be other toolkits that better fit your use case.

BodilessJS (and it's proprietary extension, CanvasX) are being developed at J&J to meet specific use-cases in the consumer marketing space. The design and architecture are based on learnings from many years of experience trying to build and operate a large-scale Drupal 7 platform to support customer-facing sites.

## Read the Documentation

1. Clone this repository.
2. `npm run setup`
3. `npm run docs`
4. Visit `localhost:3000` in your browser.

> Requires [NodeJS](https://nodejs.org/en/download/) (v10.15 preferred)

## Links

- [Read the Getting Started Guide on GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-documentation/doc/About/GettingStarted.md)
- [Join BodilessJS on Slack](https://bodiless-js.slack.com/join/shared_invite/enQtODk2NzI3NDU3NTQxLWQwNzJkOTgxODFlMTAwNDg4Mzc2YmU2OTgzYjIwZjZjYTJkY2QwYjBjNDhjM2QyM2RmNTEzOWNkYmVmNmI1YzM)



