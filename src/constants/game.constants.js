import i18n from '@/plugins/i18n'

export const GameTypes = {
  Soccer: 'soccer'
}

export const GameFormat = {
  Format4x4: '4x4',
  Format5x5: '5x5',
  Format5x5x5: '5x5x5',
  Format6x6: '6x6',
  Format6x6x6: '6x6x6',
  Format7x7: '7x7',
  Format8x8: '8x8',
  Format11x11: '11x11'
}

export const PlayerLevel = {
  Beginner: 'beginner',
  BeginnerToMedium: 'beginner_to_medium',
  Medium: 'medium',
  MediumToAdvanced: 'medium_to_advanced',
  Advanced: 'advanced',
  Professional: 'professional'
}

export const GameFieldType = {
  Inside: 'inside',
  Outside: 'outside',
  Unknown: 'unknown'
}

export const District = {
  Darnytskyi: 'darnytskyi',
  Desnianskyi: 'desnianskyi',
  Dniprovskyi: 'dniprovskyi',
  Holosiivskyi: 'holosiivskyi',
  Obolonskyi: 'obolonskyi',
  Pecherskyi: 'pecherskyi',
  Podilskyi: 'podilskyi',
  Shevchenkivskyi: 'shevchenkivskyi',
  Solomianskyi: 'solomianskyi',
  Sviatoshynskyi: 'sviatoshynskyi'
}

export const PLayerLevelLabels = [
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.beginner'),
    value: PlayerLevel.Beginner
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.beginnerToMedium'),
    value: PlayerLevel.BeginnerToMedium
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.medium'),
    value: PlayerLevel.Medium
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.mediumToAdvanced'),
    value: PlayerLevel.MediumToAdvanced
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.advanced'),
    value: PlayerLevel.Advanced
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.playerLevel.professional'),
    value: PlayerLevel.Professional
  }
]

export const GameFormatLabels = [
  {
    label: GameFormat.Format4x4,
    value: GameFormat.Format4x4
  },
  {
    label: GameFormat.Format5x5,
    value: GameFormat.Format5x5
  },
  {
    label: GameFormat.Format5x5x5,
    value: GameFormat.Format5x5x5
  },
  {
    label: GameFormat.Format6x6,
    value: GameFormat.Format6x6
  },
  {
    label: GameFormat.Format6x6x6,
    value: GameFormat.Format6x6x6
  },
  {
    label: GameFormat.Format8x8,
    value: GameFormat.Format8x8
  },
  {
    label: GameFormat.Format11x11,
    value: GameFormat.Format11x11
  }
]

export const GameFieldTypeLabels = [
  {
    label: i18n.t('component.createGameForm.selectLabels.fieldType.inside'),
    value: GameFieldType.Inside
  },
  {
    label: i18n.t('component.createGameForm.selectLabels.fieldType.outside'),
    value: GameFieldType.Outside
  },
  {
    label: i18n.t('text.unknown'),
    value: GameFieldType.Unknown
  }
]

export const DistrictLabels = [
  {
    label: 'Darnytskyi',
    value: District.Darnytskyi
  },
  {
    label: 'Desnianskyi',
    value: District.Desnianskyi
  },
  {
    label: 'Dniprovskyi',
    value: District.Dniprovskyi
  },
  {
    label: 'Holosiivskyi',
    value: District.Holosiivskyi
  },
  {
    label: 'Obolonskyi',
    value: District.Obolonskyi
  },
  {
    label: 'Pecherskyi',
    value: District.Pecherskyi
  },
  {
    label: 'Podilskyi',
    value: District.Podilskyi
  },
  {
    label: 'Shevchenkivskyi',
    value: District.Shevchenkivskyi
  },
  {
    label: 'Solomianskyi',
    value: District.Solomianskyi
  },
  {
    label: 'Sviatoshynskyi',
    value: District.Sviatoshynskyi
  }
]
