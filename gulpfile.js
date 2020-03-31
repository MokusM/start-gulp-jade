var gulp = require("gulp"), // Подключаем Gulp
	sass = require("gulp-sass"), //Подключаем Sass пакет,
	browserSync = require("browser-sync"), // Подключаем Browser Sync
	rename = require("gulp-rename"), // Подключаем библиотеку для переименования файлов
	del = require("del"), // Подключаем библиотеку для удаления файлов и папок
	imagemin = require("gulp-imagemin"), // Подключаем библиотеку для работы с изображениями
	pngquant = require("imagemin-pngquant"), // Подключаем библиотеку для работы с png
	cache = require("gulp-cache"), // Подключаем библиотеку кеширования
	plumber = require("gulp-plumber"), // Чтоб при ошибке не падал сервер
	autoprefixer = require("gulp-autoprefixer"), // Подключаем библиотеку для автоматического добавления префиксов
	pug = require("gulp-pug"), // Компилятор pug
	sourcemaps = require("gulp-sourcemaps"); //Что б в режиме разработчика показывало норм стили

gulp.task("sass", function() {
	// Создаем таск Sass
	return gulp
		.src("app/scss/**/*.scss") // Берем источник
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({ outputStyle: "compact" }).on("error", sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(["last 10 versions", "> 1%", "ie 9", "ie 10"], { cascade: true })) // Создаем префиксы
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("app/css")) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

gulp.task("pug", function() {
	gulp.src("app/pug/*.+(jade|pug)")
		.pipe(pug({ pretty: "\t" }))
		.on("error", function(err) {
			console.log(err); // Would like to catch the error here
		})
		.pipe(gulp.dest("app/"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function() {
	// Создаем таск browser-sync
	browserSync({
		// Выполняем browserSync
		server: {
			// Определяем параметры сервера
			baseDir: "app" // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
gulp.task("watch", ["browser-sync", "pug"], function() {
	gulp.watch("app/scss/**/*.scss", ["sass"]); // Наблюдение за sass файлами в папке sass
	gulp.watch("app/*.html", browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch("app/pug/**/*.pug", ["pug"]); // Наблюдение за pug файлами в корне проекта
	gulp.watch("app/js/**/*.js", browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task("clean", function() {
	return del.sync("dist"); // Удаляем папку dist перед сборкой
});

gulp.task("img", function() {
	return gulp
		.src("app/img/**/*") // Берем все изображения из app
		.pipe(
			cache(
				imagemin({
					// Сжимаем их с наилучшими настройками с учетом кеширования
					interlaced: true,
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					use: [pngquant()]
				})
			)
		)
		.pipe(gulp.dest("dist/img")); // Выгружаем на продакшен
});

gulp.task("build", ["clean", "img", "sass", "pug"], function() {
	var buildCss = gulp
		.src([
			// Переносим библиотеки в продакшен
			"app/css/style.css"
		])
		.pipe(gulp.dest("dist/css"));

	var buildFonts = gulp
		.src("app/scss/**/*") // Переносим scss в продакшен
		.pipe(gulp.dest("dist/scss"));

	var buildFonts = gulp
		.src("app/fonts/**/*") // Переносим шрифты в продакшен
		.pipe(gulp.dest("dist/fonts"));

	var buildJs = gulp
		.src("app/js/**/*") // Переносим скрипты в продакшен
		.pipe(gulp.dest("dist/js"));

	var buildHtml = gulp
		.src("app/*.html") // Переносим HTML в продакшен
		.pipe(gulp.dest("dist"));
});

gulp.task("clear", function(callback) {
	return cache.clearAll();
});

gulp.task("default", ["watch"]);
