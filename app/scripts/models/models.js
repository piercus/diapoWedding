define(['angular', 'json!../../data/images.json', 'json!../../data/imagesTags.json', 'json!../../data/tags.json', 'models/Img', 'models/ImgTag', 'models/Tag'], 
	function(
		ng, 
		imagesJSON, 
		imgTagsJSON, 
		tagsJSON,
		Img,
		ImgTag,
		Tag){

	'use strict';

	var buildInstsFromJSON = function(JSON, Cstr){
		
		var obj, insts = [];

		for(var i in JSON) {
			if(JSON.hasOwnProperty(i)){
					
				obj = {
					id: i
				};

				for (var prop in JSON[i]) {
					if(JSON[i].hasOwnProperty(prop)){
						obj[prop] = JSON[i][prop];
					}
				}

				insts.push(new Cstr(obj));
			}

		}

		return insts;
	};

	var modelsModule = ng.module('models', []);

	modelsModule.factory('models', function(){
		return {
			images: buildInstsFromJSON(imagesJSON, Img),
			tags: buildInstsFromJSON(tagsJSON, Tag),
			imagesTags: buildInstsFromJSON(imgTagsJSON, ImgTag),
			Img: Img,
			Tag: Tag
		};
	});
});