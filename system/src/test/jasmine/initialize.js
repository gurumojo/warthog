define([

	'../test/jasmine/Example',
	'../test/jasmine/Cache',
	'../test/jasmine/Organism',
	'../test/jasmine/Mammal',
	'../test/jasmine/Horse',
	'../test/jasmine/Appaloosa',
	'../test/jasmine/Clydesdale',
	'../test/jasmine/Human',
	'../test/jasmine/Wrangler',
	'../test/jasmine/Corral',
	'../test/jasmine/Pasture'

], function(

	Example,
	Cache,
	Organism,
	Mammal,
	Horse,
	Appaloosa,
	Clydesdale,
	Human,
	Wrangler,
	Corral,
	Pasture

){

	// run tests
	Example.run();
	Cache.run();
	Organism.run();
	Mammal.run();
	Human.run();
	Wrangler.run();
	Horse.run();
	Appaloosa.run();
	Clydesdale.run();
	Corral.run();
	Pasture.run();

});
