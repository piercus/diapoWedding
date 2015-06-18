define(['models/Base', 'helpers/array/compact'], function(B){
	'use strict';

	var Img = B.model("Img", {
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
		getSrc: function(){
			return "http://localhost/"+this.src;
		}
	});

	return Img;
});