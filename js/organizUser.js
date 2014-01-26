function dataOrg(callback) {

    

    $.ajax({

        'global': false,
        'url': "data/orgs.json",
        'dataType': "json",
        'success': function (data) {
            callback(data);
        }
    });
    return;
}

function dataUser(callback) {


    var json = null;

    $.ajax({

        'global': false,
        'url': "data/users.json",
        'dataType': "json",
        'success': function (data) {
            callback(data);
        }
    });
    return;
}


var MasterViewModel = function () {

        var self = this;

        self.Name = ko.observable("");
        self.id = ko.observable("");

        self.email = "";
        self.orgId = "";

        self.organizations = null;
        self.users = null; 


        self.filtUser = ko.observableArray([]);

        self.addOrg = function () {

            self.organizations.push({
                id: self.id,
                name: self.Name,

            });
        };

        self.removeOrg = function (contact) {
            self.organizations.remove(contact);
            console.log(self.organizations());
        };

        self.editOrg = function (contact) {
            self.Name = "";
            self.id = "";            
        };

        self.filter = function (contact) {
           
            var unmapOrg = ko.mapping.toJS(self.organizations);
            var unmapUser = ko.mapping.toJS(self.users);

            self.filtUser.removeAll();

            var index = self.organizations.indexOf(contact);

            for (var i = 0; i < unmapUser.length; i++) {

                if (unmapOrg[index].id == unmapUser[i].orgid) {
                    console.log(unmapUser[i].orgid);

                    self.filtUser.push(self.users()[i]);
                }
            };
        }

        self.removeUser = function (user) {
            self.filtUser.remove(user);
            self.users.remove(user);
        };

        self.addUser = function () {
            var unmapFilter = ko.mapping.toJS(self.filtUser);

            self.users.push({
                orgid: parseInt(self.orgId),
                email: self.email,
            });

            if (unmapFilter.length > 0) {
                if (unmapFilter[0].orgid == parseInt(self.orgId)) {
                    self.filtUser.push({
                        orgid: parseInt(self.orgId),
                        email: self.email,
                    });
                }
            };
        };
    };


var masterView = new MasterViewModel();

function createMasterViewOrg(data) {
    masterView.organizations = ko.mapping.fromJS(data);
    handlerBindings();
}

function createMasterViewUser(data) {
    masterView.users = ko.mapping.fromJS(data);
    handlerBindings();
}
dataUser(createMasterViewUser);
dataOrg(createMasterViewOrg);



function handlerBindings() {
    if (masterView.organizations && masterView.users) {
        ko.applyBindings(masterView);
    }
}