app.component('categoria', {
    bindings: {
        id: '=',
        conectorPadre : '&',
        conceptitos : '<',
        conector: '&'
    },
    controllerAs: 'ctrl',
    templateUrl: '/mainpartials/categoria',
    controller: function($rootScope, $scope, $mdDialog, Categoria, $mdExpansionPanel) {

        function Comparar(array,valor){
            return array.findIndex(n => n.id === valor.id) > -1 ? true : false
        }

        var self = this;

        self.loading = true

        class categoria_{

            constructor(arg){
                this.id = arg.id,
                this.nombre = arg.nombre
                this.bloqueo = false;
                this.conceptos = []
            }

            obtenerConceptos(){
                
                this.conceptos.length > 0 ? '' : (self.loading = true, Categoria.allConceptos(this.id)
                    .then(res => res.data.forEach(n => self.categoria.conceptos.push(new concepto_(n) ) ))
                    .then(() => self.loading = false)
                    .then(() => $scope.$digest()))

            }

            bloquear(obj){

                let idx = self.categoria.conceptos.findIndex(n => n.id === obj.id)
                self.categoria.conceptos[idx].bloqueo = !self.categoria.conceptos[idx].bloqueo
                self.categoria.conceptos[idx].cantidad = obj.cantidad
                self.categoria.conceptos[idx].limite = obj.limite
                self.categoria.conceptos[idx].nombre = obj.nombre

                console.log(self.categoria.conceptos)

                this.bloqueo = self.categoria.conceptos.findIndex(n => n.bloqueo === true) > -1 ?  true : false

                self.conector({
                    $event : this.bloqueo,
                    id: this.id,
                    cantidad: obj.cantidad,
                    idConcepto: obj.id,
                    limite: obj.limite
                });

            }

            async procesar(){

                self.loading = true

                /*if(self.categoria.id === 4){
                    console.log('antes')
                    console.log(self.categoria)
                    console.log(self.conceptitos)
                    console.log(JSON.stringify( self.categoria.conceptos))
                }*/

                await self.categoria.conceptos.forEach((n, key) => {
                    //
                    let algo = Comparar(self.conceptitos, n)

                    console.log('el item' +  n.id + ' es ' +  algo )


                    // console.log('Splice :' + JSON.stringify(self.categoria.conceptos) )


                    if(!Comparar(self.conceptitos, n) && !n.bloqueo ){

                        self.categoria.conceptos.splice(key, 1)
                    }

                })

                $scope.$digest()

                await self.conceptitos.forEach(n => {

                    // console.log('Push :' + JSON.stringify(self.categoria.conceptos) )
                    //
                    // let algo =

                    if(!Comparar(self.categoria.conceptos, n)){
                        self.categoria.conceptos.push(new concepto_(n))
                    }

                })

                $scope.$digest()

                // self.conceptos = self.conceptitos.map(n => new concepto_(n))

                self.loading = false

                if(self.categoria.conceptos.length > 0){
                    $mdExpansionPanel().waitFor(_.toString(self.categoria.id)).then(function (instance) {
                        instance.expand();
                    });
                }

                /*if(self.categoria.id === 4){
                    console.log('despues')
                    console.log(self.categoria)
                    console.log(self.conceptitos)
                    console.log(JSON.stringify( self.categoria.conceptos))
                }*/



            }

        }

        class concepto_ {
            constructor(arg){
                this.id = arg.id,
                this.bloqueo = false
                this.cantidad = 0
            }
        }

        Categoria.one(this.id)
        .then(res => self.categoria = new categoria_(res.data))
        .then(() => self.categoria.procesar())
        .then(() => self.loading = false)
        .then(() => $scope.$digest())

        this.$onChanges = (obj) => {

            if(!_.isUndefined(self.categoria)){
                self.categoria.procesar()
                console.log(obj)
            }

        }
    }
})

app.component('concepto', {
    bindings: {
        id: '=',
        conector: '&'
    },
    controllerAs: 'ctrl',
    templateUrl: '/mainpartials/concepto',
    controller: function($rootScope, $scope, $mdDialog, $mdPanel, Concepto, alertas) {

        var self = this;
        $scope.bloqueado = false;

        class Concepto_{

            constructor(arg){
                this.id = arg.id,
                this.nombre = arg.nombre,
                this.descripcion = arg.descripcion,
                this.limite = arg.Limite
                this.bloqueo = false
            }

            bloquear(valor) {
                if(valor === undefined){
                alertas.mostrarToastEstandar("Agrega una cantidad porfavor");


                }else{
                    this.bloqueo = !this.bloqueo

                    self.conector({
                        $event: {
                            id: this.id,
                            nombre : this.nombre,
                            cantidad : valor,
                            limite: this.limite
                        }
                    });
                    alertas.mostrarToastEstandar("Elemento guardado correctamente");
                }
                

                

            };

        }

        Concepto.one(this.id)
        .then(res => self.concepto = new Concepto_(res.data))
        .then(res => console.log(self.concepto))
        .then(() => $scope.$digest())

        self.ver = (ev) =>
            $mdPanel.open({
                attachTo: angular.element(document.body),
                clickOutsideToClose: true,
                position: $mdPanel.newPanelPosition().relativeTo(ev.srcElement).addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW),
                targetEvent: ev,
                controllerAs: 'ctrl',
                controller: function($scope, mdPanelRef, Imagenconcepto) {

                    this.concepto = self.concepto


                    console.log(self)

                    Imagenconcepto.obtenerConConcepto(self.id)
                    .then(response => $scope.imagenes = response.data)
                    .then(() => console.log($scope.imagenes))
                    .then(() => $scope.$digest())

                },
                templateUrl: '/mainpartials/imagen',
            })

    }
})

app.component('slider', {
    bindings: {
        id: '='
    },
    controllerAs: 'ctrl',
    template: `
    <div class="slider-container">
        <div class="slider" id="{{ctrl.id}}">
            <imagen id="imagen" ng-repeat="imagen in ctrl.imagenes">
        </div>
    </div>`,
    controller: function($rootScope, $scope, $mdDialog, Template) {

        var self = this;

        Template.imagenes(this.id)
        .then(res => self.imagenes = res.data)
        .then(() => $scope.$digest())
        .then(() => {
            if(self.imagenes.length > 0){
                    $( '#' + this.id  ).slick({
                        dots: true,
                        infinite: true,
                        speed: 500,
                        fade: true,
                        cssEase: 'linear',
                        arrow: true
                    })
                }
        })

    }
})

app.component('imagen', {
    bindings: {
        id: '='
    },
    controllerAs: 'ctrl',
    template: `<img src="{{imagen.imagen}}">`,
    controller: function($rootScope, $scope, $mdDialog, Concepto, Imagen) {


        Imagen.one(this.id)
        .then(res => $scope.imagen = res.data)
        .then(response => $scope.$digest())



    }
})


app.component('proyecto', {
    bindings: {
        id: '=',
    },
    controllerAs: 'ctrl',
    templateUrl: '/mainpartials/proyecto',
    controller: function($rootScope, $scope, $mdDialog, $mdPanel, Imagen) {


        Imagen.obtenerUnaDeTemplate(this.id)
        .then(res => $scope.imagen =res.data)
        .then(res => $scope.$digest() )

    }



})

app.component('proyecto2', {
    bindings: {
        id: '=',
    },
    controllerAs: 'ctrl',
    templateUrl: '/mainpartials/proyecto2',
    controller: function($rootScope, $scope, $mdDialog, $mdPanel, Imagen) {


        Imagen.obtenerUnaDeTemplate(this.id)
        .then(res => $scope.imagen =res.data)
        .then(res => $scope.$digest() )

    }



})