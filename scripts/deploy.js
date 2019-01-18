// Note, this file should only be called through `npm run deploy` because
// it depends on a build having run first

const childProcess = require('child_process');

const bucket = 's3://gifsmos-production-s3bucket-1smw9zdazkto/';

// Upload non-html files, excluding redirects
childProcess.execFileSync(
  'aws',
  [
    's3',
    'sync',
    '--acl',
    'public-read',
    '--delete',
    '--exclude',
    '*.html',
    'build/',
    bucket
  ],
  { stdio: 'inherit' }
);

// Make sure charset is set for html files and give them a fairly short
// max-age
childProcess.execFileSync(
  'aws',
  [
    's3',
    'sync',
    '--acl',
    'public-read',
    '--delete',
    '--exclude',
    '*',
    '--include',
    '*.html',
    '--no-guess-mime-type',
    '--content-type',
    'text/html; charset=utf-8',
    '--cache-control',
    'max-age=600',
    'build/',
    bucket
  ],
  { stdio: 'inherit' }
);
