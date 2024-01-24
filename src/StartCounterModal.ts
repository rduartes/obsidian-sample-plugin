import {App, Modal, Setting} from "obsidian";
import BrainShardPlugin from "../main";
import {FocusTimer} from "./FocusTimer";

export class StartCounterModal extends Modal {

	duration: number;
	defaultDuration: string;
	onSubmit: (duration: number, statusBarEl:HTMLElement) => void;
	statusBarElement: HTMLElement;
	plugin:BrainShardPlugin;
	focusTimer: FocusTimer;

	constructor(app: App, timer: FocusTimer, statusBarEl:HTMLElement, onSubmit: (duration: number, statusBarEl:HTMLElement) => void, defaultDuration: string, plugin:BrainShardPlugin) {
		super(app);
		this.plugin = plugin;
		this.onSubmit = onSubmit;
		this.defaultDuration = defaultDuration;
		this.duration = Number(defaultDuration);
		this.statusBarElement = statusBarEl;
		this.focusTimer = timer;
	}

	onOpen() {
		this.titleEl.createEl('h3', {text: 'Focused Work Time'});
		const {contentEl} = this;
		contentEl.createEl("h4", {text: "For how long do you want to focus?"});

		new Setting(contentEl)
			.setName("Duration")
			.setDesc('(in minutes)')
			.addText((text) => {
				text.setValue(this.defaultDuration)
				text.onChange((value) => {
					this.duration = Number(value);
				})
			});

		new Setting(contentEl)
			.addButton((btn) =>
				btn.setButtonText("Start")
					.setCta() // cta - call to action (paints the button using the active color)
					.onClick(() => {
						this.close();
						this.focusTimer.start(this.duration);
					})
			);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
