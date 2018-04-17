// var app = angular.module('myapp', ['ngMaterial', 'ui.router', 'ngAnimate', 'ngStorage', 'oc.lazyLoad']);

var app = angular.module('myapp', [
    'ngMaterial',
    'ui.router',
    'ngAnimate',
    'oc.lazyLoad',
    'naif.base64',
    'md.data.table',
    'textAngular',
    'ngStorage',
    'material.components.expansionPanels',
    'uiGmapgoogle-maps',
    'ngCroppie'
]);

//TEMAS
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('amber').accentPalette('orange').warnPalette('red').backgroundPalette('grey');
});

app.run(function($rootScope, $transitions, $timeout) {
    $transitions.onStart({}, trans => {
        $rootScope.loading = true;
        $timeout.cancel()

    });

    $transitions.onSuccess({}, trans => {
        $rootScope.loading = false;
    });
})

app.service('mdDialog', function ($mdDialog) {

    this.mostrardialog = function (template, DialogController, tamanioPantalla, ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/partials/' + template,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: tamanioPantalla
        }).then(function (answer) {
            console.log(template);
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.personalizable = function (answer) {
            $mdDialog.hide(answer);
            //OCULTA Y HAZ ALGO
        };
    }
});

app.service('database', function ($http) {

    this.getAll = function (datatable, success) {
        $http.post('db/pop.php', {
            table: datatable
        }).success(success);
    };
});


app.service('alertas', [
    '$mdToast',
    function($mdToast) {
        this.mostrarToastEstandar = function(mensaje) {
            var last = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };

            var toastPosition = angular.extend({}, last);

            function getToastPosition() {
                sanitizePosition();

                return Object.keys(toastPosition).filter(function(pos) {
                    return toastPosition[pos];
                }).join(' ');
            };

            function sanitizePosition() {
                var current = toastPosition;

                if (current.bottom && last.top)
                    current.top = false;
                if (current.top && last.bottom)
                    current.bottom = false;
                if (current.right && last.left)
                    current.left = false;
                if (current.left && last.right)
                    current.right = false;

                last = angular.extend({}, current);
            }

            var pinTo = getToastPosition();

            $mdToast.show($mdToast.simple().textContent(mensaje).position(pinTo).theme('green').hideDelay(3000));
        }
    }
]);

app.directive('clPaging', function(){

        return {
                restrict: "EA",
                scope: {
                        clPages: "=",
                        clAlign: "@",
                        clAlignModel: "=",
                        clPageChanged: "&",
                        clSteps: "=",
                        clCurrentPage: "="
                },
                controller: function($scope){
            var vm = this;
            vm.first = "navigate_before",
            vm.last = "navigate_next",
            vm.index = 0,
            vm.clSteps = $scope.clSteps,
            vm["goto"] = function(index) {
                $scope.clCurrentPage = vm.page[index]
            },
            vm.gotoPrev = function() {
                $scope.clCurrentPage = vm.index,
                vm.index -= vm.clSteps
            },
            vm.gotoNext = function() {
                vm.index += vm.clSteps,
                $scope.clCurrentPage = vm.index + 1
            },
            vm.gotoFirst = function() {
                vm.index = 0,
                $scope.clCurrentPage = 1
            },
            vm.gotoLast = function() {
                vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps,
                vm.index === $scope.clPages
                    ? vm.index = vm.index - vm.clSteps
                    : "",
                $scope.clCurrentPage = $scope.clPages
            },
            $scope.$watch("clCurrentPage", function(value) {
                vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps,
                $scope.clPageChanged()
            }),
            $scope.$watch("clPages", function() {
                vm.init()
            }),

            vm.init = function() {
                vm.stepInfo = function() {
                    for (var result = [], i = 0; i < vm.clSteps; i++)
                        result.push(i);
                    return result
                }(),
                vm.page = function() {
                    for (var result = [], i = 1; i <= $scope.clPages; i++)
                        result.push(i);
                    return result
                }()
            }
        },
                controllerAs: "vm",
                templateUrl: '/partials/paginacion'
        }

});

app.config(['$provide', function ($provide) {
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
            taOptions.forceTextAngularSanitize = true;
            taOptions.keyMappings = [];
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'p', 'pre', 'quote'],
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['html', 'insertImage', 'insertLink']
            ];
            taOptions.classes = {
                focussed: '',
                toolbar: 'ta-toolbar',
                toolbarGroup: 'ta-button-group',
                toolbarButton: '',
                toolbarButtonActive: 'active',
                disabled: 'disabled',
                textEditor: 'ta-text-editor',
                htmlEditor: 'md-input'
            };
            return taOptions;
        }]);
        $provide.decorator('taTools', ['$delegate', function (taTools) {
            taTools.h1.display = '<md-button aria-label="Heading 1">H1</md-button>';
            taTools.h2.display = '<md-button aria-label="Heading 2">H2</md-button>';
            taTools.h3.display = '<md-button aria-label="Heading 3">H3</md-button>';
            taTools.p.display = '<md-button aria-label="Paragraph">P</md-button>';
            taTools.pre.display = '<md-button aria-label="Pre">pre</md-button>';
            taTools.quote.display = '<md-button class="md-icon-button" aria-label="Quote"><md-icon md-font-set="material-icons">format_quote</md-icon></md-button>';
            taTools.bold.display = '<md-button class="md-icon-button" aria-label="Bold"><md-icon md-font-set="material-icons">format_bold</md-icon></md-button>';
            taTools.italics.display = '<md-button class="md-icon-button" aria-label="Italic"><md-icon md-font-set="material-icons">format_italic</md-icon></md-button>';
            taTools.underline.display = '<md-button class="md-icon-button" aria-label="Underline"><md-icon md-font-set="material-icons">format_underlined</md-icon></md-button>';
            taTools.ul.display = '<md-button class="md-icon-button" aria-label="Buletted list"><md-icon md-font-set="material-icons">format_list_bulleted</md-icon></md-button>';
            taTools.ol.display = '<md-button class="md-icon-button" aria-label="Numbered list"><md-icon md-font-set="material-icons">format_list_numbered</md-icon></md-button>';
            taTools.undo.display = '<md-button class="md-icon-button" aria-label="Undo"><md-icon md-font-set="material-icons">undo</md-icon></md-button>';
            taTools.redo.display = '<md-button class="md-icon-button" aria-label="Redo"><md-icon md-font-set="material-icons">redo</md-icon></md-button>';
            taTools.justifyLeft.display = '<md-button class="md-icon-button" aria-label="Align left"><md-icon md-font-set="material-icons">format_align_left</md-icon></md-button>';
            taTools.justifyRight.display = '<md-button class="md-icon-button" aria-label="Align right"><md-icon md-font-set="material-icons">format_align_right</md-icon></md-button>';
            taTools.justifyCenter.display = '<md-button class="md-icon-button" aria-label="Align center"><md-icon md-font-set="material-icons">format_align_center</md-icon></md-button>';
            taTools.justifyFull.display = '<md-button class="md-icon-button" aria-label="Justify"><md-icon md-font-set="material-icons">format_align_justify</md-icon></md-button>';
            taTools.clear.display = '<md-button class="md-icon-button" aria-label="Clear formatting"><md-icon md-font-set="material-icons">format_clear</md-icon></md-button>';
            taTools.html.display = '<md-button class="md-icon-button" aria-label="Show HTML"><md-icon md-font-set="material-icons">code</md-icon></md-button>';
            taTools.insertLink.display = '<md-button class="md-icon-button" aria-label="Insert link"><md-icon md-font-set="material-icons">insert_link</md-icon></md-button>';
            taTools.insertImage.display = '<md-button class="md-icon-button" aria-label="Insert photo"><md-icon md-font-set="material-icons">insert_photo</md-icon></md-button>';
            return taTools;
        }]);
}]);


