'use strict';

module.export = function(grunt){

  grunt.registerTask('export_digikam', 'export the digikam photo data', function(){

    grunt.config.requires('export_digikam.folder');
    grunt.config.requires('export_digikam.dbFile');

    var options = this.options();

    var dbFile = options.dbFile;

    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
    } else {
      grunt.log.writeln(this.name + ", " + dbFile);

      var done = this.async();

      var folder= options.folder;

      var sqlite3 = require('sqlite3').verbose();
      console.log(dbFile);
      var db = new sqlite3.Database(dbFile);
      var fs = require("fs");

      var writeStreamTags = fs.createWriteStream(folder+"/tags.json",{ 
        flags: 'w',
        encoding: "utf8"
      });

      var writeStreamImgs = fs.createWriteStream(folder+"/images.json",{ 
        flags: 'w',
        encoding: "utf8"
      });

      var writeStreamImgTags = fs.createWriteStream(folder+"/imagesTags.json",{ 
        flags: 'w',
        encoding: "utf8"
      });

      console.log("here");
      var listTag = [], listImg = [], listImgTags = [];

      var nAsync = 3;

      var closeStream = function(){
        if(nAsync === 0){
          db.close();
          done();
        }
      };

      db.serialize(function() {
        writeStreamTags.write("{\n");
        db.each("SELECT t.id, t.name, t.pid, GROUP_CONCAT(img.imageid) AS imageIds FROM Tags t JOIN ImageTags img ON t.id = img.tagid GROUP BY t.id;", function(err, row) {
            listTag.push('  "'+row.id + '": { "name": "'+row.name+'", "pid": '+row.pid+', "imageIds": ['+row.imageIds+']}');
        }, function(){
          writeStreamTags.write(listTag.join(",\n")+'\n}');
          writeStreamTags.close();  
          nAsync--;
          closeStream();
        });

        writeStreamImgs.write("{\n");
        db.each("SELECT i.id, a.relativePath||'/'||i.name AS src , GROUP_CONCAT(it.tagid) AS tagIds, info.width, info.height FROM ImageInformation info, Images i,Albums a, ImageTags it WHERE a.id = i.album AND it.imageid = i.id AND info.imageid = i.id GROUP BY i.id", function(err, row) {
            listImg.push('  "'+row.id + '": { "src": "'+row.src+'", "width": "'+row.width+'", "height": "'+row.height+'", "tagIds": ['+row.tagIds+']}');
        }, function(){
          writeStreamImgs.write(listImg.join(",\n")+'\n}');
          writeStreamImgs.close();  
          nAsync--;
          closeStream();
        });


        writeStreamImgTags.write("{\n");
        db.each(
          //SELECT idSELECT tagid, imageid, property, count(*) FROM ImageTagProperties GROUP BY tagid, imageid, property
          //SELECT * FROM (SELECT tagid, imageid, property, count(*) as cnt FROM ImageTagProperties GROUP BY tagid, imageid, property) as test where test.cnt > 1
        'SELECT * FROM ImageTagProperties', function(err, row) {
            var x = row.value.match(/x=\"([^\"]*)\"/)[1],
                y = row.value.match(/y=\"([^\"]*)\"/)[1],
                height = row.value.match(/height=\"([^\"]*)\"/)[1],
                width = row.value.match(/width=\"([^\"]*)\"/)[1];

            listImgTags.push('  "'+row.imageid+","+row.tagid + '": { "rect": { "top": '+y+', "left": '+x+', "width": '+width+', "height": '+height+'}}');
        }, function(){
          writeStreamImgTags.write(listImgTags.join(",\n")+'\n}');
          writeStreamImgTags.close();  
          nAsync--;
          closeStream();
        });

      });



    }
  });

};
