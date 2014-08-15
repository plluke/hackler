function generateRandomData() {
	var data = [];
	for (var i = 0; i < 10; i++) {
		var votes = Math.floor(Math.random() * 10);
		data.push({
			id : i,
			name: "Team " + i,
			members: ["luke@bluejeansnet.com", "alagu@bluejeansnet.com"]
		});
	}
	return data;
}

var teams = generateRandomData();

//test data:
window.user = {
	email: "luke@lukema.net"
};

var user = window.user;

function removeNumber(el) {
	$('.block', el).removeClass('selected');
}

function selectNumber(el, index) {
	var blocks = $('.block', el);
	for(var i = 0; i < index; i++) {
		$(blocks[i]).addClass('selected');
	}
}

function teamSelected(evt) {
	var team = $(evt.currentTarget);
	var selected = team.hasClass('selected');
	var numSelected = $('.block.selected', team).length;
	var atLimit = $('.block.selected').length == 3;
	if (atLimit) {
		if (numSelected == 3) {
			removeNumber(team);
			team.removeClass('selected');
		} else {
			window.alert('You can only cast 3 votes!');
		}
	} else {
		if (!selected) {
			team.addClass('selected');
			selectNumber(team, 1);
		} else if (numSelected > 0 && numSelected < 3) {
			removeNumber(team);
			selectNumber(team, ++numSelected);
		} else if (numSelected == 3) {
			removeNumber(team);
			team.removeClass('selected');
		}
	}
}

$(document).ready(function(){
	var container = $('.teamsContainer');
	_.each(_.sortBy(teams, 'name'), function(team){
		if (!_.contains(team.members, user.email)) {
			var teamDiv = $('<div/>', {
				class: 'team team' + team.id
			});
			var textDiv = $('<div/>', {
				class: 'text',
				text: team.name });
			teamDiv.append(textDiv);
			for (var i = 1; i < 4; i++) {
				var blockDiv = $('<div/>', { class: 'block'});
				teamDiv.append(blockDiv);
			}
			var removeBlock = $('<div/>', {
				class: 'removeBlock',
				text: 'X'
			});
			teamDiv.append(removeBlock);
			removeBlock.on('click tap', function(evt){
				evt.stopPropagation();
				removeNumber(teamDiv);
				teamDiv.removeClass('selected');
			});
			container.append(teamDiv);
		}
	});
	$('.team').on('click tap', teamSelected);
});