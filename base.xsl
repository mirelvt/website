<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:h="http://www.w3.org/1999/xhtml"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="h">

  <xsl:output method="xml" media-type="text/html"
      omit-xml-declaration="yes"
      encoding="utf-8"
      indent="yes" />

  <xsl:param name="target" />

  <xsl:template match="/">
     <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="nl">
      <xsl:call-template name="head-section" />

      <body>
        <header class="header-menu">
           <nav>
            <ul>
              <xsl:for-each select="document('navigation.xml')/navigation/item">
                <li>
                  <xsl:if test="$target = name/@url">
                    <xsl:attribute name="class">selected</xsl:attribute>
                  </xsl:if>
                  <a href="{name/@url}">
                    <xsl:value-of select="name" />
                  </a>
                </li>
              </xsl:for-each>
            </ul>
          </nav>
        </header>

        <xsl:copy-of select="/h:html/h:body/node()" />
      </body>
    </html>
  </xsl:template>

  <xsl:template name="head-section">
    <head>
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width" />
      <title>
        <xsl:value-of select="/h:html/h:head/h:title" />
      </title>
      <link rel="stylesheet" href="css/base.min.css" />
    </head>
  </xsl:template>

</xsl:stylesheet>