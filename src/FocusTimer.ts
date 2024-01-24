import BrainShardPlugin from "../main";

export class FocusTimer {
	focusDurationInMinutes:number;
	elapsedTime: number;
	plugin: BrainShardPlugin; //I need the plugin to access the status bar
	focusInterval: number;
	tickUpdate:(elapsed:number, duration:number)=>void;
	constructor(plugin:BrainShardPlugin) {
		this.plugin = plugin;
	}

	start(focusDuration: number) {
		console.log(`Timer starting with ${focusDuration} minutes`);
		this.focusDurationInMinutes = focusDuration;
		this.elapsedTime = 0;
		this.focusInterval = window.setInterval(this.tick.bind(this), 5000);
		this.plugin.registerInterval(this.focusInterval);
	}

	tick() {
		console.log(this, `tick`, this.elapsedTime);
		this.elapsedTime += 1;
		if(this.elapsedTime == this.focusDurationInMinutes) {
			clearInterval(this.focusInterval);
		}
		this.tickUpdate(this.elapsedTime, this.focusDurationInMinutes);
	}
}
