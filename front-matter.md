## What is Front Matter?

Front Matter is structured data (in the form of YAML) that lives at the top of each content file that allows you to define metadata, appearance, and organization of content.


It will looks like this:

```
---
layout: page-breadcrumbs.html
template:
title:
display_title:
permalink:
source:
lastupdated:
show_git_lastupdate:
concurrence:
plainlanguage:
collection:
children:
order:
majorlinks:
  - heading:
    links:
    - url:
      title:
      description:
relatedlinks:
  - heading:
    links:
    - url:
      title:
      description:
---
```

## Definitions and settings for each value

Jump to:

- [Layout](/front-matter.md#layout)
- [Template](/front-matter.md#template)
- [Title vs. Display title vs. Heading](/front-matter.md#title-vs-display-title)
- [Permalink](/front-matter.md#permalink)
- [Source](/front-matter.md#source)
- [Concurrence](/front-matter.md#concurrence)
- [Plain language certification](/front-matter.md#plain-language-certification)
- [Collections, children, and ordering](/front-matter.md#collections-children-and-ordering)
- [Major vs. Related links](/front-matter.md#major-vs-related-links)

### Layout

This sets a page up to use breadcrumb navigation. This is the **default setting** for static pages within our core public-facing content and should not need to be changed.

`layout: page-breadcrumbs.html`

### Template

There are 3 standard template options for content:

| Template                   | Use                                                                                                                                                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `template: level2-index `  | Used for hub pages like [va.gov/education/index.html](https://www.va.gov/education/). This template can display content and link lists, right-side promo and social contact links, but no left-side accordian navigation.                                                                                                                                                                |
| `template: detail-page `   | Used for detail pages like [va.gov/education/about-gi-bill-benefits/](https://www.va.gov/education/about-gi-bill-benefits/). Displays the same elements as `topic-landing`, in addition to previous/next page navigation at the bottom of the page to navigate through sequential content. Can also be used for landing pages that would benefit from the previous/next page navigation. |
| `template: topic-landing ` | Used for deeper landing pages like [va.gov/disability/eligibility/special-claims/](https://www.va.gov/disability/eligibility/special-claims/). This template can display content, side navigation, main links, and related links.                                                                                                                                                        |

### Title vs. Display Title vs Heading

**Title** is the full title displayed at the top of the page. Example:

`title: VA Burial Benefits and Memorial Items`

It is also what Google uses for SEO meta content. 

**Display title** is an optional shorter version of the title that appears in the side navigation and breadcrumbs. If left blank, these locations will display the content in the `title` field. Example:

`display_title: Burials and Memorials`

**Heading** is currently a conditional front matter attribute. When a value is defined, it will display as the title at the top of the page. If left empty, the title will be used to display at the top of the page.

### Permalink

Used on hub pages only, e.g. [va.gov/education/index.html](https://www.va.gov/education/). Example:

`permalink: /education/index.html`


### Source

Indicates the original source of the content, typically an va.gov subdomain URL

`source: http://benefits.va.gov/compensation/claims-postservice-exposures-camp_lejeune_water.asp`

### Concurrence

Metadata to indicate whether concurrence is complete or incomplete. Example:

`concurrence: incomplete`

### Plain language certification

Metadata used to describe the content's plain language compliance. Example:

`plainlanguage: MM-DD-YY certified in compliance with the Plain Writing Act`