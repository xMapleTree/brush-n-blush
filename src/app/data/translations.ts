export type AppLanguage = 'en' | 'uk' | 'ru' | 'ja';

export interface TranslationDict {
    // General
    back: string;
    saveAndContinue: string;
    saveAndStay: string;
    startSession: string;
    backToHome: string;
    cancel: string;

    // Home Page
    appTitle: string;
    appSubtitle: string;
    startSolo: string;
    personalize: string;
    settings: string;
    statsTitle: string;
    totalSessions: string;
    totalImpacts: string;
    currentRank: string;
    startPartner: string;
    badgeSoon: string;

    // Personalization
    personalizationTitle: string;
    personalizationSubtitle: string;
    experienceLevel: string;
    availableImplements: string;
    searchImplementPlaceholder: string;
    addCustom: string;
    noImplementsHint: string;
    expBeginnerTitle: string;
    expBeginnerDesc: string;
    expIntermediateTitle: string;
    expIntermediateDesc: string;
    expAdvancedTitle: string;
    expAdvancedDesc: string;

    // Session Setup
    sessionSetupTitle: string;
    sessionSetupSubtitle: string;
    mode: string;
    modeOneShot: string;
    modeRounds: string;
    modeEndless: string;
    tasksCount: string;
    moodAndFlow: string;
    moodGentleTitle: string;
    moodGentleDesc: string;
    moodProgressiveTitle: string;
    moodProgressiveDesc: string;
    moodStrictTitle: string;
    moodStrictDesc: string;
    gearForSession: string;

    // Active Session
    finishEarly: string;
    round: string;
    impactsUnit: string;
    zoneLabel: string;
    styleLabel: string;
    doneAndNext: string;
    skipTask: string;

    // Feedback
    checkInTitle: string;
    checkInSubtitle: string;
    continueFlow: string;

    // Summary
    sessionCompleteTitle: string;
    sessionCompleteSubtitle: string;
    xpEarned: string;
    roundsCompleted: string;
    peakIntensity: string;

    // Settings
    settingsTitle: string;
    account: string;
    accountDesc: string;
    signIn: string;
    aiGenerator: string;
    aiGeneratorDesc: string;
    apiKeyLabel: string;
    apiKeyHint: string;
    language: string;
    languageDesc: string;
    dataHistory: string;
    dataHistoryDesc: string;
    resetStats: string;
    resetConfirm: string;

    // Implements
    impBareHand: string;
    impHairbrush: string;
    impWoodenPaddle: string;
    impLeatherPaddle: string;
    impThinSwitch: string;
    impThickSwitch: string;
    impCane: string;
    impRidingCrop: string;
    impRuler: string;
    impLeatherBelt: string;
    impFlogger: string;
    impTawse: string;
    impSpatula: string;

    // Zones
    zoneFullSurface: string;
    zoneAlternatingSides: string;
    zoneWideSweeps: string;
    zoneBottomToTop: string;
    zoneAlternatingFocus: string;
    zoneCenterOutward: string;
    zoneEvenDistribution: string;
    zoneCenterFocus: string;
    zoneSitBoneLine: string;
    zoneUpperCrest: string;
    zoneStrictRows: string;

    // Styles
    styleLightTaps: string;
    styleSoftWarming: string;
    styleSlowContact: string;
    styleCalmPace: string;
    styleIncreasingForce: string;
    styleAlternatingFirm: string;
    styleBuildingTempo: string;
    styleRisingWave: string;
    styleSharpCadence: string;
    styleHeavyImpacts: string;
    styleRapidIntervals: string;
    styleUnyieldingTempo: string;
    styleSolidStrikes: string;

    // Intensity scale
    int1: string;
    int2: string;
    int3: string;
    int4: string;
    int5: string;
    int6: string;
    int7: string;
    int8: string;
    int9: string;
    int10: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDict> = {
    en: {
        back: 'Back',
        saveAndContinue: 'Save & Continue',
        startSession: 'Start Session',
        backToHome: 'Back to Home',
        cancel: 'Cancel',
        saveAndStay: "Save",

        appTitle: 'Brush & Blush',
        appSubtitle: 'Guided solo impact cadence',
        startSolo: 'Start Practice',
        personalize: 'Personalize',
        settings: 'Settings',
        statsTitle: 'Your Progress',
        totalSessions: 'Sessions',
        totalImpacts: 'Total Impacts',
        currentRank: 'Rank',
        startPartner: 'Partner Play',
        badgeSoon: 'Soon',

        personalizationTitle: 'Personalization',
        personalizationSubtitle: 'Tune the engine to match your comfort and gear',
        experienceLevel: 'Experience Level',
        availableImplements: 'Available Implements',
        searchImplementPlaceholder: 'Type to search or add custom...',
        addCustom: 'Add custom',
        noImplementsHint: 'No implements added yet. Add at least one or Bare Hand will be used.',
        expBeginnerTitle: 'Beginner',
        expBeginnerDesc: 'Gentle warmups, low impact counts, and longer rest pauses.',
        expIntermediateTitle: 'Intermediate',
        expIntermediateDesc: 'Balanced pacing, mixed rhythm, and moderate sting.',
        expAdvancedTitle: 'Advanced',
        expAdvancedDesc: 'Intense endurance sets, strict tempo, and heavy impact.',

        sessionSetupTitle: 'Session Setup',
        sessionSetupSubtitle: 'Configure your rhythm and implements',
        mode: 'Mode',
        modeOneShot: 'One-Shot',
        modeRounds: 'Rounds',
        modeEndless: 'Endless',
        tasksCount: 'Tasks',
        moodAndFlow: 'Mood & Flow',
        moodGentleTitle: 'Gentle & Warm',
        moodGentleDesc: 'Low sting, relaxed pauses',
        moodProgressiveTitle: 'Progressive',
        moodProgressiveDesc: 'Rising intensity wave',
        moodStrictTitle: 'Strict',
        moodStrictDesc: 'Steady, crisp tempo',
        gearForSession: 'Gear for this session',

        finishEarly: 'Finish Early',
        round: 'Round',
        impactsUnit: 'Impacts',
        zoneLabel: 'Zone',
        styleLabel: 'Style',
        doneAndNext: 'Done & Next',
        skipTask: 'Skip This Task',

        checkInTitle: 'Check-in',
        checkInSubtitle: 'How does your skin feel right now?',
        continueFlow: 'Continue Flow',

        sessionCompleteTitle: 'Session Complete!',
        sessionCompleteSubtitle: 'Great cadence and endurance',
        xpEarned: 'XP Earned',
        roundsCompleted: 'Rounds',
        peakIntensity: 'Peak Intensity',

        settingsTitle: 'Settings',
        account: 'Account',
        accountDesc: 'Sync your progression across devices',
        signIn: 'Sign In',
        aiGenerator: 'AI Task Generator',
        aiGeneratorDesc: 'Use DeepSeek API for dynamic cards',
        apiKeyLabel: 'DeepSeek API Key',
        apiKeyHint: 'Leave blank to use preconfigured server proxy or local fallback',
        language: 'Language',
        languageDesc: 'App display language',
        dataHistory: 'Data & History',
        dataHistoryDesc: 'Clear sessions, XP, and unlockables',
        resetStats: 'Reset Stats',
        resetConfirm: 'Are you sure you want to reset all sessions and settings?',

        impBareHand: 'Bare Hand',
        impHairbrush: 'Hairbrush',
        impWoodenPaddle: 'Wooden Paddle',
        impLeatherPaddle: 'Leather Paddle',
        impThinSwitch: 'Thin Switch',
        impThickSwitch: 'Thick Switch',
        impCane: 'Cane',
        impRidingCrop: 'Riding Crop',
        impRuler: 'Ruler',
        impLeatherBelt: 'Leather Belt',
        impFlogger: 'Flogger',
        impTawse: 'Tawse',
        impSpatula: 'Spatula',

        zoneFullSurface: 'Full surface coverage',
        zoneAlternatingSides: 'Alternating left and right',
        zoneWideSweeps: 'Wide gentle sweeps',
        zoneBottomToTop: 'Bottom to top transition',
        zoneAlternatingFocus: 'Alternating sides with focus',
        zoneCenterOutward: 'Center moving outward',
        zoneEvenDistribution: 'Even distribution all over',
        zoneCenterFocus: 'Direct center focus',
        zoneSitBoneLine: 'Lower sit-bone line',
        zoneUpperCrest: 'Upper crest boundary',
        zoneStrictRows: 'Strict left-to-right rows',

        styleLightTaps: 'Light playful taps',
        styleSoftWarming: 'Soft rhythmic warming',
        styleSlowContact: 'Slow gentle contact',
        styleCalmPace: 'Calm and steady pace',
        styleIncreasingForce: 'Gradually increasing force',
        styleAlternatingFirm: 'Alternating light and firm',
        styleBuildingTempo: 'Steady building tempo',
        styleRisingWave: 'Rising wave of impacts',
        styleSharpCadence: 'Sharp disciplined cadence',
        styleHeavyImpacts: 'Heavy deliberate impacts',
        styleRapidIntervals: 'Rapid stinging intervals',
        styleUnyieldingTempo: 'Strict unyielding tempo',
        styleSolidStrikes: 'Solid firm strikes',

        int1: 'Mild Warmup',
        int2: 'Gentle Taps',
        int3: 'Noticeable Sting',
        int4: 'Warm & Rosy',
        int5: 'Solid Impact',
        int6: 'Stinging Heat',
        int7: 'Deep Flush',
        int8: 'Intense Sensation',
        int9: 'High Threshold',
        int10: 'Peak Boundary',
    },
    uk: {
        back: 'Назад',
        saveAndContinue: 'Зберегти та продовжити',
        startSession: 'Почати сесію',
        backToHome: 'На головну',
        cancel: 'Скасувати',
        saveAndStay: "Зберегти",

        appTitle: 'Brush & Blush',
        appSubtitle: 'Індивідуальні сесії та ритми',
        startSolo: 'Почати практику',
        personalize: 'Персоналізація',
        settings: 'Налаштування',
        statsTitle: 'Ваш прогрес',
        totalSessions: 'Сесії',
        totalImpacts: 'Всього ударів',
        currentRank: 'Ранг',
        startPartner: 'Парний режим',
        badgeSoon: 'Скоро',

        personalizationTitle: 'Персоналізація',
        personalizationSubtitle: 'Налаштуйте темп під свій досвід та девайси',
        experienceLevel: 'Рівень досвіду',
        availableImplements: 'Наявні девайси',
        searchImplementPlaceholder: 'Почніть вводити назву...',
        addCustom: 'Додати свій',
        noImplementsHint: 'Девайсів не додано. Буде використано Долоню (Bare Hand).',
        expBeginnerTitle: 'Початківець',
        expBeginnerDesc: 'Мʼякий розігрів, невелика кількість ударів, плавний темп.',
        expIntermediateTitle: 'Середній',
        expIntermediateDesc: 'Збалансований ритм, помірна чутливість та зміна зон.',
        expAdvancedTitle: 'Досвідчений',
        expAdvancedDesc: 'Інтенсивні серії, суворий темп та висока витривалість.',

        sessionSetupTitle: 'Налаштування сесії',
        sessionSetupSubtitle: 'Оберіть режим, настрій та девайси',
        mode: 'Режим',
        modeOneShot: 'Один удар',
        modeRounds: 'Раунди',
        modeEndless: 'Нескінченний',
        tasksCount: 'Завдань',
        moodAndFlow: 'Настрій та ритм',
        moodGentleTitle: 'Мʼякий та теплий',
        moodGentleDesc: 'Низька інтенсивність, довгі паузи',
        moodProgressiveTitle: 'Прогресивний',
        moodProgressiveDesc: 'Хвиля наростаючої сили',
        moodStrictTitle: 'Суворий',
        moodStrictDesc: 'Чіткий ритм, швидкий темп',
        gearForSession: 'Девайси на цю сесію',

        finishEarly: 'Завершити',
        round: 'Раунд',
        impactsUnit: 'Ударів',
        zoneLabel: 'Зона',
        styleLabel: 'Стиль',
        doneAndNext: 'Готово, далі',
        skipTask: 'Пропустити завдання',

        checkInTitle: 'Самопочуття',
        checkInSubtitle: 'Як відчувається шкіра прямо зараз?',
        continueFlow: 'Продовжити',

        sessionCompleteTitle: 'Сесію завершено!',
        sessionCompleteSubtitle: 'Чудова витривалість та контроль ритму',
        xpEarned: 'Отримано XP',
        roundsCompleted: 'Раундів',
        peakIntensity: 'Пікова інтенсивність',

        settingsTitle: 'Налаштування',
        account: 'Акаунт',
        accountDesc: 'Синхронізація прогресу між пристроями',
        signIn: 'Увійти',
        aiGenerator: 'ШІ Генератор завдань',
        aiGeneratorDesc: 'Використовувати DeepSeek API для динамічних карток',
        apiKeyLabel: 'Ключ DeepSeek API',
        apiKeyHint: 'Залиште порожнім для сервера за замовчуванням або офлайн-режиму',
        language: 'Мова',
        languageDesc: 'Мова інтерфейсу застосунку',
        dataHistory: 'Дані та історія',
        dataHistoryDesc: 'Скинути історію сесій, XP та досягнення',
        resetStats: 'Скинути дані',
        resetConfirm: 'Ви впевнені, що хочете скинути всі налаштування та сесії?',

        impBareHand: 'Долоня',
        impHairbrush: 'Щітка для волосся',
        impWoodenPaddle: 'Деревʼяний паддл',
        impLeatherPaddle: 'Шкіряний паддл',
        impThinSwitch: 'Тонка різка',
        impThickSwitch: 'Товста різка',
        impCane: 'Тростина',
        impRidingCrop: 'Стек',
        impRuler: 'Лінійка',
        impLeatherBelt: 'Шкіряний ремінь',
        impFlogger: 'Флоггер',
        impTawse: 'Тевс',
        impSpatula: 'Лопатка',

        zoneFullSurface: 'Уся поверхня',
        zoneAlternatingSides: 'Чергування ліво / право',
        zoneWideSweeps: 'Широкі плавні рухи',
        zoneBottomToTop: 'Знизу догори до центру',
        zoneAlternatingFocus: 'Чергування сторін з акцентом',
        zoneCenterOutward: 'Від центру до країв',
        zoneEvenDistribution: 'Рівномірно по всій зоні',
        zoneCenterFocus: 'Чітко по центру',
        zoneSitBoneLine: 'Нижня лінія (під сідницями)',
        zoneUpperCrest: 'Верхня межа',
        zoneStrictRows: 'Чіткі ряди зліва направо',

        styleLightTaps: 'Легкі торкання',
        styleSoftWarming: 'Мʼякий ритмічний розігрів',
        styleSlowContact: 'Повільний мʼякий контакт',
        styleCalmPace: 'Спокійний розмірений темп',
        styleIncreasingForce: 'Поступове нарощування сили',
        styleAlternatingFirm: 'Чергування легких та міцних',
        styleBuildingTempo: 'Наростаючий темп',
        styleRisingWave: 'Наростаюча хвиля ударів',
        styleSharpCadence: 'Різкий дисциплінований ритм',
        styleHeavyImpacts: 'Важкі розмірені удари',
        styleRapidIntervals: 'Швидкі пекучі інтервали',
        styleUnyieldingTempo: 'Суворий безперервний темп',
        styleSolidStrikes: 'Щільні точні удари',

        int1: 'Мʼякий розігрів',
        int2: 'Легкі торкання',
        int3: 'Відчутне печіння',
        int4: 'Теплий румʼянець',
        int5: 'Впевнені удари',
        int6: 'Гаряче печіння',
        int7: 'Глибокий жар',
        int8: 'Інтенсивне навантаження',
        int9: 'Високий поріг',
        int10: 'Межа чутливості',
    },
    ru: {
        back: 'Назад',
        saveAndContinue: 'Сохранить и продолжить',
        startSession: 'Начать сессию',
        backToHome: 'На главную',
        cancel: 'Отмена',
        saveAndStay: "Сохранить",

        appTitle: 'Brush & Blush',
        appSubtitle: 'Индивидуальные сессии и ритмы',
        startSolo: 'Одиночная игра',
        personalize: 'Персонализация',
        settings: 'Настройки',
        statsTitle: 'Ваш прогресс',
        totalSessions: 'Сессии',
        totalImpacts: 'Всего ударов',
        currentRank: 'Ранг',
        startPartner: 'Парный режим',
        badgeSoon: 'Скоро',

        personalizationTitle: 'Персонализация',
        personalizationSubtitle: 'Настройте интенсивность и доступный инвентарь',
        experienceLevel: 'Уровень опыта',
        availableImplements: 'Доступные девайсы',
        searchImplementPlaceholder: 'Поиск или добавление девайса...',
        addCustom: 'Добавить свой',
        noImplementsHint: 'Девайсы не выбраны. Будет использоваться Ладонь (Bare Hand).',
        expBeginnerTitle: 'Новичок',
        expBeginnerDesc: 'Мягкий разогрев, малое число повторений, плавный темп.',
        expIntermediateTitle: 'Средний',
        expIntermediateDesc: 'Сбалансированный ритм, уверенное жжение и чередование зон.',
        expAdvancedTitle: 'Опытный',
        expAdvancedDesc: 'Интенсивные серии, строгий темп и высокая выносливость.',

        sessionSetupTitle: 'Настройка сессии',
        sessionSetupSubtitle: 'Выберите режим, темп и девайсы',
        mode: 'Режим',
        modeOneShot: 'Один подход',
        modeRounds: 'Раунды',
        modeEndless: 'Бесконечный',
        tasksCount: 'Заданий',
        moodAndFlow: 'Настроение и ритм',
        moodGentleTitle: 'Мягкий и тёплый',
        moodGentleDesc: 'Низкая сила, спокойные паузы',
        moodProgressiveTitle: 'Прогрессивный',
        moodProgressiveDesc: 'Волна нарастающей нагрузки',
        moodStrictTitle: 'Строгий',
        moodStrictDesc: 'Чёткий ритм, быстрый темп',
        gearForSession: 'Девайсы на эту сессию',

        finishEarly: 'Завершить',
        round: 'Раунд',
        impactsUnit: 'Ударов',
        zoneLabel: 'Зона',
        styleLabel: 'Стиль',
        doneAndNext: 'Готово, дальше',
        skipTask: 'Пропустить',

        checkInTitle: 'Самочувствие',
        checkInSubtitle: 'Как ощущается кожа прямо сейчас?',
        continueFlow: 'Продолжить',

        sessionCompleteTitle: 'Сессия завершена!',
        sessionCompleteSubtitle: 'Отличная выдержка и контроль темпа',
        xpEarned: 'Получено XP',
        roundsCompleted: 'Раундов',
        peakIntensity: 'Пиковая нагрузка',

        settingsTitle: 'Настройки',
        account: 'Аккаунт',
        accountDesc: 'Синхронизация прогресса между устройствами',
        signIn: 'Войти',
        aiGenerator: 'ИИ Генератор заданий',
        aiGeneratorDesc: 'Использовать DeepSeek API для динамических карточек',
        apiKeyLabel: 'Ключ DeepSeek API',
        apiKeyHint: 'Оставьте пустым для сервера по умолчанию или офлайн-генератора',
        language: 'Язык',
        languageDesc: 'Язык интерфейса приложения',
        dataHistory: 'Данные и история',
        dataHistoryDesc: 'Сбросить историю сессий, XP и открытия',
        resetStats: 'Сбросить данные',
        resetConfirm: 'Вы уверены, что хотите сбросить все сессии и настройки?',

        impBareHand: 'Ладонь',
        impHairbrush: 'Щётка для волос',
        impWoodenPaddle: 'Деревянный паддл',
        impLeatherPaddle: 'Кожаный паддл',
        impThinSwitch: 'Тонкий прут',
        impThickSwitch: 'Толстый прут',
        impCane: 'Трость',
        impRidingCrop: 'Стек',
        impRuler: 'Линейка',
        impLeatherBelt: 'Кожаный ремень',
        impFlogger: 'Флоггер',
        impTawse: 'Тэвс',
        impSpatula: 'Лопатка',

        zoneFullSurface: 'Вся поверхность',
        zoneAlternatingSides: 'Чередование лево / право',
        zoneWideSweeps: 'Широкие плавные движения',
        zoneBottomToTop: 'Снизу вверх к центру',
        zoneAlternatingFocus: 'Чередование сторон с акцентом',
        zoneCenterOutward: 'От центра к краям',
        zoneEvenDistribution: 'Равномерно по всей зоне',
        zoneCenterFocus: 'Строго по центру',
        zoneSitBoneLine: 'Нижняя линия (под ягодицами)',
        zoneUpperCrest: 'Верхняя линия',
        zoneStrictRows: 'Строгие ряды слева направо',

        styleLightTaps: 'Лёгкие касания',
        styleSoftWarming: 'Мягкий ритмичный разогрев',
        styleSlowContact: 'Медленный мягкий контакт',
        styleCalmPace: 'Спокойный размеренный темп',
        styleIncreasingForce: 'Постепенное усиление силы',
        styleAlternatingFirm: 'Чередование лёгких и плотных',
        styleBuildingTempo: 'Нарастающий темп',
        styleRisingWave: 'Нарастающая волна ударов',
        styleSharpCadence: 'Резкий дисциплинированный ритм',
        styleHeavyImpacts: 'Тяжёлые выверенные удары',
        styleRapidIntervals: 'Быстрые жгучие интервалы',
        styleUnyieldingTempo: 'Строгий непрерывный темп',
        styleSolidStrikes: 'Плотные точные удары',

        int1: 'Мягкий разогрев',
        int2: 'Лёгкие касания',
        int3: 'Ощутимое жжение',
        int4: 'Тёплый румянец',
        int5: 'Уверенные удары',
        int6: 'Горячее жжение',
        int7: 'Глубокий жар',
        int8: 'Интенсивная нагрузка',
        int9: 'Высокий порог',
        int10: 'Предел чувствительности',
    },
    ja: {
        back: '戻る',
        saveAndContinue: '保存して続行',
        startSession: 'セッション開始',
        backToHome: 'ホームへ戻る',
        cancel: 'キャンセル',
        saveAndStay: "...",

        appTitle: 'Brush & Blush',
        appSubtitle: 'ガイド付きソロセッション',
        startSolo: '練習を開始',
        personalize: 'カスタマイズ',
        settings: '設定',
        statsTitle: '進行状況',
        totalSessions: 'セッション数',
        totalImpacts: '総インパクト数',
        currentRank: 'ランク',
        startPartner: 'パートナープレイ',
        badgeSoon: '近日公開',

        personalizationTitle: 'カスタマイズ',
        personalizationSubtitle: '心地よさとアイテムに合わせて調整',
        experienceLevel: '経験レベル',
        availableImplements: '利用可能なアイテム',
        searchImplementPlaceholder: '検索またはカスタム追加...',
        addCustom: '追加',
        noImplementsHint: 'アイテムが選択されていません。素手が使用されます。',
        expBeginnerTitle: '初級',
        expBeginnerDesc: '穏やかなウォーミングアップ、少なめの回数、長めの休憩。',
        expIntermediateTitle: '中級',
        expIntermediateDesc: 'バランスの取れたペースとリズム、適度な刺激。',
        expAdvancedTitle: '上級',
        expAdvancedDesc: '高密度のセット、厳格なテンポ、強いインパクト。',

        sessionSetupTitle: 'セッション設定',
        sessionSetupSubtitle: 'リズムとアイテムを設定',
        mode: 'モード',
        modeOneShot: 'ワンショット',
        modeRounds: 'ラウンド',
        modeEndless: 'エンドレス',
        tasksCount: 'タスク',
        moodAndFlow: 'ムードと流れ',
        moodGentleTitle: 'ジェントル',
        moodGentleDesc: '軽い刺激、長めのインターバル',
        moodProgressiveTitle: 'プログレッシブ',
        moodProgressiveDesc: '徐々に高まる波',
        moodStrictTitle: 'ストリクト',
        moodStrictDesc: '明確で速いテンポ',
        gearForSession: '使用アイテム',

        finishEarly: '途中で終了',
        round: 'ラウンド',
        impactsUnit: '回',
        zoneLabel: 'ゾーン',
        styleLabel: 'スタイル',
        doneAndNext: '完了して次へ',
        skipTask: 'スキップ',

        checkInTitle: 'チェックイン',
        checkInSubtitle: '現在の肌の感覚はいかがですか？',
        continueFlow: '続行する',

        sessionCompleteTitle: 'セッション完了！',
        sessionCompleteSubtitle: '素晴らしい持久力とリズムでした',
        xpEarned: '獲得XP',
        roundsCompleted: 'ラウンド数',
        peakIntensity: 'ピーク強度',

        settingsTitle: '設定',
        account: 'アカウント',
        accountDesc: '端末間で進行状況を同期',
        signIn: 'ログイン',
        aiGenerator: 'AIタスク生成',
        aiGeneratorDesc: 'DeepSeek APIを使用して動的カードを生成',
        apiKeyLabel: 'DeepSeek APIキー',
        apiKeyHint: 'デフォルトサーバーまたはローカル生成を使用する場合は空欄',
        language: '言語',
        languageDesc: 'アプリの表示言語',
        dataHistory: 'データと履歴',
        dataHistoryDesc: 'セッション履歴、XP、アンロックを初期化',
        resetStats: 'データを初期化',
        resetConfirm: 'すべてのセッションと設定を初期化してもよろしいですか？',

        impBareHand: '素手',
        impHairbrush: 'ヘアブラシ',
        impWoodenPaddle: '木製パドル',
        impLeatherPaddle: 'レザーパドル',
        impThinSwitch: '細い枝',
        impThickSwitch: '太い枝',
        impCane: 'ケーン',
        impRidingCrop: '短鞭',
        impRuler: '定規',
        impLeatherBelt: 'レザーベルト',
        impFlogger: 'フロッガー',
        impTawse: 'トーズ',
        impSpatula: 'スパチュラ',

        zoneFullSurface: '全面カバー',
        zoneAlternatingSides: '左右交互',
        zoneWideSweeps: '広範囲スイープ',
        zoneBottomToTop: '下部から中央へ',
        zoneAlternatingFocus: '交互フォーカス',
        zoneCenterOutward: '中央から外側へ',
        zoneEvenDistribution: '全体均等',
        zoneCenterFocus: '中央集中',
        zoneSitBoneLine: '下部ライン',
        zoneUpperCrest: '上部境界',
        zoneStrictRows: '左右の厳格ライン',

        styleLightTaps: '軽快なタップ',
        styleSoftWarming: '穏やかなウォーミング',
        styleSlowContact: 'ゆっくりとした接触',
        styleCalmPace: '落ち着いたペース',
        styleIncreasingForce: '徐々に強める',
        styleAlternatingFirm: '緩急の交互',
        styleBuildingTempo: 'テンポアップ',
        styleRisingWave: '波打つ衝撃',
        styleSharpCadence: '規則的なリズム',
        styleHeavyImpacts: '重く正確な一撃',
        styleRapidIntervals: '素早いインターバル',
        styleUnyieldingTempo: '厳格なテンポ',
        styleSolidStrikes: '確実な打撃',

        int1: 'ウォームアップ',
        int2: '穏やかな刺激',
        int3: '心地よい刺激',
        int4: '温まり',
        int5: 'しっかりとした衝撃',
        int6: '強い熱感',
        int7: '深い赤み',
        int8: '強い刺激',
        int9: '高負荷',
        int10: '限界域',
    },
};