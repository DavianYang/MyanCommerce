/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 */

import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
    af,
    ak,
    sq,
    am,
    ar,
    hy,
    as,
    az,
    bm,
    bn,
    eu,
    be,
    bs,
    br,
    bg,
    my,
    ca,
    ce,
    zh,
    zh_Hans,
    zh_Hant,
    cu,
    kw,
    co,
    hr,
    cs,
    da,
    nl,
    nl_BE,
    dz,
    en,
    en_AU,
    en_CA,
    en_GB,
    en_US,
    eo,
    et,
    ee,
    fo,
    fi,
    fr,
    fr_CA,
    fr_CH,
    ff,
    gl,
    lg,
    ka,
    de,
    de_AT,
    de_CH,
    el,
    gu,
    ht,
    ha,
    he,
    hi,
    hu,
    is,
    ig,
    id,
    ia,
    ga,
    it,
    ja,
    jv,
    kl,
    kn,
    ks,
    kk,
    km,
    ki,
    rw,
    ko,
    ku,
    ky,
    lo,
    la,
    lv,
    ln,
    lt,
    lu,
    lb,
    mk,
    mg,
    ms,
    ml,
    mt,
    gv,
    mi,
    mr,
    mn,
    ne,
    nd,
    se,
    nb,
    nn,
    ny,
    or,
    om,
    os,
    ps,
    fa,
    fa_AF,
    pl,
    pt,
    pt_BR,
    pt_PT,
    pa,
    qu,
    ro,
    ro_MD,
    rm,
    rn,
    ru,
    sm,
    sg,
    sa,
    gd,
    sr,
    sn,
    ii,
    sd,
    si,
    sk,
    sl,
    so,
    st,
    es,
    es_ES,
    es_MX,
    su,
    sw,
    sw_CD,
    sv,
    tg,
    ta,
    tt,
    te,
    th,
    bo,
    ti,
    to,
    tr,
    tk,
    uk,
    ur,
    ug,
    uz,
    vi,
    vo,
    cy,
    fy,
    wo,
    xh,
    yi,
    yo,
    zu,
}

registerEnumType(LanguageCode, {
    name: 'LanguageCode',
    description:
        'Languages in the form of a ISO 639-1 language code with optional region or script modifier (e.g. de_AT).',
    valuesMap: {
        af: {
            description: 'Afrikaans',
        },

        ak: {
            description: 'Akan',
        },

        sq: {
            description: 'Albanian',
        },

        am: {
            description: 'Amharic',
        },

        ar: {
            description: 'Arabic',
        },

        hy: {
            description: 'Armenian',
        },

        as: {
            description: 'Assamese',
        },

        az: {
            description: 'Azerbaijani',
        },

        bm: {
            description: 'Bambara',
        },

        bn: {
            description: 'Bangla',
        },

        eu: {
            description: 'Basque',
        },

        be: {
            description: 'Belarusian',
        },

        bs: {
            description: 'Bosnian',
        },

        br: {
            description: 'Breton',
        },
        bg: {
            description: 'Bulgarian',
        },

        my: {
            description: 'Burmese',
        },

        ca: {
            description: 'Catalan',
        },

        ce: {
            description: 'Chechen',
        },

        zh: {
            description: 'Chinese',
        },

        zh_Hans: {
            description: 'Simplified Chinese',
        },

        zh_Hant: {
            description: 'Traditional Chinese',
        },

        cu: {
            description: 'Church Slavic',
        },

        kw: {
            description: 'Cornish',
        },

        co: {
            description: 'Corsican',
        },

        hr: {
            description: 'Croatian',
        },

        cs: {
            description: 'Czech',
        },

        da: {
            description: 'Danish',
        },

        nl: {
            description: 'Dutch',
        },

        nl_BE: {
            description: 'Flemish',
        },

        dz: {
            description: 'Dzongkha',
        },

        en: {
            description: 'English',
        },

        en_AU: {
            description: 'Australian English',
        },

        en_CA: {
            description: 'Canadian English',
        },

        en_GB: {
            description: 'British English',
        },

        en_US: {
            description: 'American English',
        },

        eo: {
            description: 'Esperanto',
        },

        et: {
            description: 'Estonian',
        },

        ee: {
            description: 'Ewe',
        },

        fo: {
            description: 'Faroese',
        },

        fi: {
            description: 'Finnish',
        },

        fr: {
            description: 'French',
        },

        fr_CA: {
            description: 'Canadian French',
        },

        fr_CH: {
            description: 'Swiss French',
        },

        ff: {
            description: 'Fulah',
        },

        gl: {
            description: 'Galician',
        },

        lg: {
            description: 'Ganda',
        },

        ka: {
            description: 'Georgian',
        },

        de: {
            description: 'German',
        },

        de_AT: {
            description: 'Austrian German',
        },

        de_CH: {
            description: 'Swiss High German',
        },

        el: {
            description: 'Greek',
        },

        gu: {
            description: 'Gujarati',
        },

        ht: {
            description: 'Haitian Creole',
        },

        ha: {
            description: 'Hausa',
        },

        he: {
            description: 'Hebrew',
        },

        hi: {
            description: 'Hindi',
        },

        hu: {
            description: 'Hungarian',
        },

        is: {
            description: 'Icelandic',
        },

        ig: {
            description: 'Igbo',
        },

        id: {
            description: 'Indonesian',
        },

        ia: {
            description: 'Interlingua',
        },

        ga: {
            description: 'Irish',
        },

        it: {
            description: 'Italian',
        },

        ja: {
            description: 'Japanese',
        },

        jv: {
            description: 'Javanese',
        },

        kl: {
            description: 'Kalaallisut',
        },

        kn: {
            description: 'Kannada',
        },

        ks: {
            description: 'Kashmiri',
        },

        kk: {
            description: 'Kazakh',
        },

        km: {
            description: 'Khmer',
        },

        ki: {
            description: 'Kikuyu',
        },

        rw: {
            description: 'Kinyarwanda',
        },

        ko: {
            description: 'Korean',
        },

        ku: {
            description: 'Kurdish',
        },

        ky: {
            description: 'Kyrgyz',
        },

        lo: {
            description: 'Lao',
        },

        la: {
            description: 'Latin',
        },

        lv: {
            description: 'Latvian',
        },

        ln: {
            description: 'Lingala',
        },

        lt: {
            description: 'Lithuanian',
        },

        lu: {
            description: 'Luba-Katanga',
        },

        lb: {
            description: 'Luxembourgish',
        },

        mk: {
            description: 'Macedonian',
        },

        mg: {
            description: 'Malagasy',
        },

        ms: {
            description: 'Malay',
        },

        ml: {
            description: 'Malayalam',
        },

        mt: {
            description: 'Maltese',
        },

        gv: {
            description: 'Manx',
        },

        mi: {
            description: 'Maori',
        },

        mr: {
            description: 'Marathi',
        },

        mn: {
            description: 'Mongolian',
        },

        ne: {
            description: 'Nepali',
        },

        nd: {
            description: 'North Ndebele',
        },

        se: {
            description: 'Northern Sami',
        },

        nb: {
            description: 'Norwegian Bokmål',
        },

        nn: {
            description: 'Norwegian Nynorsk',
        },

        ny: {
            description: 'Nyanja',
        },

        or: {
            description: 'Odia',
        },

        om: {
            description: 'Oromo',
        },

        os: {
            description: 'Ossetic',
        },

        ps: {
            description: 'Pashto',
        },

        fa: {
            description: 'Persian',
        },

        fa_AF: {
            description: 'Dari',
        },

        pl: {
            description: 'Polish',
        },

        pt: {
            description: 'Portuguese',
        },

        pt_BR: {
            description: 'Brazilian Portuguese',
        },

        pt_PT: {
            description: 'European Portuguese',
        },

        pa: {
            description: 'Punjabi',
        },

        qu: {
            description: 'Quechua',
        },

        ro: {
            description: 'Romanian',
        },

        ro_MD: {
            description: 'Moldavian',
        },

        rm: {
            description: 'Romansh',
        },

        rn: {
            description: 'Rundi',
        },

        ru: {
            description: 'Russian',
        },

        sm: {
            description: 'Samoan',
        },

        sg: {
            description: 'Sango',
        },

        sa: {
            description: 'Sanskrit',
        },

        gd: {
            description: 'Scottish Gaelic',
        },

        sr: {
            description: 'Serbian',
        },

        sn: {
            description: 'Shona',
        },

        ii: {
            description: 'Sichuan Yi',
        },

        sd: {
            description: 'Sindhi',
        },

        si: {
            description: 'Sinhala',
        },

        sk: {
            description: 'Slovak',
        },

        sl: {
            description: 'Slovenian',
        },

        so: {
            description: 'Somali',
        },

        st: {
            description: 'Southern Sotho',
        },

        es: {
            description: 'Spanish',
        },

        es_ES: {
            description: 'European Spanish',
        },

        es_MX: {
            description: 'Mexican Spanish',
        },

        su: {
            description: 'Sundanese',
        },

        sw: {
            description: 'Swahili',
        },

        sw_CD: {
            description: 'Congo Swahili',
        },
        sv: {
            description: 'Swedish',
        },

        tg: {
            description: 'Tajik',
        },

        ta: {
            description: 'Tamil',
        },

        tt: {
            description: 'Tatar',
        },
        te: {
            description: 'Telugu',
        },

        th: {
            description: 'Thai',
        },

        bo: {
            description: 'Tibetan',
        },

        ti: {
            description: 'Tigrinya',
        },

        to: {
            description: 'Tongan',
        },

        tr: {
            description: 'Turkish',
        },

        tk: {
            description: 'Turkmen',
        },

        uk: {
            description: 'Ukrainian',
        },

        ur: {
            description: 'Urdu',
        },

        ug: {
            description: 'Uyghur',
        },

        uz: {
            description: 'Uzbek',
        },

        vi: {
            description: 'Vietnamese',
        },

        vo: {
            description: 'Volapük',
        },

        cy: {
            description: 'Welsh',
        },

        fy: {
            description: 'Western Frisian',
        },

        wo: {
            description: 'Wolof',
        },

        xh: {
            description: 'Xhosa',
        },

        yi: {
            description: 'Yiddish',
        },

        yo: {
            description: 'Yoruba',
        },

        zu: {
            description: 'Zulu',
        },
    },
});
