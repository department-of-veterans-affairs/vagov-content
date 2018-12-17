# Tour the content repository
This document provides a general overview of the content repository structure.

## The VA.gov content repository
Although we refer to it as the VA.gov Interim CMS, the content files here are part of a [GitHub repository](https://help.github.com/articles/about-repositories/), or "repo" for short. It's really just a shared directory that retains a complete history of changes, including all saves, edits, deletes, and more.

## Directory structure
As of this writing, the directory structure consist of the following (in order of importance):

- [`pages/`](#pages)
- [`assets/`](#assets)
- [`fragments/`](#fragments)
- [`docs/`](#docs)
- [`.github/`](#.github)
- [Files sitting at the root](#files-sitting-at-the-root)

### pages
The content pages for VA.gov. Each file here is visible on the website as an HTML webpage.

The directory structure determines the published-website hierarchy (called the information architecture) and the URL. For example, `pages/health-care/sample-page.md` will be published to `www.va.gov/health-care/sample-page/`.

As indicated by the `.md` file extension, these pages are written in the [Markdown format](how-content-is-written.md).

### assets
Static assets that are linked to or referenced by content pages. This includes PDFs, images, and more.

### fragments
Specific chunks of content, such as for a cetain website component. An example of this is the homepage warning banner.

### docs
Documentation, such as for the doc you're reading now :slighty_smiling_face:.

### .github
Configurations for the repo specifically for GitHub.com.

### Files sitting at the root
Files at the root of the repo are configurations for Heroku review instances. These can be ignored by non-developers.
