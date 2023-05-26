const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: { baseDir: "app/" }
	})
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions'],
			grid: true,
		}))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(dest("app/css/"))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.min.js',
		'app/js/main.js',
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())
}


function build() {
	return src([
		'app/**/*.html',
		'app/css/style.min.css',
		'app/js/main.min.js',
	], { base: 'app' })
		.pipe(dest('dist/'))
}
function cleanDist() {
	return del('dist')
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}



function images() {
	return src('app/images/**/*.*')
		.pipe(imageMin([
			imageMin.gifsicle({ interlaced: true }),
			imageMin.mozjpeg({ quality: 75, progressive: true }),
			imageMin.optipng({ optimizationLevel: 5 }),
			imageMin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/images/'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist,images,build);

exports.default = parallel(styles, scripts, browsersync, watching);