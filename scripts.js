let fire, ceo, walls;
let companies_table, countries_table;
let heads = [];
let headscale = [];

function preload() {
	companies_table = loadTable("companies_data.csv", "csv", "header");
	countries_table = loadTable("countries_data.csv", "csv", "header");
	//load ceo heads
	heads[0] = loadImage("assets/chevron.png");
	heads[1] = loadImage("assets/exxonmobil.png");
	heads[2] = loadImage("assets/bp.png");
	heads[3] = loadImage("assets/shell.png");
	heads[4] = loadImage("assets/conocophillips.png");
	heads[5] = loadImage("assets/peabody.png");
	heads[6] = loadImage("assets/totalenergies.png");
	heads[7] = loadImage("assets/occidental.png");
	heads[8] = loadImage("assets/bhp.png");
	heads[9] = loadImage("assets/consol.png");
}

function setup() {
	var canvas = createCanvas(innerWidth, innerHeight);
	canvas.parent("home-canvas");
	world.gravity.y = 10;

	//SELECTS

	//COMPANY
	const company = createSelect().id("company");
	company.position(innerWidth * 0.25 - 250, innerHeight * 0.75);
	company.style("border-radius", "5px");
	company.style("width", "200px");
	company.style("height", "40px");
	company.style("font-family", "Barlow Condensed, Arial, sans-serf");
	company.style("font-size", "16pt");
	company.style("padding", "5px");

	// populate options
	for (i = 0; i < companies_table.getRowCount(); i++) {
		let text = companies_table.getString(i, "company_name");
		company.option(text, i); //assigns each option a numerical value that can be used later
	}

	//COUNTRY
	const country = createSelect().id("country");
	country.position(innerWidth * 0.25 + 50, innerHeight * 0.75);
	country.style("border-radius", "5px");
	country.style("width", "200px");
	country.style("height", "40px");
	country.style("font-family", "Barlow Condensed, Arial, sans-serf");
	country.style("font-size", "16pt");
	country.style("padding", "5px");
	// populate options

	for (i = 0; i < countries_table.getRowCount(); i++) {
		let text = countries_table.getString(i, "country");
		country.option(text, i); //assigns each option a numerical value that can be used later
	}

	//SPRITES

	// fire
	// fire animation by https://twitter.com/brullov_art.
	fire = new Sprite();
	fire.layer = 2;
	fire.width = innerWidth / 2;
	fire.height = 50;
	fire.x = innerWidth - fire.width / 2;
	fire.y = innerHeight - fire.height / 2;
	fire.addAni(loadAni("assets/fire/000.png", 7));

	fire.collider = "static";
	fire.bounciness = 0.8;

	// ceo faces
	ceo = new Sprite();
	ceo.layer = 1;
	ceo.diameter = 125;
	ceo.x = innerWidth * 0.75;
	ceo.y = 100;

	// wall to keep sprites bounded
	walls = new Sprite([
		[innerWidth / 2, innerHeight],
		[innerWidth / 2, 0],
		[innerWidth, 0],
		[innerWidth, innerHeight],
	]);
	walls.collider = "static";
	walls.color = "rgba(0, 0, 0, 0)"; // make walls invisible
}

function draw() {
	clear();

	//ability to throw faces around
	if (mouse.dragging()) {
		ceo.moveTowards(mouse);
	}

	//text updates

	let countrytext = select("#countrytext");
	countrytext.html(countries_table.getString(country.value, "country"));
	let temptext = select("#temptext");
	temptext.html(countries_table.getString(country.value, "temp") + "°C");
	let difftext = select("#difftext");
	difftext.html(countries_table.getString(country.value, "diff") + "°C higher");
	let companytext = select("#companytext");
	companytext.html(companies_table.getString(company.value, "company_name"));
	let profittext = select("#profittext");
	profittext.html(companies_table.getString(company.value, "profit"));
	let ceotext = select("#ceotext");
	ceotext.html(
		"Turn up the heat on " +
			companies_table.getString(company.value, "ceo_name") +
			"!"
	);

	//image updates
	ceo.image = heads[company.value];
	ceo.image.scale = 0.8;

	//fire scaling
	let fireoffset = map(
		countries_table.getNum(country.value, "temp"),
		33,
		54,
		100,
		-85
	);
	fire.ani.offset.y = fireoffset;
}

function windowResized() {
	resizeCanvas(innerWidth, innerHeight);
	clear();
}
