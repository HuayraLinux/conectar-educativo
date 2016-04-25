VERSION=0.4.2
NOMBRE="conectar-educativo"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}${NOMBRE} - ${VERSION}${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores${N}"
	@echo ""
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}compilar${N}        Genera los archivos compilados."
	@echo "    ${G}compilar_live${N}   Compila de forma contínua."
	@echo ""
	@echo "    ${G}ejecutar_linux${N}  Prueba la aplicacion sobre Huayra."
	@echo "    ${G}ejecutar_mac${N}    Prueba la aplicacion sobre OSX."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version${N}         Genera una nueva versión."
	@echo "    ${G}subir_version${N}   Sube version generada al servidor."
	@echo "    ${G}log${N}             Muestra los cambios desde el ultimo tag."
	@echo ""


iniciar:
	npm install --no-option
	./node_modules/bower/bin/bower install

dist: compilar

ejecutar_linux: 
	nw dist

ejecutar_mac:
	/Applications/nwjs.app/Contents/MacOS/nwjs dist

test_mac: ejecutar_mac

build: compilar

compilar:
	./node_modules/ember-cli/bin/ember build

compilar_live:
	./node_modules/ember-cli/bin/ember build --watch

version_patch:
	# patch || minor
	@bumpversion patch --current-version ${VERSION} public/package.json Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make subir_version"

version_minor:
	@bumpversion minor --current-version ${VERSION} public/package.json Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make subir_version"

ver_sync: subir_version

subir_version:
	git commit -am 'release ${VERSION}'
	git tag '${VERSION}'
	git push
	git push --all
	git push --tags

log:
	git log ${VERSION}...HEAD --graph --oneline --decorate

.PHONY: dist
