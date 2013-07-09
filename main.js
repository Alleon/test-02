function bottomTabBar() {
	return 	{ view: 'toolbar', 
		elements: [
			{ view: 'tabbar', selected: 'tab_eleves', multiview : true,
				options: [
					{ id: 'tb1_eleve'	, label: 'Elèves'	, src: './imgs/grid.png'	, srcSelected: './imgs/grid.png'	, key: '1', value:'tab_eleves'	},
					{ id: 'tb1_planning', label: 'Planning'	, src: './imgs/planning.png', srcSelected: './imgs/planning.png', key: '2', value:'tab_fiche_eleve'},
					{ id: 'tb1_stage'	, label: 'Stage'	, src: './imgs/stages.png'	, srcSelected: './imgs/stages.png'	, key: '3', value:'tab_stages'	}
				], id: 'mainTabBar'
			}
		]
	};
}
function tbBackSearch() {
	return { view: 'toolbar', 
		elements: [
			{ view: 'button', label: 'Retour', type: 'prev'},
			{ view: 'input', label: '', popup: '', click: '', maxlength: '', disabled: false, placeholder: '', css: '', type: 'text'},
			{ view: 'button', label: 'Chercher', click:"connection();"}
		]
	};
}
function liste_eleves() {
	return { id:'tab_eleves', view: 'list', 
		url:"serverside/data/sample_list.json", datatype:"json",  type: { height: 22 },
		type:{
			height: 18, padding: 2,
			template:"<span style='color:#67B802; font-style:italic'><small> #value# </small></span> - <span style='color:#707070; font-weight:normal'> #option#</span>" 
		}
	};
}
function iniFlash() {
	var rows=[];
	rows.push({ view: 'label'		, label: 'Initialisation' });
	if (window.idsession && !windows.iduser) {
		rows.push({ view: 'label'		, label: 'Session initialisée, non connectée' });
		rows.push({ view: 'button'	, label: 'Connection', type:'next', click: 'connection()'});
	}
	rows.push( { view: 'label'		, label: 'Appareil: '+window.context });
	rows.push( { view: 'button'	, label: 'simulation', click: 'Entree()'});
	dhx.ready(dhx.ui({ id: 'app', view: 'layout', height: 482, width: 321, rows: rows }));
}
function main() {
	if ($$('app')) $$('app').destructor();
	window.context="WebBrowser ?";
	dhx.ajax('http://webservices.ecf-services.fr/sessions/init.php', function(text) {
		var data;
		alert(text);
		eval("data="+text);
		window.idsession=data.idsession;
		iniFlash();
	});
	document.addEventListener('deviceready', function() {
		alert('device ready !');
		window.context="smartApp";
		iniFlash();
	}, false);
	iniFlash();
}
function Entree() {
	if ($$('app')) $$('app').destructor();
	dhx.ui({ id: 'app', view: 'layout', height: 482, width: 321,
		rows: [
			{ view: 'layout', type: 'wide',
				rows: [
					tbBackSearch(),	
					{ view:"multiview",
						cells:[
							liste_eleves(),
							FicheEleveEtatCivil(),
							{ id:'tab_stages', view: 'dataview', template: '#Maintainer##Package# #Version#', select: 'single', scroll: 'y', type: { height: 35, width: 137, padding: 7, margin: 0},  datatype: 'json', url: 'serverside/data/sample_dataview.json' }
						]
					},
					bottomTabBar()
				]
			}
		]
	});
}
function FicheEleveEtatCivil() {
	return { view: 'form', id:'tab_fiche_eleve', scroll: true,
		elements: [
			{ view: 'text', label: 'Nom'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_7' , inputWidth: '100%', placeholder: 'Entrez le nom'},
			{ view: 'text', label: 'Prénom'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_8' , inputWidth: '100%', placeholder: 'Entrez le prénom'},
			{ view: 'text', label: 'Adresse'	, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_9' , inputWidth: '100%', placeholder: 'Entrez l adresse'},
			{ view: 'text', label: ''			, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_10', inputWidth: '100%', placeholder: '(suite adresse)'},
			{ view: 'text', label: 'CP'			, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_11', inputWidth: '100%', placeholder: 'Code postal'},
			{ view: 'text', label: 'Ville'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_12', inputWidth: '100%', placeholder: 'Entrez la ville'},
			{ view: 'datepicker', label: 'Né le', value: '2011-01-01', dateFormat: '%d/%m/%Y', calendarMonthHeader: '%F %Y', calendarDayHeader: '%d', calendarWeek: '%W', cellAutoHeight: true, id: 'control_datepicker_2', weekHeader: 1, navigation: 1, startOnMonday: 1},
			{ view: 'text', label: 'Né à'		, labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_13', inputWidth: '100%', placeholder: 'Ville de naissance'}
		]
	};
}
function connection() {
	if ($$('app')) $$('app').destructor();
	dhx.ui({ id: 'app', view: 'layout', height: 482, width: 322,
				rows: [
					{ view: 'label', label: 'Connection'},
					{ view: 'form', scroll: true,
						elements: [
							{ view: 'text', label: 'Dossier', labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_2', placeholder: '(dossier)', inputWidth: '320', labelWidth: '110'},
							{ view: 'text', label: 'Utilisateur', labelPosition: 'left', labelAlign: 'left', type: 'text', id: 'control_text_3', placeholder: '(code utilisateur)', inputWidth: '320', labelWidth: '110'},
							{ view: 'text', label: 'Mot de passe', labelPosition: 'left', labelAlign: 'left', type: 'password', id: 'control_text_4', inputWidth: '320', placeholder: '(mot de passe)', labelWidth: '110'}
						]
					},
					{ view: 'imagebutton', label: '<a href="?"><i>Mot de passe perdu/oublié</i></a>', src: './imgs/search.png'},
					{ view: 'toolbar', type: 'MainBar',
						elements: [					
							{ view: 'button', label: 'Annuler', type: 'prev'},
							{ view: 'button', label: 'Se connecter', type: 'next', click:"main()"}
						]
					}
				]
	}	);
}
