## What is Front Matter?

Front Matter is structured data (in the form of YAML) that lives at the top of each content file that allows you to define metadata, appearance, and organization of content.


It will looks like this:

```
---
layout: page-breadcrumbs.html
template:
title:
display_title:
heading: 
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
vagovprod:
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
- [Production flag](/front-matter.md#production-flag)

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

This is also the text that:
* Is used as the name of the tab and bookmark
* Google uses for SEO meta content

**Display title** is an optional shorter version of the title that appears in the side navigation and breadcrumbs. If left blank, these locations will display the content in the `title` field. Example:

`display_title: Burials and Memorials`

**Heading** is currently a conditional front matter attribute. When a value is defined, it will display as the `<h1>` heading visable at the top of the page. If left empty, the title will be used to display as the `<h1>` heading.

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

### Collections, children, and ordering

Content can be grouped into collections, which are used to populate side navigation and previous/next page navigation.

**Collection** can be used to manually add a page to a collection if its parent folder has not been added to that collection via `/script/build.js`. Example:

`collection: collectionName`

(collectionName would be replaced by the name of the collection that's defined in `/script/build.js`)

**Children** is used when another collection should appear as a child of the current page. For example, the pages that appear under the GI Bill section would appear as children of the GI Bill landing page. A child collection will appear nested below the current page in the side navigation. Example:

`children: collectionName`

(collectionName would be replaced by the name of the child collection that's defined in `/script/build.js`)

See the detailed guide on [adding a collection of related links](https://github.com/department-of-veterans-affairs/vets-website/blob/main/docs/HowtoCreateCollectionsOrRelatedLinksInMetalsmith.md)

**Order** allows custom control over how the pages within a collection are ordered in the side navigation and previous/next page navigation.

Assign numbers to each page in the collection in ascending order. Example:

`order: 1`

`order: 5`

In the above example, the page with `order: 1` will appear above the page with `order: 5` in the side navigation. Note that order numbers do not need to be sequential; there can be gaps.

### Major vs. Related links

Optional lists of links at the bottom of a page.

`majorlinks:` **Major links** are used to navigate to child content of a section.

`relatedlinks:` **Related links** displayed in a grey box, and are used to navigate to non-child, related content to the subject.

`heading: ` Optional, adds a heading above a list of links to identify it. Can be left empty, but should **not** be removed or the links list will not appear at all.

`links:` this line introduces the list of links — leave this empty.

`url:` the URL for a link

`title:` the title displayed for a link

`description:` optional description for a link. Can be left empty.

**Adding multiple headings:** you can add multiple headings to create multiple lists of major or related links. Add the `heading` and `links` lines wherever an additional heading is desired.

```
  - heading:
    links:
```

Example of a list of **major** links with no heading and two links:

```
majorlinks:
  - heading:
    links:
    - url: /link1
      title: Link 1
      description: A description of link 1
    - url: /link2
      title: Link 2
      description: A description of link 2
```

Example of a list of **related** links with two heading with two links below each of them:

```
relatedlinks:
  - heading: Heading A
    links:
    - url: /link1
      title: Link 1
      description:
    - url: /link2
      title: Link 2
      description:
  - heading: Heading B
    links:
    - url: /link3
      title: Link 3
      description:
    - url: /link4
      title: Link 4
      description:
```

### Production flag

Metadata to indicate whether page should be included in production build and deploy pipeline. Defaults to `true` if absent. Useful for creating one-time prototype pages that should only be depoloyed on staging (e.g. this [sandbox for an appeals tool](https://github.com/department-of-veterans-affairs/vagov-content/blob/d5ce4f9ce0c3fc178a9856512829667933cff2df/pages/dst/index.md)). For more details, check out our [main documentation](https://github.com/department-of-veterans-affairs/vets.gov-team/blob/master/Work%20Practices/Engineering/Front%20End%20Feature%20Flags.md) on using front end feature flags.
