var str = '';

var storage = {
	
	return : function(storageName){
		return localStorage[storageName];
	},
	
	change : function(storageName, value){
		localStorage[storageName] = value;
	}
}

$('.save').click(function(){
	var name = $("input[name='name']").val();
	var password = $("input[name='password']").val()
	name ?  storage.change('name', name) : false;
	password ?  storage.change('password', password) : false;
	window.close();
});

$("input[name='name']").attr('value', storage.return('name') || 'name');
$("input[name='password']").attr('value', storage.return('password') || 'password');
