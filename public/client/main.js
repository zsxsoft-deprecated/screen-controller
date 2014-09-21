define(function(require, exports, module) {


	var $ = require('jquery'),
		program = require('screen/program'),
		dom = require('screen/dom'),
		socket = require('screen/socket');

	$(function() {
		window.$ = $;
	});


	// The following code is RUBBISH

	"use stricts";
	var IN_SCREEN = false;

	var queue = {"data": [], "callback": []}, queue_max = 0;
	var programs = null, program = null, program_id = -1;
	var audio_obj = null;

	var in_score_background_music = null, no_audio_default_bgm = null;



	$(function(){
		
		no_audio_default_bgm = '/multimedia/empty.mp3';
		
		$("#controlbutton-play").click(function(){send_request("audio", {"method": "play"})});
		$("#controlbutton-pause").click(function(){send_request("audio", {"method": "pause"})});
		$("#controlbutton-stop").click(function(){send_request("audio", {"method": "stop"})});
		$("#controlbutton-toggle-music-prev").click(function(){send_request("audio", {"method": "toggle", "plus": -1})});
		$("#controlbutton-toggle-music-next").click(function(){send_request("audio", {"method": "toggle", "plus":  1})});

		$("#controlbutton-toggle-background-prev").click(function(){send_request("screen", {"method": "toggle", "pageplus": -1})});
		$("#controlbutton-toggle-background-next").click(function(){send_request("screen", {"method": "toggle", "pageplus": 1})});
		$("#controlbutton-score").click(function(){send_request("screen", "score")});
		$("#controlbutton-background").click(function(){send_request("screen", "background")});
		$("#controlbutton-prev").click(function(){to_program(-1, true);});
		$("#controlbutton-next").click(function(){to_program(+1, true);});
		$("#controlbutton-init").click(function(){send_request("page", "init");socket.emit('global', {"need": "data"});to_program(0, true);});
		$("#controlbutton-postjavascript").click(function(){send_request("page", {"method": "run_javascript", "code": $("#text-javascript").val()})});
		$("#controlselect-changeprogram").change(function(){to_program($(this).val() - program_id, true)});
		$("#controlselect-changebgm").change(function(){send_request("audio", {"method": "toggle", "to": $(this).val()})});

		
		audio_obj = document.getElementById("dom-audio-test");
		audio_obj.autoplay = true;
		audio_obj.addEventListener("durationchange", function(e){
			$(".dom-playing-bgmcheck").html(audio_obj.duration);
		});
		
		socket = io.connect(location.origin);
		socket.on('error', function (err) {
			if (err && (err.code == 'ECONNREFUSED' || err.indexOf && err.indexOf('ECONNREFUSED') >= 0)) {
				var reconnecting = setTimeout(function () {
					socket.reconnect();
				}, 500); //assume a little threshold
				socket.on('connect', function () {
					clearTimeout(reconnecting);
					socket.removeListener('connect', arguments.callee);
				});
			}
		});
		socket.on('result', function(data){
			var id = data.data_id;
			if(id > 0 && queue.data[id]){
				console.log('Request ' + id + ' finished!');
				queue.callback[id]();
				delete queue.data[id];
				delete queue.callback[id];
			}
		});
		socket.on('whoami', function(){
			socket.emit('whoami', 'client');
			socket.emit('global', {"need": "data"});
		});
		socket.on('data', function(data){
			programs = data;
			program_id = 0;
			to_program(0, false);
			$("#controlselect-changeprogram").html(function(){
				var html = '';
				for(var i = 0; i < programs.length; i++)
				{
					html += '<option value="' + i + '">' + programs[i].program.name + '</option>';
				}
				return html;
			});
		});
		
		
		
	});

	var send_request = function(name, data, callback){
		if (typeof(data) == 'string') data = {'method': data};
		if (!data) data = {};
		if (typeof(callback) == "undefined") callback = function(){}
		
		queue_max++;
		queue.data[queue_max] = { name : name, data : data , id : queue_max };
		queue.callback[queue_max] = callback;
		console.log(queue.data[queue_max]);
		socket.emit(name, queue.data[queue_max]);
		
	}

	var to_program = function(add_number, to_client){
		
		if(program_id + add_number >= programs.length || program_id + add_number < 0)
		{
			alert("超出界限");
			return false;
		}
		
		var to_program_func = function(){
			program_id += add_number;
			program = programs[program_id];
			init_program();
			audio_obj.volume = 0;
			audio_obj.src = ((program.bgm != '') ? program.bgm: no_audio_default_bgm);
		};
		
		if (to_client)
			send_request('screen', {"method": "skipto", "id": (program_id + add_number)}, to_program_func);
		else
			to_program_func();
	}

	var init_program = function(){
		
		if (typeof(program.bgm) == "string") program.bgm = [program.bgm];
		if (program.bgm[0] == '' || program.bgm.length == 0) program.bgm[0] = no_audio_default_bgm;
		
		$(".dom-playing-id").text(program.id);
		$(".dom-playing-name").text(program.program.name);
		$(".dom-playing-player").text(program.player.name);
		$(".dom-autoplay").text((function(){
			if (program.display.length > 0)
			{
				return (program.display[0].time ? "√" + (program.display[0].repeat ? "(repeat)" : "") : "×");
			}
			else
			{
				return "×"
			}
		})());
		
		$("#controlselect-changebgm").html(function(){
			var html = '';
			console.log(program);
			for(var i = 0; i < program.bgm.length; i++)
			{
				html += '<option value="' + i + '">' + program.bgm[i] + '</option>';
			}
			return html;
		});
	}


});