var gulp = require('gulp'),  
	sass = require('gulp-sass'),  
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),  // linking files to one output file
	uglify = require('gulp-uglify'),  //  miniming js file
	gulpIf = require('gulp-if'),		// checking type of file
	cssnano = require('gulp-cssnano'),   // minifing css file
	runSequence = require('run-sequence'),
	del = require('del'),                   //cleaning folder
	sourcemaps = require('gulp-sourcemaps'),   //building fource map form *.scss for chrom dev-tools
	babel = require('gulp-babel');  // translating from es6 to older

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
	.pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
	.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function()
{
	browserSync.init({server: {baseDir: 'app'}});
});

gulp.task('watch', ['browserSync', 'sass'],function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/partials/*.html', browserSync.reload);
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', 
				babel({presets: ['es2015'], compact: true})))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function()
{
	return del.sync('dist');
});

gulp.task('copyImg', function()
{
	gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copyPartials', function()
{
	 gulp.src('app/partials/**/*.html')
		 .pipe(gulp.dest('dist/partials'));
});

gulp.task('copyJquery', function()
{
	gulp.src('app/js/jquery*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', function(callback)
{
	runSequence('clean:dist', 'sass', 'useref', ['copyImg','copyPartials', 'copyJquery']);
});

