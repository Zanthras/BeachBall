//Declare and Initialize Variables
var BeachBall = {};
BeachBall.incoming_ONG = 0;
BeachBall.NinjaAutoClickStatus = 1;
BeachBall.Time_to_ONG = 1800000;
BeachBall.lootBoxes = ['boosts', 'ninj', 'cyb', 'hpt', 'bean', 'chron', 'badges', 'badgesav'];

//Version Information
BeachBall.version = '3.0 Beta';
BeachBall.SCBversion = '3.13'; //Last SandCastle Builder version tested

//BB Options Variables
BeachBall.AudioAlertsStatus = 3;
BeachBall.audio_Bell = new Audio("http://xenko.comxa.com/Ship_Bell.mp3");
	BeachBall.audio_Bell.volume = 1;
BeachBall.audio_Chime = new Audio("http://xenko.comxa.com/Chime.mp3");
	BeachBall.audio_Chime.volume = 1;
BeachBall.BorderAlertStatus = 1;
BeachBall.description = "Error";
BeachBall.refreshRate = 1000;
BeachBall.RKAlertFrequency = 8;
BeachBall.RKAutoClickStatus = 1;
BeachBall.RKPlayAudio = 1;

//RK Variables
BeachBall.start = -1;
BeachBall.content = "empty";
BeachBall.LCAutoClickStatus = 0;
BeachBall.LCSolution = 'blank';
BeachBall.len = 0;
BeachBall.Logicat = 0;
BeachBall.oldRKLocation = -1;
BeachBall.oldRC = Molpy.redactedClicks - 1;
BeachBall.oldLC = Molpy.Boosts['Logicat'].power - 1;
BeachBall.RKLevel = '-1';
BeachBall.RKLocation = '123';
BeachBall.RKNew = 1;
BeachBall.RKNewAudio = 1;
BeachBall.RKTimer = Molpy.redactedToggle - Molpy.redactedCountup;

BeachBall.ClickBeach = function() {
	if (Molpy.Got('Temporal Rift') && Molpy.Boosts['Temporal Rift'].countdown < 5){
		//Do Nothing to avoid temporal rift
	}
	else {
		Molpy.ClickBeach();
	}	
}

BeachBall.Ninja = function() {
    if (Molpy.ninjad == 0) {
        if (Molpy.npbONG == 0 && BeachBall.BorderAlertStatus == 1) {
			$("#beach").css("border","4px solid red");
        }
        else {
            BeachBall.incoming_ONG = 0;
            if (BeachBall.NinjaAutoClickStatus == 1) {
				BeachBall.ClickBeach();
				Molpy.Notify('Ninja Auto Click', 1);
				if (BeachBall.BorderAlertStatus == 1) {
					$("#beach").css("border","2px solid green");
				}
            }
            else if (BeachBall.BorderAlertStatus == 1) {
            $("#beach").css("border","4px solid blue");
            }

        }
	}
    else if (BeachBall.Time_to_ONG <= 15000) {
		if (BeachBall.BorderAlertStatus == 1) {
			$("#beach").css("border","4px solid yellow");
		}
        if (BeachBall.incoming_ONG == 0 && (BeachBall.AudioAlertsStatus == 3 || BeachBall.AudioAlertsStatus == 4)) {
			BeachBall.audio_Chime.play();
			BeachBall.incoming_ONG = 1;
        }  
    }
    else if (BeachBall.BorderAlertStatus == 1) {
		Molpy.Notify('Border to Green', 1);
        $("#beach").css("border","2px solid green");
	}
}

BeachBall.ToggleMenus = function(wantOpen) {
	//for (var i in BeachBall.lootBoxes) {
	//var me = BeachBall.lootBoxes[i];
	for (i=0, len = BeachBall.lootBoxes.length; i < len; i++) {
		if (BeachBall.lootBoxes[i] == wantOpen) {
			if (Molpy.options.showhide[BeachBall.lootBoxes[i]] != 1) {
				showhideToggle(BeachBall.lootBoxes[i]);
			}
		}
		else {
			if (Molpy.options.showhide[BeachBall.lootBoxes[i]]) {
				showhideToggle(BeachBall.lootBoxes[i]);
			}
		}
	}
}
	
BeachBall.FindRK = function() {
	/*
	RV of 1 is Sand Tools
	RV of 2 is Castle Tools
	RV of 3 is Boosts Main Page
	RV of 4 is Boosts Menus, Hill People Tech, etc.
	RV of 5 is Badges Earned
	RV of 6 is Badges Available
	*/
	
	//Determines RK location
	BeachBall.RKLocation = '123';
	if (Molpy.redactedVisible == 6) {
		BeachBall.RKLocation = 'badgesav';
	}
	else if (Molpy.redactedVisible > 3) {
		BeachBall.RKLocation = Molpy.redactedGr;
	}
	
	//Opens RK location
	BeachBall.ToggleMenus(BeachBall.RKLocation);
	
	//Resets old RK variables
	BeachBall.oldRKLocation = Molpy.redactedVisible;
	BeachBall.oldRC = Molpy.redactedClicks;
	BeachBall.oldLC = Molpy.Boosts['Logicat'].power;
}

BeachBall.ManualRKClick = function() {

}

BeachBall.RedundaKitty = function() {
	var content = '';
	//Refresh Timer Variable
	BeachBall.RKTimer = Molpy.redactedToggle - Molpy.redactedCountup;
	
	//If a RedundaKitty is active
	if (Molpy.redactedVisible > 0) {
	
		//Checks if RK is new
		if (BeachBall.RKNew == 1 || Molpy.redactedVisible != BeachBall.oldRKLocation || Molpy.redactedClicks > BeachBall.oldRC || Molpy.Boosts['Logicat'].power != BeachBall.oldLC) {
			BeachBall.RKNewAudio = 1;
			BeachBall.RKNew = 0;
			//Finds RK if appropriate BeachBall option enabled
			if (BeachBall.RKAutoClickStatus > 0) {	
				BeachBall.FindRK();
			}
		}
		
		//Determines if it is an RK or LC
		//If RK is visible
		if ($('#redacteditem').length) {
			$('#redacteditem').css("border","2px solid red"); //Highlights RK
			content = $('#redacteditem').html();
			//If RK contains word statement, it is a LC.
			if (content.indexOf("statement") !== -1) {
				BeachBall.Logicat = 1;
			}
			//Otherwise it is an RK
			else {
				BeachBall.Logicat = 0;
				if (content.indexOf("Show") != -1) {
					start = content.indexOf("Show");
					content = content.substring(start+15,start+38);
					content = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
					len = content.length;
					BeachBall.RKLevel = content.substring(18,len);
					//Molpy.Notify('RedundaKitty Level is: ' + RKLevel, 1);
				}
				else {
					start = content.indexOf("iframe src=");
					content = content.substring(start-40,start-16);
					content = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
					len = content.length;
					BeachBall.RKLevel = content.substring(18,len);
					//Molpy.Notify('YT RedundaKitty Level is: ' + RKLevel, 1);
				}
			}
		}
		//If RK not visible, LC to 99.
		else {
			BeachBall.Logicat = 99;
		}

		//Clicks RK if AutoClick Enabled
		if (BeachBall.RKAutoClickStatus == 2 && BeachBall.Logicat == 0 ) {
			Molpy.ClickRedacted(RKLevel);
			BeachBall.RKNew = 1;
			BeachBall.RKLocation = '123';
			BeachBall.ToggleMenus('123');
		}
		//Solves LC if AutoClick enabled
		else if (BeachBall.Logicat == 1 && BeachBall.LCAutoClickStatus == 1) {
			BeachBall.SolveLogicat();
			BeachBall.RKNew = 1;
			BeachBall.RKLocation = '123';
			BeachBall.ToggleMenus('123');
		}

		//Redundakitty Notifications for Manual Clicking (Title Bar, Audio)
		else {	
			document.title = "! kitten !";
			//If RK Audio Alerts Enabled
			if (BeachBall.AudioAlertsStatus == 1 || BeachBall.AudioAlertsStatus == 3) {
				//If proper mNP and hasn't yet played this mNP
				if (Math.floor(BeachBall.RKTimer % BeachBall.RKAlertFrequency) == 0 && BeachBall.RKPlayAudio == 1) {
					BeachBall.audio_Bell.play();
					BeachBall.RKPlayAudio = 0;
				}
				else {
					BeachBall.RKPlayAudio = 1;
				}
			}
		}
	}	
	//If no RK active, update title Timer. Reset some variables.
	else {
		document.title = BeachBall.RKTimer;
		BeachBall.oldRKLocation = -1;
		BeachBall.RKNew = 1;
		BeachBall.RKPlayAudio = 0;
	}
}

BeachBall.SolveLogicat = function() {
	var i = 65;
	var LCSolution = 'A';
	do 
		{LCSolution = String.fromCharCode(i);
		i++;}
	while (Molpy.redactedPuzzleTarget != Molpy.redactedSGen.StatementValue(LCSolution));
	Molpy.ClickRedactedPuzzle(LCSolution);
}

BeachBall.SwitchOption = function(option) {
	var status = 0;
	switch (option) {
		case 'RKAutoClick':
			//Try me = BeachBall.RKAutoClickStatus++;
			BeachBall.RKAutoClickStatus++;
			if (BeachBall.RKAutoClickStatus > 2) {BeachBall.RKAutoClickStatus = 0;}
			status = BeachBall.RKAutoClickStatus;
			break;
		case 'LCAutoClick':
			BeachBall.LCAutoClickStatus++;
			if (BeachBall.LCAutoClickStatus > 1) {BeachBall.LCAutoClickStatus = 0;}
			status = BeachBall.LCAutoClickStatus;
			break;
		case 'NinjaAutoClick':
			BeachBall.NinjaAutoClickStatus++;
			if (BeachBall.NinjaAutoClickStatus > 1) {BeachBall.NinjaAutoClickStatus = 0;}
			status = BeachBall.NinjaAutoClickStatus;
			break;
		case 'BorderAlert':
			BeachBall.BorderAlertStatus++;
			if (BeachBall.BorderAlertStatus > 1) {BeachBall.BorderAlertStatus = 0; $("#beach").css("border","1px solid white");}
			status = BeachBall.BorderAlertStatus;
			break;
		case 'AudioAlerts':
			BeachBall.AudioAlertsStatus++;
			if (BeachBall.AudioAlertsStatus > 3) {BeachBall.AudioAlertsStatus = 0;}
			status = BeachBall.AudioAlertsStatus;
			break;
		case 'RefreshRate':
			var newRate = parseInt(prompt('Please enter your desired BeachBall refresh rate in milliseconds (500 - 3600):', BeachBall.refreshRate));
			if (newRate < 500 || newRate > 3600 || isNaN(newRate)){
				Molpy.Notify('Invalid Refresh Rate', 1);
			}
			else {
				BeachBall.refreshRate = newRate;
			}
			break;
	}
	BeachBall.DisplayDescription(option, status);
}

BeachBall.DisplayDescription = function(option, status) {
	var error = 0;
	var description = 'error';
	Molpy.Notify(option + status, 1);
	if (option == 'LCAutoClick' || option == 'NinjaAutoClick' || option == 'BorderAlert') {
		if (status == 0) {description = 'Off';}
		else if (status == 1) {description = 'On';}
		else {Molpy.Notify('Display Description Error', 1);}
	}
	else if (option == 'AudioAlerts') {
		if (status == 0) {description = 'Off';}
		else if (status == 1) {description = 'RK Only'; BeachBall.RKPlayAudio = 1;}
		else if (status == 2) {description = 'ONG Only';}
		else if (status == 3) {description = 'RK and ONG'; BeachBall.RKPlayAudio = 1;}
		else {Molpy.Notify('Display Description Error - Audio Alerts: ' + status, 1);}
	}
	else if (option == 'RKAutoClick') {
		if (status == 0) {description = 'Off';}
		else if (status == 1) {description = 'Find RK Only'; BeachBall.RKNew = 1;}
		else if (status == 2) {description = 'On'; BeachBall.RKNew = 1;}
		else {Molpy.Notify('Display Description Error - RKAutoClick: ' + status, 1);}
	}
	else if (option == 'RefreshRate') {
		description = BeachBall.refreshRate;
	}
	else {
		Molpy.Notify(option + ' is not a valid option.', 1);
		error = 1;
	}
		
	if (error == 0) {g(option + 'Desc').innerHTML = '<br>' + description;}
}

//Beach Ball Startup
//Set Settings
if (Molpy.Got('Kitnip') == 1){BeachBall.RKAlertFrequency = 10;}

//Create Menu
$('#optionsItems').append('<br> <br> <div class="minifloatbox"> <h3 style="font-size:150%; color:red">BeachBall Settings</h3> <h4 style"font-size:75%">v ' + BeachBall.version + '</div> <br>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'RKAutoClick\')"> <h4>Redundakitty Auto Click</h4> </a> <div id="RKAutoClickDesc"></div></div>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'LCAutoClick\')"> <h4>Logicat Auto Click</h4> </a> <div id="LCAutoClickDesc"></div></div>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'NinjaAutoClick\')"> <h4>Ninja Auto Click</h4> </a> <div id="NinjaAutoClickDesc"></div></div>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'BorderAlert\')"> <h4>Ninja Visual Alert</h4> </a> <div id="BorderAlertDesc"></div></div>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'AudioAlerts\')"> <h4>Audio Alerts</h4> </a> <div id="AudioAlertsDesc"></div></div>');
$('#optionsItems').append('<div class="minifloatbox"> <a onclick="BeachBall.SwitchOption(\'RefreshRate\')"> <h4>Refresh Rate</h4> </a> <div id="RefreshRateDesc"></div></div>');
//$('#optionsItems').append('<div class="minifloatbox"> <a onclick="SpawnRK()"> <h4>Spawn RK</h4> </a></div>');
//$('#optionsItems').append('<div class="minifloatbox"> <a onclick="ExtendRK()"> <h4>Extend RK</h4> </a></div>');
BeachBall.DisplayDescription('RKAutoClick', BeachBall.RKAutoClickStatus);
BeachBall.DisplayDescription('LCAutoClick', BeachBall.LCAutoClickStatus);
BeachBall.DisplayDescription('NinjaAutoClick', BeachBall.NinjaAutoClickStatus);
BeachBall.DisplayDescription('BorderAlert', BeachBall.BorderAlertStatus);
BeachBall.DisplayDescription('AudioAlerts', BeachBall.AudioAlertsStatus);
BeachBall.DisplayDescription('RefreshRate', BeachBall.refreshRate);

BeachBall.MainProgram = function() {
	Molpy.Notify('Tick', 0);
	BeachBall.Time_to_ONG = (Molpy.NPlength * 1000) - Molpy.ONGelapsed;
	BeachBall.RedundaKitty();
	BeachBall.Ninja();
	BeachBall.Loop();
}

BeachBall.Loop = function() {
	setTimeout(BeachBall.MainProgram(), 1000);
}

Molpy.Notify('BeachBall version ' + BeachBall.version + ' loaded for SandCastle Builder version ' + BeachBall.SCBversion, 1);
BeachBall.Loop();

/*
BeachBall.SpawnRK = function() {
	Molpy.redactedCountup = Molpy.redactedToggle - 1;
}

BeachBall.ExtendRK = function() {
	Molpy.redactedCountup = 1;
}
*/
