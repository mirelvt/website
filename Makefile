sources = $(wildcard *.shtml)
objects = $(sources:.shtml=.html)
DEST = html/

all: $(objects)

%.html: %.shtml base.xsl
	xsltproc -o $(DEST)$@ --stringparam target $@ base.xsl $<

watch:
		sass --watch scss/base.scss:$(DEST)css/base.min.css --style compressed

.PHONY: watch all
