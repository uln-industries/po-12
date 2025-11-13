// steps shown in the product tour.

type Step = {
  substeps: { text?: string; classNameToClick: string }[];
};

const TOUR_STEPS: Step[] = [
  {
    substeps: [
      {
        text: "Press the '1' button| to play a sound.",
        classNameToClick: "soundButton-1",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Each numbered button, 1 - 16, plays a different sound. |Try pressing another.",
        classNameToClick: "soundButton-3",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Press `play`| to play a pattern.",
        classNameToClick: "playButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: "You can have up to sixteen patterns recorded. Let's enter| pattern selection mode.",
        classNameToClick: "selectPatternButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Patterns that have notes recorded are lit up. Let's try| pattern two.",
        classNameToClick: "soundButton-2",
      },
    ],
  },
  {
    substeps: [
      {
        text: "This pattern has no notes! Let's add some. The hollow circle on the screen activates when we're recording. |Start recording.",
        classNameToClick: "recordButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: `Let's play a kick on the |first beat,`,
        classNameToClick: "soundButton-1",
      },
      {
        text: ` the |second,`,
        classNameToClick: "soundButton-5",
      },
      {
        text: ` the |third,`,
        classNameToClick: "soundButton-9",
      },
      {
        text: ` and |the fourth.`,
        classNameToClick: "soundButton-13",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Now, we can add some hats. Switch sounds by |entering sound selection mode,",
        classNameToClick: "selectSoundButton",
      },
      {
        text: " then selecting |the sound we want.",
        classNameToClick: "soundButton-3",
      },
    ],
  },
  {
    substeps: [
      {
        text: `Let's alternate kick and snare, putting the snare |on beat 4`,
        classNameToClick: "soundButton-4",
      },
      {
        text: " |and on 12.",
        classNameToClick: "soundButton-12",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Now for a high hat. Enter |sound selection mode, ",
        classNameToClick: "selectSoundButton",
      },
      {
        text: "then select |the sound we want.",
        classNameToClick: "soundButton-11",
      },
      {
        text: " Let's place it in the middle... |on beat 6,",
        classNameToClick: "soundButton-6",
      },
      {
        text: " |7,",
        classNameToClick: "soundButton-7",
      },

      {
        text: " |10,",
        classNameToClick: "soundButton-10",
      },
      {
        text: " and| 11.",
        classNameToClick: "soundButton-11",
      },
    ],
  },
  {
    substeps: [
      {
        text: `This is a bit slow! Let's increase the tempo. Tap the metronome to increase the BPM. |The screen will show the BPM number.`,
        classNameToClick: "switchBPMButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: "We can |stop recording to try some other sounds",
        classNameToClick: "recordButton",
      },
      {
        text: " without changing our pattern. Let's |try 2,",
        classNameToClick: "soundButton-2",
      },
      {
        text: " |13,",
        classNameToClick: "soundButton-13",
      },
      {
        text: " and |6.",
        classNameToClick: "soundButton-6",
      },
    ],
  },

  {
    substeps: [
      {
        text: `6 would fit well. Let's add it. |Enter sound selection,`,
        classNameToClick: "selectSoundButton",
      },
      {
        text: " select |the sound we want,",
        classNameToClick: "soundButton-6",
      },
      {
        text: " |start recording again,",
        classNameToClick: "recordButton",
      },
      {
        text: " and place the sound |here",
        classNameToClick: "soundButton-8",
      },
      {
        text: " and |here.",
        classNameToClick: "soundButton-14",
      },
    ],
  },

  {
    substeps: [
      {
        text: "Share your beats with others |by exporting.",
        classNameToClick: "exportPatternsButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: "Import the |pattern to play back later.",
        classNameToClick: "importPatternsButton",
      },
    ],
  },
  {
    substeps: [
      {
        text: `Not everything from the device is implemented. |These knobs are fun to play with, but they don't do much.`,
        classNameToClick: "knobB",
      },
    ],
  },
  {
    substeps: [
      {
        text: `Data is saved in your browser's local storage. |Let's reset.`,
        classNameToClick: "recordButton",
      },
      {
        text: ` Enjoy beatmaking! Close this card whenever you're ready to jam.|`,
        classNameToClick: "playButton",
      },
    ],
  },
];

export type { Step };
export { TOUR_STEPS };
