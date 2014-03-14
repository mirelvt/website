sources = $(wildcard *.shtml)
objects = $(sources:.shtml=.html)
DEST = html/

all: $(objects)

%.html: %.shtml base.xsl
	xsltproc -o $(DEST)$@ --stringparam target $@ base.xsl $<

.PHONY: all
