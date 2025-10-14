import * as Tone from 'tone';

class Mixer {
	private _master: Tone.Channel;
	private _channels: Tone.Channel[] = [];
	private _synth: Tone.DuoSynth;
	private _bass: Tone.DuoSynth;

	constructor() {
		this._master = new Tone.Channel(-20, 0).toDestination();

		const feedbackDelay = new Tone.FeedbackDelay('4n', 0.2);
		const phaser = new Tone.Phaser(3, 1, 300);

		feedbackDelay.wet.value = 0.2;
		phaser.wet.value = 0.7;

		this._synth = new Tone.DuoSynth({
			volume: 0.1,
			harmonicity: 0.1,
			vibratoAmount: 0.1,
			vibratoRate: 0.0124,
			context: {
				latencyHint: 'interactive',
			},
		}).chain(feedbackDelay, phaser, this._master);

		this._bass = new Tone.DuoSynth({
			volume: 0.1,
			harmonicity: 0.1,
			vibratoAmount: 0,
			vibratoRate: 0,
			context: {
				latencyHint: 'interactive',
			},
		}).connect(this._master);
	}
	playNote(note: string, duration: number, velocity: number) {
		this._synth.triggerAttackRelease(note, duration, Tone.now() + 0.0001, velocity);
	}
	playBass(note: string, duration: number, velocity: number) {
		this._bass.triggerAttackRelease(note, duration, Tone.now() + 0.0001, velocity);
	}
	destroy() {
		this._synth.dispose();
		this._channels.forEach((c) => c.dispose());
		this._master.dispose();
	}
}

export default Mixer;
