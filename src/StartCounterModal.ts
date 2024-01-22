import {App, Modal, Setting} from "obsidian";

export class StartCounterModal extends Modal {

	duration: number;
	defaultDuration: string;
	onSubmit: (duration: number, statusBarEl:HTMLElement) => void;
	statusBarElement: HTMLElement;

	constructor(app: App, statusBarEl:HTMLElement, onSubmit: (duration: number, statusBarEl:HTMLElement) => void, defaultDuration: string) {
		super(app);
		this.onSubmit = onSubmit;
		this.defaultDuration = defaultDuration;
		this.duration = Number(defaultDuration);
		this.statusBarElement = statusBarEl;
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
					.setCta() // cta - call to action (paints the button in the active color)
					.onClick(() => {
						this.close();
						this.onSubmit(this.duration, this.statusBarElement);
					})
			);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
