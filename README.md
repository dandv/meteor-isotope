# Reactive Block Grid

### What does it do ?

This plugin will create a reactive [Isotope](http://isotope.metafizzy.co) masonry for you. If you update or filter your collection/cursor it will be automatically reflected in the layout. 

### Live demo
This plugin is based on the work of [smeevil](https://github.com/smeevil/responsive-block-grid/)

### Usage

**Installation:**

~~~js
meteor add jorisroling:isotope
~~~

**Basic usage:**

The most basic option to use it in your templates is as follows :
~~~js
{{> isotope cursor=myCursor template='myTemplate'}}
~~~

To add classes to the generated &lt;ul/&gt; you can pass them using the cssClass option like so :
~~~js
{{> isotope cursor=myCursor template='myTemplate' cssClass='small-block-grid-3 medium-block-grid-6'}}
~~~



**Options:**

You can pass the following isotope options to the template:  transitionDuration, layoutMode, gutter, columnWidth. Please look at the [isotope read me](http://isotope.metafizzy.co) for more information on these options.

**Full example:**
~~~js
{{> isotope cursor=myCursor template='myTemplate' transitionDuration='1.5s' layoutMode='fitRows' gutter=20 columnWidth='.gutter-width'}}
~~~

Licensed under the WTFPL License. See the `LICENSE` file for details.
