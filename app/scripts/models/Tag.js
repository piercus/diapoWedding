define(['models/Base'], function(B){
	'use strict';

	var Tag = B.model("Tag", {
		getImages: function(){
			return this.imageIds.map(function(tId){
				return B.models.Img.get(tId);
			}).compact();
		}
	});

	return Tag;
});