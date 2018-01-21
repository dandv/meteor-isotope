const isotope = { options: {} };

function grabId(id) {
  // console.log(id);
  if (typeof id === 'object' && id.id) id = id.id;

  if (typeof id === 'string') {
    // ObjectID("56cb3263d4d84c1558605467")
    const myRegexp = /^ObjectID\("(.*?)"\)$/;
    const match = myRegexp.exec(id);
    if (match && match.length > 1 && match[1]) {
      return match[1];
    }
  } else if (typeof id === 'object' && id._str) {
    return id._str;
  }
  return id;
}

Template.isotopeItem.helpers({
  partial() {
    return Template.parentData(2).template;
  },
  position() {
    let idMap = [];
    const cursor = prepCursor(Template.parentData(2).cursor);
    // console.log({cur:cursor});
    if (cursor) {
      for (const c in cursor) {
        idMap = idMap.concat(cursor[c].map(i => i._id));
      }
    }
    return _.indexOf(idMap, this._id);
  },
  id() {
    return grabId(this._id);
  },
  itemClass() {
    return isotope.options.itemClass || Template.parentData(2).itemClass; // example: 'col-lg-3 col-md-4 col-sm-6 col-xs-12 isotopeBlock';
  },

  sortFields() {
    const { optionsForIsotope } = Template.parentData(2);
    if (!optionsForIsotope) return {};

    const { sortFields } = optionsForIsotope;
    if (!sortFields || !sortFields.length) return {};

    const dataAttributes = sortFields.map(sF => ({
      [`data-isotope-${sF.toLowerCase()}`]: this[sF],
    }));

    const data = dataAttributes.reduce((a, b) => Object.assign({}, a, b), {});

    return data;
  },

  filterFields() {
    const { optionsForIsotope } = Template.parentData(2);
    if (!optionsForIsotope) return {};

    const { filterFields } = optionsForIsotope;
    if (!filterFields || !filterFields.length) return {};

    const dataAttributes = filterFields.join(' ');

    return dataAttributes;
  },

  sortFunctions() {
    const doc = this;

    const { optionsForIsotope } = Template.parentData(2);
    if (!optionsForIsotope) return {};

    const { sortFunctions } = optionsForIsotope;
    if (!sortFunctions || !sortFunctions.length) return {};

    const dataAttributes = sortFunctions.map(sF => sF(doc));

    const data = dataAttributes.reduce((a, b) => Object.assign({}, a, b), {});

    return data;
  },

  filterFunctions: function name() {
    const doc = this;

    const { optionsForIsotope } = Template.parentData(2);
    if (!optionsForIsotope) return {};

    const { filterFunctions } = optionsForIsotope;
    if (!filterFunctions || !filterFunctions.length) return '';

    const classes = filterFunctions.map(fF => fF(doc)).join(' ');

    return classes;
  },
});

Template.isotopeItem.onRendered(function () {
  let $ul,
    li;
  $ul = Template.parentData(1).isotope;
  if ($ul != null ? $ul.data('isotope-initialized') : void 0) {
    li = $(this.find('li'));
    $ul.isotope('insert', li);
    setTimeout(
      () =>
        // console.log('updateSortData')
        $ul.isotope('updateSortData').isotope(),
      100,
    );
    return li.imagesLoaded(() =>
      // console.log('layout')
      $ul.isotope('layout'));
  }
});

function prepCursor(cursor) {
  let result;
  if (Array.isArray(cursor)) {
    result = [];
    for (const c in cursor) {
      if (
        Array.isArray(cursor[c]) ||
        cursor[c] instanceof Mongo.Collection.Cursor
      ) {
        result.push(cursor[c]);
      } else {
        result.push([cursor[c]]);
      }
    }
  } else if (cursor instanceof Mongo.Collection.Cursor) {
    result = [cursor];
  } else {
    result = [[cursor]];
  }
  return result;
}

Template.isotope.helpers({
  cursor() {
    return prepCursor(this.cursor);
  },
  cssClasses() {
    return this.cssClass;
  },
  optionsForIsotope() {
    return Template.instance().data.optionsForIsotope;
  },
});

Template.isotope.onCreated(() => {
  // if (this.data.cursor) this.data.cursor=prepCursor(this.data.cursor);
});

function reloadIsotope(context) {
  try {
    ref2 = $(context.find('.isotopeElementContainer'));
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      el = ref2[l];
      // console.log(el);
      $el.isotope('insert', el);
    }
    setTimeout(
      () =>
        // console.log('updateSortData')
        $el.isotope('updateSortData').isotope(),
      100,
    );
    $el.imagesLoaded(() => $el.isotope('layout'));
  } catch (e) {}
}

Template.isotope.onRendered(function () {
  // console.log('Template.isotope.onRendered')
  let $el,
    el,
    j,
    k,
    l,
    len,
    len1,
    len2,
    masonryOptions,
    opt,
    options,
    ref,
    ref1,
    ref2;
  options = {
    itemSelector: 'li',
    sortBy: 'isotopePosition',
    sortAscending: true,
    getSortData: {
      isotopePosition: '[data-isotope-position] parseInt',
    },
  };

  ref = ['layoutMode', 'transitionDuration'];
  for (j = 0, len = ref.length; j < len; j++) {
    opt = ref[j];
    if (this.data[opt] != null) {
      options[opt] = this.data[opt];
    }
  }
  masonryOptions = {};
  ref1 = ['columnWidth', 'gutter', 'isFitWidth'];
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    opt = ref1[k];
    if (this.data[opt] != null) {
      masonryOptions[opt] = this.data[opt];
    }
  }
  $el = $(this.find('ul.isotope'));
  if (!_.isEmpty(masonryOptions)) {
    options.masonry = masonryOptions;
  }
  // console.log({isotope:options});

  // This allows the user to set any and override any options.
  _.extend(options, this.data.optionsForIsotope);

  $el.isotope(options);

  ref2 = $(this.find('.isotopeElementContainer'));
  for (l = 0, len2 = ref2.length; l < len2; l++) {
    el = ref2[l];
    // console.log(el);
    $el.isotope('insert', el);
  }
  $el.attr('data-isotope-initialized', 'true');
  this.data.isotope = $el;
  $el.imagesLoaded(() => $el.isotope('layout'));
  const self = this;
  const cursor = prepCursor(this.data.cursor);
  // console.log({cursor:cursor});
  for (const ci in cursor) {
    // console.log({cursor:cursor[ci]});
    // console.log(cursor[ci] instanceof Mongo.Collection.Cursor);
    if (cursor[ci] instanceof Mongo.Collection.Cursor) {
      if (cursor[ci].limit != null || cursor[ci].skip != null) {
        /* return */ cursor[ci].observeChanges({
          // added(id, fields) {
          // 	console.log('doc inserted');
          // },
          // changed(id, fields) {
          // 	console.log('doc updated');
          // },
          addedBefore() {
            // console.log('addedBefore');
            // reloadIsotope(self);
            try {
              ref2 = $(self.find('.isotopeElementContainer'));
              for (l = 0, len2 = ref2.length; l < len2; l++) {
                el = ref2[l];
                // console.log(el);
                $el.isotope('insert', el);
              }
              setTimeout(() => {
                // console.log('updateSortData')
                if (!$el.data('isotope')) return;
                return $el.isotope('updateSortData').isotope();
              }, 100);
              $el.imagesLoaded(() => {
                if (!$el.data('isotope')) return;
                return $el.isotope('layout');
              });
            } catch (e) {}
            return null;
          } /* ,100) */,
          movedBefore() {
            // console.log('movedBefore');
            return null;
          },
          removed(id) {
            // console.log('removed: '+id);
            if ($('ul.isotope').attr('data-isotope-initialized')) {
              let item,
                selector;
              selector = `[data-isotope-item-id=${id}]`;
              item = () => $el.find(selector);

              $el.isotope('remove', item()).isotope('layout');

              console.log(item.length);
            }
          },
          changed(id, fields) {
            Tracker.afterFlush(() => {
              $('ul.isotope').isotope();
            });
          },
        });
      } else {
        /* return */ cursor[ci].observe({
          added() {
            // console.log('addedBefore');
            // reloadIsotope(self);
            try {
              ref2 = $(self.find('.isotopeElementContainer'));
              for (l = 0, len2 = ref2.length; l < len2; l++) {
                el = ref2[l];
                // console.log(el);
                $el.isotope('insert', el);
              }
              setTimeout(
                () =>
                  // console.log('updateSortData')
                  $el.isotope('updateSortData').isotope(),
                100,
              );
              $el.imagesLoaded(() => $el.isotope('layout'));
            } catch (e) {}
            return null;
          } /* ,100) */,
          movedBefore() {
            // console.log('movedBefore');
            return null;
          },
          removed(doc) {
            // console.log('removed: '+doc._id);
            if ($('ul.isotope').attr('data-isotope-initialized')) {
              let item,
                selector;
              selector = `[data-isotope-item-id=${doc._id}]`;
              item = $el.find(selector);
              return $el.isotope('remove', item).isotope('layout');
            }
          },
          changed(id, fields) {
            Tracker.afterFlush(() => {
              $('ul.isotope').isotope();
            });
          },
        });
      }
    }
  }
});
