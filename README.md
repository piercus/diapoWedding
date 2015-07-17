# diapo-wedding
Facebook-like image slideshow from digikam tags

# pre-requisitories

## digikam
To start with diapoWedding, you need to have 
* A digikam albums database (sqlite database)
* A digikam album

If you do not have a tagged album yet, you can download digikam from [digikam website](http://digikam.org)

Then you will need to tag it

## download diapoWedding

    
## Create 3 additional folders

This software has been built for a 1700 wedding-image collection, of 16.5 GB.
For obvious performance reasons, the photos must be re-processed, in 3 formats :
* thumbnails are used to create a one-image sprite
* Normalized image (basically 550 px width images) are used

### create a thumbnails folder

    mkdir ~/digikamThumbnails

### create a normalized-image folder

    mkdir ~/digikamNormalized

### create a full-image

    mkdir ~/digikamNormalized

### 

## configure the slideshow

    module.exports = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist',
        imgPath : '<root folder to digikam photos>',
        thumbnailPath : '<root folder for thumbnails>',
        thumbHeight : 100,
        spriteImg : '<spriteImg>',
        spriteCss: 'app/styles/sprites.css',
        digikamDbFile : '<digikam db file>'
    };

**TO FIX**

Build a facebook-like image slideshow using AngularJS and requireJS.

Images are coming from a digikam project.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## export digikam tags

Run

    grunt exportDigikam:<absolute path to digikam sqlite db file>

## Resizing images

    grunt sprite

## Testing

Running `grunt test` will run the unit tests.
