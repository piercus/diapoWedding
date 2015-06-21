define(['models/Base', 'helpers/Array/compact'], function(B){
	'use strict';

	var Img = B.model("Img", {
		"+init": function(){
			this.spriteClass = this.getSpriteClass();
		},
		getTagInfos: function(){
			
			var imgId = this.id, imgH = this.h, imgW = this.width;

			return this.tagIds.map(function(tId){
				var tag = B.models.Tag.get(tId),
					imgTag = B.models.ImgTag.get(imgId+","+tId);

				if(imgTag) {
					return {
						tag : tag,
						imgTag : imgTag
					};
				} else {
					return null;
				}
				

			}).compact();
		},
		getThumbnail : function(){
			return this.getSrc();
		},
		getSpriteClass: function(){
			var pathArray = this.src.split("/");
			var name = pathArray[pathArray.length - 1].split(".")[0];
			var nameWithoutSpaces = name.replace(/ /g,"_");
			var nameWithoutAll = nameWithoutSpaces.replace("&","et");
			return ("icon-"+nameWithoutAll);
		},
		getSrc: function(){
			return "http://localhost/"+this.src;
		}
	});

	return Img;
});