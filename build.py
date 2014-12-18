#! /usr/bin/python
# Basically, run this script every time you modify any of the modules.

import sys, os

f = open("auto/main.js", "wb")
f.write("// automatically generated; don't touch this!\n")
f.write("function initModules(){\n")

for name in os.listdir("modules"):
	if name.endswith(".js"):
		modname = name[:-3]
		f.write("\tinit%s();\n" % modname)

f.close()
