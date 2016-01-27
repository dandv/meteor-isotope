Template.isotopeItem.helpers({
	partial: function() {
		return Template.parentData(1).template;
	},
	position: function() {
		var idMap;
		idMap = Template.parentData(1).cursor.fetch().map(function(i) {
			return i._id;
		});
		return _.indexOf(idMap, this._id);
	}
});

Template.isotopeItem.onRendered(function() {
	var $ul, li;
	$ul = Template.parentData(1).isotope;
	if ($ul != null ? $ul.data('isotope-initialized') : void 0) {
		li = $(this.find('li'));
		$ul.isotope('insert', li);
		setTimeout(function() {
			return $ul.isotope('updateSortData').isotope();
		}, 100);
		return li.imagesLoaded(function() {
			return $ul.isotope('layout');
		});
	}
})

Template.isotope.helpers({
	cursor: function() {
		return this.cursor;
	},
	cssClasses: function() {
		return this.cssClass;
	}
});


Template.isotope.onRendered(function () {
	var $el, el, j, k, l, len, len1, len2, masonryOptions, opt, options, ref, ref1, ref2;
	options = {
		itemSelector: 'li',
		sortBy: 'isotopePosition',
		sortAscending: true,
		getSortData: {
			isotopePosition: '[data-isotope-position] parseInt'
		}
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
	
	$el.isotope(options);
	ref2 = $(this.find('.isotopeElementContainer'));
	for (l = 0, len2 = ref2.length; l < len2; l++) {
		el = ref2[l];
		// console.log(el);
		$el.isotope('insert', el);
	}
	$el.attr('data-isotope-initialized', 'true');
	this.data.isotope = $el;
	$el.imagesLoaded(function() {
		return $el.isotope('layout');
	});
	if ((this.data.cursor.limit != null) || (this.data.cursor.skip != null)) {
		return this.data.cursor.observeChanges({
			addedBefore: function() {
				return null;
			},
			movedBefore: function() {
				return null;
			},
			removed: function(id) {
				if ($('ul.isotope').attr('data-isotope-initialized')) {
					var item, selector;
					selector = "[data-isotope-item-id=" + id + "]";
					item = $el.find(selector);
					return $el.isotope('remove', item).isotope('layout');
				}
			}
		});
	} else {
		return this.data.cursor.observe({
			removed: function(doc) {
				if ($('ul.isotope').attr('data-isotope-initialized')) {
					var item, selector;
					selector = "[data-isotope-item-id=" + doc._id + "]";
					item = $el.find(selector);
					return $el.isotope('remove', item).isotope('layout');
				}
			}
		});
	}

})
