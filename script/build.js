// Builds the site using Metalsmith as the top-level build runner.
const Metalsmith = require('metalsmith');
const archive = require('metalsmith-archive');
const assets = require('metalsmith-assets');
const blc = require('metalsmith-broken-link-checker');
const collections = require('metalsmith-collections');
const commandLineArgs = require('command-line-args');
const dateInFilename = require('metalsmith-date-in-filename');
const define = require('metalsmith-define');
const filenames = require('metalsmith-filenames');
const inPlace = require('metalsmith-in-place');
const layouts = require('metalsmith-layouts');
const liquid = require('tinyliquid');
const markdown = require('metalsmith-markdownit');
const moment = require('moment');
const navigation = require('metalsmith-navigation');
const permalinks = require('metalsmith-permalinks');
const redirect = require('metalsmith-redirect');
const sitemap = require('metalsmith-sitemap');
const watch = require('metalsmith-watch');
const nonceTransformer = require('./metalsmith/nonceTransformer');
const appIncluder = require('./metalsmith/appIncluder');
const serve = require('metalsmith-serve');

const sourceDir = '../content/pages';

const smith = Metalsmith(__dirname); // eslint-disable-line new-cap

const optionDefinitions = [
  { name: 'watch', type: Boolean, defaultValue: false },
  // Catch-all for bad arguments.
  { name: 'unexpected', type: String, multile: true, defaultOption: true },
];
const options = commandLineArgs(optionDefinitions);

// Custom liquid filter(s)
liquid.filters.humanizeDate = (dt) => moment(dt).format('MMMM D, YYYY');

// Set up Metalsmith. BE CAREFUL if you change the order of the plugins. Read the comments and
// add comments about any implicit dependencies you are introducing!!!
//
smith.source(sourceDir);
smith.destination('../build/production');

// This adds the filename into the "entry" that is passed to other plugins. Without this errors
// during templating end up not showing which file they came from. Load it very early in in the
// plugin chain.
smith.use(filenames());

smith.use(define({
  // Does anything even look at `site`?
  site: require('../config/site'),
}));

// See the collections documentation here:
// https://github.com/segmentio/metalsmith-collections
// Can sort by any front matter property you'd like, or by function.
// Can define a collection by its path or by adding a `collection`
// property to the Markdown document.

smith.use(collections({
  burials: {
    sortBy: 'order',
    metadata: {
      name: 'Burials and Memorials'
    }
  },
  burialsHonor: {
    pattern: 'burials-and-memorials/honor/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Honor a Deceased Veteran'
    }
  },
  burialsPreNeed: {
    pattern: 'burials-and-memorials/pre-need/after*.md',
    sortBy: 'title',
    metadata: {
      name: 'Pre-need Determination'
    }
  },
  burialsPlanning: {
    sortBy: 'title',
    metadata: {
      name: 'Burial Planning'
    }
  },
  burialsSurvivors: {
    pattern: 'burials-and-memorials/survivor-and-dependent-benefits/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Survivor and Dependent Benefits'
    }
  },
  disability: {
    pattern: 'disability-benefits/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Disability Benefits'
    }
  },
  disabilityAfterYouApply: {
    pattern: 'disability-benefits/after-you-apply/*.md',
    sortBy: 'order',
    metadata: {
      name: 'After You Apply'
    }
  },
  disabilityApply: {
    pattern: 'disability-benefits/apply/*.md',
    sortBy: 'order',
    metadata: {
      name: 'How to Apply'
    }
  },
  disabilityClaimsAppeal: {
    pattern: 'disability-benefits/claims-appeal/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Appeals'
    }
  },
  disabilityClaimTypes: {
    pattern: 'disability-benefits/apply/claim-types/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Claim Types'
    }
  },
  disabilityClaimTypesPredischarge: {
    pattern: 'disability-benefits/apply/claim-types/predischarge-claim/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Pre-discharge Claim'
    }
  },
  disabilityConditions: {
    pattern: 'disability-benefits/conditions/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Conditions'
    }
  },
  disabilityConditionsExposure: {
    pattern: 'disability-benefits/conditions/exposure-to-hazardous-materials/*.md',
    sortBy: 'title',
    metadata: {
      name: 'Contact with Hazardous Materials'
    }
  },
  disabilityConditionsSpecial: {
    pattern: 'disability-benefits/conditions/special-claims/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Special Claims'
    }
  },
  disabilityConditionsAgentOrange: {
    pattern: 'disability-benefits/conditions/exposure-to-hazardous-materials/agent-orange/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Agent Orange'
    }
  },
  disabilityEligibility: {
    pattern: 'disability-benefits/eligibility/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Eligibility'
    }
  },
  disabilityEvidence: {
    pattern: 'disability-benefits/apply/evidence/*.md',
    sortBy: 'order',
    metadata: {
      name: 'How to Gather Evidence for Your Claim'
    }
  },
  education: {
    pattern: '',
    sortBy: 'order',
    metadata: {
      name: 'Education and Training'
    }
  },
  educationAdvancedTraining: {
    pattern: 'education/advanced-training-and-certifications/*.md',
    sortBy: 'title',
    metadata: {
      name: 'Advanced Training and Certifications'
    }
  },
  educationGIBill: {
    pattern: 'education/gi-bill/*.md',
    sortBy: 'order',
    metadata: {
      name: 'GI Bill'
    }
  },
  educationGIBillSurvivors: {
    pattern: 'education/gi-bill/survivors-dependent-assistance/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Survivors and Dependents'
    }
  },
  educationNonTraditional: {
    pattern: 'education/work-learn/non-traditional/*.md',
    sortBy: 'title',
    metadata: {
      name: 'Non-Traditional Options'
    }
  },
  educationOtherPrograms: {
    pattern: 'education/other-educational-assistance-programs/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Other Educational Assistance Programs'
    }
  },
  educationToolsPrograms: {
    pattern: 'education/tools-programs/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Career Counseling'
    }
  },
  educationWorkLearn: {
    pattern: 'education/work-learn/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Work and Learn'
    }
  },
  healthCare: {
    sortBy: 'order',
    metadata: {
      name: 'Health Care'
    }
  },
  healthCareCoverage: {
    pattern: 'health-care/about-va-health-care/*.md',
    sortBy: 'order',
    metadata: {
      name: 'VA Health Care Coverage'
    }
  },
  healthCareCoverageFamily: {
    pattern: 'health-care/family-caregiver-health-benefits/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Family and Caregiver Health Benefits'
    }
  },
  healthCareCoverageVision: {
    pattern: 'health-care/about-va-health-care/vision-care/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Vision Care'
    }
  },
  healthCareConditions: {
    pattern: 'health-care/health-conditions/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Health Needs and Conditions'
    }
  },
  healthCareMentalHealth: {
    pattern: 'health-care/health-conditions/mental-health/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Mental Health'
    }
  },
  healthCareServiceRelated: {
    pattern: 'health-care/health-conditions/conditions-related-to-service-era/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Concerns Related to Service Era'
    }
  },
  housing: {
    pattern: 'housing-assistance/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Housing Assistance'
    }
  },
  housingHomeLoans: {
    pattern: 'housing-assistance/home-loans/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Home Loans'
    }
  },
  housingVALoans: {
    pattern: 'housing-assistance/home-loans/loan-options/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Loan Options'
    }
  },
  lifeInsurance: {
    pattern: 'life-insurance/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Life Insurance'
    }
  },
  lifeInsuranceOptions: {
    pattern: 'life-insurance/options-and-eligibility/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Options'
    }
  },
  pension: {
    pattern: 'pension/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Pension Benefits'
    }
  },
  pensionEligibility: {
    pattern: 'pension/eligibility/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Eligibility'
    }
  },
  pensionSurvivors: {
    pattern: 'pension/survivors-pension/*.md',
    sortBy: 'order',
    metadata: {
      name: 'Survivors Pension'
    }
  },
  pensionApplication: {
    pattern: 'pension/apply/*.md',
    sortBy: 'order',
    metadata: {
      name: 'How to Apply'
    }
  },
  vre: {
    pattern: 'employment/vocational-rehab-and-employment/*md',
    sortBy: 'order',
    metadata: {
      name: 'Vocational Rehab &amp; Employment'
    }
  },
  vreServiceDisabled: {
    pattern: 'employment/vocational-rehab-and-employment/service-disabled/*md',
    sortBy: 'order',
    metadata: {
      name: 'Servicemember & Veteran Programs'
    }
  },
}));

smith.use(dateInFilename(true));
smith.use(archive());  // TODO(awong): Can this be removed?
smith.use(appIncluder);

if (options.watch) {
  // TODO(awong): Enable live reload of metalsmith pages per instructions at
  //   https://www.npmjs.com/package/metalsmith-watch
  smith.use(
    watch({
      paths: {
        '../content/**/*': '**/*.{md,html}',
      },
      livereload: true,
    })
  );

  smith.use(serve());
}

smith.use(assets({ source: '../assets', destination: './' }));

// Liquid substitution must occur before markdown is run otherwise markdown will escape the
// bits of liquid commands (eg., quotes) and break things.
//
// Unfortunately this must come before permalinks and navgation because of limitation in both
// modules regarding what files they understand. The consequence here is that liquid templates
// *within* a single file do NOT have access to the final path that they will be rendered under
// or any other metadata added by the permalinks() and navigation() filters.
//
// Thus far this has not been a problem because the only references to such paths are in the
// includes which are handled by the layout module. The layout module, luckily, can be run
// near the end of the filter chain and therefore has access to all the metadata.
//
// If this becomes a barrier in the future, permalinks should be patched to understand
// translating .md files which would allow inPlace() and markdown() to be moved under the
// permalinks() and navigation() filters making the variable stores uniform between inPlace()
// and layout().
smith.use(inPlace({ engine: 'liquid', pattern: '*.{md,html}' }));
smith.use(markdown({
  typographer: true,
  html: true
}));

// Responsible for create permalink structure. Most commonly used change foo.md to foo/index.html.
//
// This must come before navigation module, otherwise breadcrunmbs will see the wrong URLs.
//
// It also must come AFTER the markdown() module because it only recognizes .html files. See
// comment above the inPlace() module for explanation of effects on the metadata().
smith.use(permalinks({
  relative: false,
  linksets: [{
    match: { collection: 'posts' },
    pattern: ':date/:slug'
  }]
}));

smith.use(navigation({
  navConfigs: {
    sortByNameFirst: true,
    breadcrumbProperty: 'breadcrumb_path',
    pathProperty: 'nav_path',
    includeDirs: true
  },
  navSettings: {}
}));

// Note that there is no default layout specified.
// All pages must explicitly declare a layout or else it will be rendered as raw html.
smith.use(layouts({
  engine: 'liquid',
  directory: '../content/layouts/',
  // Only apply layouts to markdown and html files.
  pattern: '**/*.{md,html}'
}));

// TODO(awong): This URL needs to change based on target environment.
smith.use(sitemap({
  hostname: 'https://www.vets.gov',
  omitIndex: true
}));

if (!options.watch && !(process.env.CHECK_BROKEN_LINKS === 'no')) {
  smith.use(blc({
    allowRedirects: true,  // Don't require trailing slash for index.html links.
    warn: false,           // Throw an Error when encountering the first broken link not just a warning.
    allowRegex: new RegExp(
      ['/education/gi-bill/post-9-11/ch-33-benefit',
        '/employment/commitments',
        '/employment/employers',
        '/employment/job-seekers/create-resume',
        '/employment/job-seekers/search-jobs',
        '/employment/job-seekers/skills-translator',
        '/gi-bill-comparison-tool/',
        '/education/apply-for-education-benefits/application',
        '/pension/application/527EZ',
        '/burials-and-memorials/application/530',
        '/health-care/apply/application',
        '/veteran-id-card/apply',
        '/veteran-id-card/how-to-get',
        '/download-va-letters/letters'].join('|'))
  }));
}

/*
Redirects locally. DevOps must update Nginx config for production
*/
smith.use(redirect({
  '/2015/11/11/why-we-are-designing-in-beta.html': '/2015/11/11/why-we-are-designing-in-beta/',
  '/education/apply-for-education-benefits/': '/education/apply/'
}));

/*
Add nonce attribute with substition string to all inline script tags
Convert onclick event handles into nonced script tags
*/
smith.use(nonceTransformer);

/* eslint-disable no-console */
smith.build((err) => {
  if (err) throw err;

  if (options.watch) {
    console.log('Metalsmith build finished!  Starting metalsmith-serve...');
  } else {
    console.log('Build finished!');
  }
});
