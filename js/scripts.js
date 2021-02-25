$(function(){
	
var att = [Math.floor(Math.random() * 18) + 16, Math.floor(Math.random() * 18) + 18, Math.floor(Math.random() * 18) + 6, Math.floor(Math.random() * 18) + 14, Math.floor(Math.random() * 18) + 10];
var def = [Math.floor(Math.random() * 18) + 4, Math.floor(Math.random() * 18) + 8, Math.floor(Math.random() * 18) + 12, Math.floor(Math.random() * 18) + 18, Math.floor(Math.random() * 18) + 10];
var mag = [Math.floor(Math.random() * 18) + 16, Math.floor(Math.random() * 18) + 10, Math.floor(Math.random() * 18) + 18, Math.floor(Math.random() * 18) + 4, Math.floor(Math.random() * 18) + 16];
var typeA = ['Nouvelle vidéo', 'Article', 'Thread', 'Conseil', 'Etude publiée'];
var typeF = ['Etude mal lue et partagée', 'Dossier', 'Vidéo Youtube', 'Vaccin', 'Meta-analyse'];
var typeS = ['Repos', 'Repos', 'Repos', 'Repos', 'Repos'];
var typeP = ['Victimisation', 'Recherches', 'Recherches', 'Recherches', 'Recherches'];
var hpmax = [Math.floor(Math.random() * 5000) + 5000, Math.floor(Math.random() * 200) + 800, Math.floor(Math.random() * 200) + 400, Math.floor(Math.random() * 200) + 1000, Math.floor(Math.random() * 200) + 600];
var hp = hpmax;

var journaliste = prompt('Nommer votre journaliste'), vulgarisateur = prompt('Nommer votre vulgarisateur'), medecin = prompt('Nommer votre médecin'), scientifique = prompt('Nommer votre scientifique'), i, degH, degM, tank, turn = 0;

$('#journaliste').text(journaliste);
$('#vulgarisateur').text(vulgarisateur);
$('#medecin').text(medecin);
$('#scientifique').text(scientifique);

for(i = 1; i < 5; i++)
{
$('#hpmax' + i).text('/ ' + hpmax[i]);
}

stats();

$('#choixA').on({
    mouseover: function(){
		$(this).prepend('> ');
    },
    mouseout: function(){
		$(this).text(typeA[turn]);
    },
    click: function(){
		attaque();
    },
});

$('#choixF').on({
    mouseover: function(){
		$(this).prepend('> ');
    },
    mouseout: function(){
		$(this).text(typeF[turn]);
    },
    click: function(){
		magie();
    },
});

$('#choixS').on({
    mouseover: function(){
		$(this).prepend('> ');
    },
    mouseout: function(){
		$(this).text(typeS[turn]);
    },
    click: function(){
		soin();
    },
});

$('#choixP').on({
    mouseover: function(){
		$(this).prepend('> ');
    },
    mouseout: function(){
		$(this).text(typeP[turn]);
    },
    click: function(){
		protection();
    },
});

function stats()
{
	
	for(i = 1; i < 5; i++)
	{
	$('#hp' + i).text(hp[i]);
	$('#att' + i).text(att[i]);
	$('#def' + i).text(def[i]);
	$('#mag' + i).text(mag[i]);
	}
	
	if (hp[1] <= 0 && hp[2] <= 0 && hp[3] <= 0 && hp[4] <= 0)
	{
		mortH();
	}
	
	if (hp[0] <= 0)
	{
		mortM();
	}
	
	do
	{
		turn < 5 ? turn++ : turn = 1;
	}while (hp[turn] <= 0);

	turn == 1 ? $('#journaliste').prepend('> ') : $('#journaliste').text(journaliste);
	turn == 2 ? $('#vulgarisateur').prepend('> ') : $('#vulgarisateur').text(vulgarisateur);
	turn == 3 ? $('#medecin').prepend('> ') : $('#medecin').text(medecin);
	turn == 4 ? $('#scientifique').prepend('> ') : $('#scientifique').text(scientifique);
	
	if (turn == 5)
	{
		monster();
	}
	else
	{
		$('#choixA').text(typeA[turn]);
		$('#choixF').text(typeF[turn]);
		$('#choixS').text(typeS[turn]);
		$('#choixP').text(typeP[turn]);
	}
	
}

function attaque()
{
	degH = Math.floor(Math.random() * att[turn]) * 50 - def[0];
	if (degH < 0)
	{
		degH = 0;
	}
	
	$('#degH').html('<div class="degH">' + degH + '</div>');
	hp[0] -= degH;
	
	stats();
}

function magie()
{
	degH = Math.floor(Math.random() * mag[turn]) * 45;
	if (degH < 0)
	{
		degH = 0;
	}
	
	$('#degH').html('<div class="degH">' + degH + '</div>');
	hp[0] -= degH;
	
	stats();
}

function soin()
{
	hp[turn] += Math.floor(Math.random() * mag[turn]) * 10;
	if (hp[turn] > hpmax[turn])
	{
		hp[turn] = hpmax[turn];
	}
	
	stats();
}

function protection()
{
	att[turn] += Math.floor((Math.random() * mag[turn]) / 2);
	def[turn] += Math.floor((Math.random() * mag[turn]) / 2);
	
	stats();
}

function monster()
{	
	do
	{
		tank = Math.floor(Math.random() * 4) + 1;
	}while (hp[tank] <= 0);
	
	degM = Math.floor(Math.random() * att[0]) * 40 - def[tank];
	if (degM < 0)
	{
		degM = 0;
	}
	
	hp[tank] -= degM;
	if (hp[tank] <= 0)
	{
		hp[tank] = 0;
		$('#warrior' + tank).attr('src', 'images/tombstone.png');
		$('#ST' + tank).html('');
	}
	
	$('#deg' + tank).html('<div class="deg' + tank + '">' + degM + '</div>');
	
	$('#log').text('Silvano partage une étude mal lue et inflige ' + degM + ' dégâts.');
	
	stats();
}

function mortH()
{
	alert('Tous vos héros sont morts !');
	location.reload();
}

function mortM()
{
	alert('Silvano est vaincu !')
	location.reload();
}

});