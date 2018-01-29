Package.describe({
  name: 'nadeemjq:isotope',
  summary: 'Meteor implementation of Isotope',
  version: '1.0.14',
  git: 'https://github.com/nadeemja/meteor-isotope.git',
});

Package.onUse((api) => {
  api.versionsFrom('METEOR@1.2.1');
  api.use(['templating', 'underscore@1.0.0', 'mrt:jquery-imagesloaded@0.0.2']);
  api.add_files(
    ['isotope.html', 'isotope.js', 'isotope.pkgd.js', 'isotope.css'],
    'client',
  );
  api.export('isotope');
});
