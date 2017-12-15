Package.describe({
  name: 'jorisroling:isotope',
  summary: 'Meteor implementation of Isotope',
  version: '1.0.16',
  git: 'https://github.com/jorisroling/meteor-isotope.git'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.2.1");
  api.use(
      [
        'templating',
        'underscore@1.0.0',
      ]
  );
  
  api.add_files([
      'isotope.html',
      'isotope.js',
      'isotope.pkgd.js',
      'imagesloaded.pkgd.js',
      'isotope.css'
    ], 'client'
  );
  api.export('isotope');
});
