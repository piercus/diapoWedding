define(['models/Base'], function(B){
	'use strict';

	var Img = B.model("Img", {
		getTagInfos: function(){
			
			var imgId = this.id;

			return this.tagIds.map(function(tId){
				var tag = B.models.Tag.get(tId),
					imgTag = B.models.ImgTag.get(imgId+","+tId);
				
				return {
					tag : tag,
					imgTag : imgTag
				};
			});
		},
		getThumbnail : function(){
			return "https://angularjs.org/img/AngularJS-large.png";
		},
		getSrc: function(){
			return this.getThumbnail();
		}
	});

	return Img;
});