JS Sequence Diagrams
=============================================
**Generates UML sequence diagrams from simple text**  
<https://bramp.github.io/js-sequence-diagrams/>

by [Andrew Brampton](http://bramp.net) 2012-2015


Example
-------
We turn

    Alice->Bob: Hello Bob, how are you?
    Note right of Bob: Bob thinks
    Bob-->Alice: I am good thanks!

into

![Sample generated UML diagram](http://bramp.github.io/js-sequence-diagrams/images/sample.svg)

Requirements
------------
You will need [Raphaël](http://raphaeljs.com/), [underscore.js](http://underscorejs.org/) (or [lodash](https://lodash.com/)), and optionally [jQuery](https://jquery.com/).


Installation
----------------------

### bower

Just run `bower install bramp/js-sequence-diagrams` and include the scripts below:

```html
<script src="{{ bower directory }}/raphael/raphael-min.js"></script>
<script src="{{ bower directory }}/underscore/underscore-min.js"></script>
<script src="{{ bower directory }}/js-sequence-diagrams/build/sequence-diagram-min.js"></script>
```

### Manually

You can download the dependencies (see requirements above) and include them on your page like so:

```html
<script src="underscore-min.js"></script>
<script src="raphael-min.js"></script>
<script src="sequence-diagram-min.js"></script>
```

Usage
-----

You can use the Diagram class like:

```html
<div id="diagram">Diagram will be placed here</div>
<script> 
  var diagram = Diagram.parse("A->B: Does something");
  diagram.drawSVG('diagram');
</script>
```

or use jQuery to do all the work:
```html
<div class="diagram">A->B: Message</div>
<script>
$(".diagram").sequenceDiagram({theme: 'hand'});
</script>
```

Build requirements
------------------
```bash
# JavaScript Preprocessor 
sudo gem install jspp

## Then to build, just run:
make

## The Makefile will use npm to install all the correct dev dependencies
```

How to release
--------------
* Make sure all changes checked in
* Bump version in src/main.js and bower.json
* ``make clean``
* ``make``
* ``git add -f src/main.js bower.json build/sequence-diagram-min.js build/sequence-diagram-min.js.map``
* ``git commit -m "Released version 1.x.x"``
* ``git push origin master``
* ``git tag -a v1.x.x -m v1.x.x``
* ``git push origin v1.x.x``

TODO
----
* Other themes
* Rethink the use of Raphael. Due to its support of VML (which I don't care about), it makes many things harder. For example, font support, css styling, etc. Perhaps draw the SVG by hand, or find a small helper library
* Dozens of other issues on https://github.com/bramp/js-sequence-diagrams/issues

Contributors
------------

via [GitHub](https://github.com/bramp/js-sequence-diagrams/graphs/contributors)

Thanks
------
This project makes use of [Jison](http://zaach.github.io/jison/), Raphaël, underscore.js, and the awersome [Daniel font](http://www.dafont.com/daniel.font) (which is free to use for any purpose).

Many thanks to [Web Sequence Diagrams](http://www.websequencediagrams.com/) which greatly inspired this project, and forms the basis for the syntax.

Related
-------

* [Web Sequence Diagrams](http://www.websequencediagrams.com/) Server side version with a commerical offering
* [flowchart.js](http://adrai.github.io/flowchart.js/) A similar project that draws flow charts in the browser

License
-------
Simplified BSD License
