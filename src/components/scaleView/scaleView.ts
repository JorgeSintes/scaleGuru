import { Note } from "../../core/notes";
import { ScaleType } from "../../core/scales";

import { PlaybackButton } from "../playbackButton/playbackButton";

import { Vex } from "vexflow";
const { Voice, Renderer, Stave, Formatter } = Vex.Flow;

import "./scaleView.css";

export class ScaleView {
    private rootElement?: HTMLDivElement;
    private title?: HTMLElement;
    private scaleContainer?: HTMLDivElement;
    private playbackButton?: PlaybackButton;
    private root: Note;
    private scale: ScaleType;
    private renderer: any;
    private context: any;

    constructor(root: Note, scale: ScaleType) {
        this.root = root;
        this.scale = scale;
    }

    public render(rootElement: HTMLDivElement): void {
        this.rootElement = rootElement;
        this.createElements();
        this.drawScale();
    }

    private createElements(): void {
        if (!this.rootElement) {
            throw new Error("Root element is not defined");
        }
        const cardElement = this.rootElement.appendChild(document.createElement("article"));
        this.title = cardElement.appendChild(document.createElement("header"));
        this.scaleContainer = cardElement.appendChild(document.createElement("div"));
        this.scaleContainer.classList.add("scale-container");

        const playDiv = cardElement.appendChild(document.createElement("div"));
        playDiv.id = "play-menu";
        this.playbackButton = new PlaybackButton();
        this.playbackButton.render(playDiv);
        this.playbackButton.setScale(new this.scale(this.root));

        // this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    }

    private drawScale(): void {
        if (!this.scaleContainer) {
            throw new Error("Root element is not defined");
        }
        this.title!.innerHTML = `<h3>${this.root.toString()} ${this.scale.toString()}</h3>`;
        this.renderer = new Renderer(this.scaleContainer, Renderer.Backends.SVG);
        this.renderer.resize(this.scaleContainer.clientWidth, 200);
        this.context = this.renderer.getContext();
        const notes = new this.scale(this.root).toVexflow();
        const staveWidth = Math.min(500, this.scaleContainer.clientWidth - 40);
        const staveStartX = (this.scaleContainer.clientWidth - staveWidth) / 2;
        const stave = new Stave(staveStartX, 40, staveWidth);
        stave.addClef("treble").setContext(this.context).draw();

        const voice = new Voice({ num_beats: notes.length, beat_value: 4 });
        voice.addTickables(notes);

        new Formatter().joinVoices([voice]).format([voice], staveWidth - 50);
        voice.draw(this.context, stave);
    }

    private emtpyScale(): void {
        if (this.scaleContainer) {
            this.scaleContainer.innerHTML = "";
        }
    }

    public updateComponent(newElement: any): void {
        if (newElement instanceof Note) {
            this.root = newElement;
        } else {
            this.scale = newElement;
        }
        if (this.rootElement) {
            this.emtpyScale();
            this.drawScale();
        }
        if (this.playbackButton) {
            this.playbackButton.stop();
            this.playbackButton.setScale(new this.scale(this.root));
        }
    }
}
