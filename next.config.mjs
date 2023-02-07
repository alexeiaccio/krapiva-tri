import { execSync } from 'child_process'

const ENV_VARS = {
  VTORAYA_REPOSITORY_NAME: process.env.VTORAYA_REPOSITORY_NAME,
}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  swcMinify: true,
  publicRuntimeConfig: ENV_VARS,
  reactStrictMode: true,
  images: {
    domains: ['images.prismic.io'],
    formats: ['image/avif', 'image/webp'],
  },
  generateBuildId: async () => {
    return execSync('git rev-parse HEAD').toString().trim()
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
    ]
  },
  async redirects() {
    return [
      // Authors
      {
        source: '/kollektivnoe-avtorstvo',
        destination: '/o-nas/kollektivnoe-avtorstvo',
        permanent: true,
      },
      {
        source: '/alisa-taezhnaya',
        destination: '/o-nas/alisa-taezhnaya',
        permanent: true,
      },
      {
        source: '/lelya-nordik',
        destination: '/o-nas/lelya-nordik',
        permanent: true,
      },
      {
        source: '/anna-lis',
        destination: '/o-nas/anna-lis',
        permanent: true,
      },
      {
        source: '/farid-bektemirov',
        destination: '/o-nas/farid-bektemirov',
        permanent: true,
      },
      {
        source: '/kiii-oiuur',
        destination: '/o-nas/kiii-oiuur',
        permanent: true,
      },
      {
        source: '/anya-kravchenko',
        destination: '/o-nas/anya-kravchenko',
        permanent: true,
      },
      {
        source: '/elena-pogorelova',
        destination: '/o-nas/elena-pogorelova',
        permanent: true,
      },
      {
        source: '/posthuman-studies-lab',
        destination: '/o-nas/posthuman-studies-lab',
        permanent: true,
      },
      {
        source: '/dasha-sedova',
        destination: '/o-nas/dasha-sedova',
        permanent: true,
      },
      {
        source: '/vanya-demidkin',
        destination: '/o-nas/vanya-demidkin',
        permanent: true,
      },
      {
        source: '/dzhuliyana-semenova',
        destination: '/o-nas/dzhuliyana-semenova',
        permanent: true,
      },
      {
        source: '/dasha-chernova',
        destination: '/o-nas/dasha-chernova',
        permanent: true,
      },
      {
        source: '/marya-dmitrieva',
        destination: '/o-nas/marya-dmitrieva',
        permanent: true,
      },
      {
        source: '/ekaterina-chadina',
        destination: '/o-nas/ekaterina-chadina',
        permanent: true,
      },
      {
        source: '/vera-zamislova',
        destination: '/o-nas/vera-zamislova',
        permanent: true,
      },
      {
        source: '/marina-shamova',
        destination: '/o-nas/marina-shamova',
        permanent: true,
      },
      {
        source: '/kooperativ-raspredelennogo-soznaniya',
        destination: '/o-nas/kooperativ-raspredelennogo-soznaniya',
        permanent: true,
      },
      {
        source: '/n-i-i-ch-e-g-o-d-e-l-a-t-',
        destination: '/o-nas/n-i-i-ch-e-g-o-d-e-l-a-t-',
        permanent: true,
      },
      {
        source: '/iozhi-stolet',
        destination: '/o-nas/iozhi-stolet',
        permanent: true,
      },
      {
        source: '/anna-nataliya-malahovskaya',
        destination: '/o-nas/anna-nataliya-malahovskaya',
        permanent: true,
      },
      {
        source: '/rikardo-marin-vidal',
        destination: '/o-nas/rikardo-marin-vidal',
        permanent: true,
      },
      {
        source: '/institut-politicheskoi-magii',
        destination: '/o-nas/institut-politicheskoi-magii',
        permanent: true,
      },
      {
        source: '/yulii-ilyuschenko',
        destination: '/o-nas/yulii-ilyuschenko',
        permanent: true,
      },
      {
        source: '/fedor-hirosige',
        destination: '/o-nas/fedor-hirosige',
        permanent: true,
      },
      {
        source: '/semen-motolyanets',
        destination: '/o-nas/semen-motolyanets',
        permanent: true,
      },
      {
        source: '/syanda-yaptik',
        destination: '/o-nas/syanda-yaptik',
        permanent: true,
      },
      {
        source: '/natalya-petuhova',
        destination: '/o-nas/natalya-petuhova',
        permanent: true,
      },
      {
        source: '/anastasiya-usacheva',
        destination: '/o-nas/anastasiya-usacheva',
        permanent: true,
      },
      {
        source: '/lera-kononchuk',
        destination: '/o-nas/lera-kononchuk',
        permanent: true,
      },
      {
        source: '/anna-infanteva',
        destination: '/o-nas/anna-infanteva',
        permanent: true,
      },
      {
        source: '/roman-osminkin',
        destination: '/o-nas/roman-osminkin',
        permanent: true,
      },
      {
        source: '/nigina-sharopova',
        destination: '/o-nas/nigina-sharopova',
        permanent: true,
      },
      {
        source: '/sergei-akimov',
        destination: '/o-nas/sergei-akimov',
        permanent: true,
      },
      {
        source: '/darina-ivanova',
        destination: '/o-nas/darina-ivanova',
        permanent: true,
      },
      {
        source: '/olga-davidik',
        destination: '/o-nas/olga-davidik',
        permanent: true,
      },
      {
        source: '/leda-garina',
        destination: '/o-nas/leda-garina',
        permanent: true,
      },
      {
        source: '/yulya-kozhemyako',
        destination: '/o-nas/yulya-kozhemyako',
        permanent: true,
      },
      {
        source: '/anastasiya-dmitrievskaya',
        destination: '/o-nas/anastasiya-dmitrievskaya',
        permanent: true,
      },
      {
        source: '/lika-kareva',
        destination: '/o-nas/lika-kareva',
        permanent: true,
      },
      {
        source: '/aleksandra-dunaeva',
        destination: '/o-nas/aleksandra-dunaeva',
        permanent: true,
      },
      {
        source: '/mariya-iilmaz',
        destination: '/o-nas/mariya-iilmaz',
        permanent: true,
      },
      {
        source: '/egor-sofronov',
        destination: '/o-nas/egor-sofronov',
        permanent: true,
      },
      {
        source: '/marina-israilova',
        destination: '/o-nas/marina-israilova',
        permanent: true,
      },
      {
        source: '/oksana-timofeeva',
        destination: '/o-nas/oksana-timofeeva',
        permanent: true,
      },
      {
        source: '/rastitelnii-vestnik',
        destination: '/o-nas/rastitelnii-vestnik',
        permanent: true,
      },
      {
        source: '/anastasiya-vepreva',
        destination: '/o-nas/anastasiya-vepreva',
        permanent: true,
      },
      {
        source: '/elina-lebedze',
        destination: '/o-nas/elina-lebedze',
        permanent: true,
      },
      {
        source: '/tatyana-danilevskaya',
        destination: '/o-nas/tatyana-danilevskaya',
        permanent: true,
      },
      {
        source: '/nadezhda-ishkinyaeva',
        destination: '/o-nas/nadezhda-ishkinyaeva',
        permanent: true,
      },
      {
        source: '/sonya-krainihvzglyadov-akimova',
        destination: '/o-nas/sonya-krainihvzglyadov-akimova',
        permanent: true,
      },
      {
        source: '/kseniya-kononenko',
        destination: '/o-nas/kseniya-kononenko',
        permanent: true,
      },
      {
        source: '/krapiva',
        destination: '/o-nas/krapiva',
        permanent: true,
      },
      {
        source: '/andrei-vozyanov',
        destination: '/o-nas/andrei-vozyanov',
        permanent: true,
      },
      {
        source: '/sergei-novikov',
        destination: '/o-nas/sergei-novikov',
        permanent: true,
      },
      {
        source: '/natalya-ribalko',
        destination: '/o-nas/natalya-ribalko',
        permanent: true,
      },
      {
        source: '/marina-russkih',
        destination: '/o-nas/marina-russkih',
        permanent: true,
      },
      {
        source: '/maksim-sher',
        destination: '/o-nas/maksim-sher',
        permanent: true,
      },
      {
        source: '/yaroslav-volovod',
        destination: '/o-nas/yaroslav-volovod',
        permanent: true,
      },
      {
        source: '/valentin-dyakonov',
        destination: '/o-nas/valentin-dyakonov',
        permanent: true,
      },
      {
        source: '/nikolai-oleinikov',
        destination: '/o-nas/nikolai-oleinikov',
        permanent: true,
      },
      {
        source: '/devid-greber',
        destination: '/o-nas/devid-greber',
        permanent: true,
      },
      {
        source: '/anastasiya-kachalova',
        destination: '/o-nas/anastasiya-kachalova',
        permanent: true,
      },
      {
        source: '/mark-tsinkevich',
        destination: '/o-nas/mark-tsinkevich',
        permanent: true,
      },
      {
        source: '/vika-kravtsova',
        destination: '/o-nas/vika-kravtsova',
        permanent: true,
      },
      {
        source: '/alla-mitrofanova',
        destination: '/o-nas/alla-mitrofanova',
        permanent: true,
      },
      {
        source: '/savinaz-evdike',
        destination: '/o-nas/savinaz-evdike',
        permanent: true,
      },
      {
        source: '/stanislav-podusenko',
        destination: '/o-nas/stanislav-podusenko',
        permanent: true,
      },
      {
        source: '/nika-dubrovskaya',
        destination: '/o-nas/nika-dubrovskaya',
        permanent: true,
      },
      {
        source: '/anna-engelhardt',
        destination: '/o-nas/anna-engelhardt',
        permanent: true,
      },
      {
        source: '/aleksei-lyubimov',
        destination: '/o-nas/aleksei-lyubimov',
        permanent: true,
      },
      {
        source: '/olya-sosnovskaya',
        destination: '/o-nas/olya-sosnovskaya',
        permanent: true,
      },
      {
        source: '/nikolai-shuvalov',
        destination: '/o-nas/nikolai-shuvalov',
        permanent: true,
      },
      {
        source: '/vika-biran',
        destination: '/o-nas/vika-biran',
        permanent: true,
      },
      {
        source: '/mihail-fedorchenko',
        destination: '/o-nas/mihail-fedorchenko',
        permanent: true,
      },
      {
        source: '/antonina-stebur',
        destination: '/o-nas/antonina-stebur',
        permanent: true,
      },
      {
        source: '/nadya-sayapina',
        destination: '/o-nas/nadya-sayapina',
        permanent: true,
      },
      {
        source: '/elena-nikanorova',
        destination: '/o-nas/elena-nikanorova',
        permanent: true,
      },
      {
        source: '/nikolai-sinyaev',
        destination: '/o-nas/nikolai-sinyaev',
        permanent: true,
      },
      {
        source: '/mariya-mitrenina',
        destination: '/o-nas/mariya-mitrenina',
        permanent: true,
      },
      {
        source: '/tehno-poeziya',
        destination: '/o-nas/tehno-poeziya',
        permanent: true,
      },
      {
        source: '/aleksei-ache',
        destination: '/o-nas/aleksei-ache',
        permanent: true,
      },
      {
        source: '/sasha-starost',
        destination: '/o-nas/sasha-starost',
        permanent: true,
      },
      {
        source: '/kseniya-yurkova',
        destination: '/o-nas/kseniya-yurkova',
        permanent: true,
      },
      {
        source: '/anna-kozlova',
        destination: '/o-nas/anna-kozlova',
        permanent: true,
      },
      {
        source: '/katya-ivanova',
        destination: '/o-nas/katya-ivanova',
        permanent: true,
      },
      {
        source: '/kirill-rozhentsov',
        destination: '/o-nas/kirill-rozhentsov',
        permanent: true,
      },
      {
        source: '/georgii-sokolov',
        destination: '/o-nas/georgii-sokolov',
        permanent: true,
      },
      {
        source: '/maks-evstropov',
        destination: '/o-nas/maks-evstropov',
        permanent: true,
      },
      {
        source: '/vasilii-borovoi',
        destination: '/o-nas/vasilii-borovoi',
        permanent: true,
      },
      {
        source: '/marina-zubkova',
        destination: '/o-nas/marina-zubkova',
        permanent: true,
      },
      {
        source: '/anna-temkina',
        destination: '/o-nas/anna-temkina',
        permanent: true,
      },
      {
        source: '/aleksandr-kondakov',
        destination: '/o-nas/aleksandr-kondakov',
        permanent: true,
      },
      {
        source: '/kseniya-brailovskaya',
        destination: '/o-nas/kseniya-brailovskaya',
        permanent: true,
      },
      {
        source: '/varya-mihailova',
        destination: '/o-nas/varya-mihailova',
        permanent: true,
      },
      {
        source: '/masha-ivasenko',
        destination: '/o-nas/masha-ivasenko',
        permanent: true,
      },
      {
        source: '/irina-aksenova',
        destination: '/o-nas/irina-aksenova',
        permanent: true,
      },
      {
        source: '/lizaveta-matveeva',
        destination: '/o-nas/lizaveta-matveeva',
        permanent: true,
      },
      {
        source: '/anastasiya-makarenko',
        destination: '/o-nas/anastasiya-makarenko',
        permanent: true,
      },
      {
        source: '/anastasiya-kotileva',
        destination: '/o-nas/anastasiya-kotileva',
        permanent: true,
      },
      {
        source: '/iskrenne-vasha-sarancha',
        destination: '/o-nas/iskrenne-vasha-sarancha',
        permanent: true,
      },
      {
        source: '/dmitrii-vilenskii',
        destination: '/o-nas/dmitrii-vilenskii',
        permanent: true,
      },
      {
        source: '/aleksandr-korolev',
        destination: '/o-nas/aleksandr-korolev',
        permanent: true,
      },
      {
        source: '/vita-zelenskaya',
        destination: '/o-nas/vita-zelenskaya',
        permanent: true,
      },
      {
        source: '/sasha-kachko',
        destination: '/o-nas/sasha-kachko',
        permanent: true,
      },
      {
        source: '/ruslan-polanin',
        destination: '/o-nas/ruslan-polanin',
        permanent: true,
      },
      {
        source: '/mariya-dmitrieva',
        destination: '/o-nas/mariya-dmitrieva',
        permanent: true,
      },
      {
        source: '/neopoznannii-edinorog',
        destination: '/o-nas/neopoznannii-edinorog',
        permanent: true,
      },
      {
        source: '/danita-pushkareva',
        destination: '/o-nas/danita-pushkareva',
        permanent: true,
      },
      {
        source: '/zoya-zoa-art',
        destination: '/o-nas/zoya-zoa-art',
        permanent: true,
      },
      {
        source: '/sergei-yugov',
        destination: '/o-nas/sergei-yugov',
        permanent: true,
      },
      {
        source: '/anna-zelikova',
        destination: '/o-nas/anna-zelikova',
        permanent: true,
      },
      {
        source: '/anna-tereshkina',
        destination: '/o-nas/anna-tereshkina',
        permanent: true,
      },
      {
        source: '/konstantin-samolovov',
        destination: '/o-nas/konstantin-samolovov',
        permanent: true,
      },
      {
        source: '/denis-sorokin',
        destination: '/o-nas/denis-sorokin',
        permanent: true,
      },
      {
        source: '/dmitrii-bezuglov',
        destination: '/o-nas/dmitrii-bezuglov',
        permanent: true,
      },
      {
        source: '/nonyudo',
        destination: '/o-nas/nonyudo',
        permanent: true,
      },
      {
        source: '/dmitrii-pilikin',
        destination: '/o-nas/dmitrii-pilikin',
        permanent: true,
      },
      {
        source: '/ekaterina-sokolovskaya',
        destination: '/o-nas/ekaterina-sokolovskaya',
        permanent: true,
      },
      {
        source: '/aleksandra-tsibulya',
        destination: '/o-nas/aleksandra-tsibulya',
        permanent: true,
      },
      {
        source: '/aleksandr-paschenko',
        destination: '/o-nas/aleksandr-paschenko',
        permanent: true,
      },
      {
        source: '/aleksandra-generalova',
        destination: '/o-nas/aleksandra-generalova',
        permanent: true,
      },
      {
        source: '/mariya-nikolaeva',
        destination: '/o-nas/mariya-nikolaeva',
        permanent: true,
      },
      {
        source: '/ilya-firdman',
        destination: '/o-nas/ilya-firdman',
        permanent: true,
      },
      // Category tags
      {
        source: '/intervyu',
        destination: '/rubriki/intervyu',
        permanent: true,
      },
      {
        source: '/revyu',
        destination: '/rubriki/revyu',
        permanent: true,
      },
      {
        source: '/analitika',
        destination: '/rubriki/analitika',
        permanent: true,
      },
      {
        source: '/praktiki-pisma',
        destination: '/rubriki/praktiki-pisma',
        permanent: true,
      },
      {
        source: '/diskussii',
        destination: '/rubriki/diskussii',
        permanent: true,
      },
      {
        source: '/spetsvipusk',
        destination: '/rubriki/spetsvipusk',
        permanent: true,
      },
      {
        source: '/magiya-i-mi',
        destination: '/rubriki/magiya-i-mi',
        permanent: true,
      },
      {
        source: '/ekskursiya',
        destination: '/rubriki/ekskursiya',
        permanent: true,
      },
      {
        source: '/arhiv',
        destination: '/rubriki/arhiv',
        permanent: true,
      },
      {
        source: '/veschdok',
        destination: '/rubriki/veschdok',
        permanent: true,
      },
      {
        source: '/rodina',
        destination: '/rubriki/rodina',
        permanent: true,
      },
      {
        source: '/afisha',
        destination: '/rubriki/afisha',
        permanent: true,
      },
      {
        source: '/dokumenti',
        destination: '/rubriki/dokumenti',
        permanent: true,
      },
      // Time tags
      {
        source: '/mai-2022',
        destination: '/arhiv/mai-2022',
        permanent: true,
      },
      {
        source: '/fevral-2022',
        destination: '/arhiv/fevral-2022',
        permanent: true,
      },
      {
        source: '/yanvar-2022',
        destination: '/arhiv/yanvar-2022',
        permanent: true,
      },
      {
        source: '/dekabr-2021',
        destination: '/arhiv/dekabr-2021',
        permanent: true,
      },
      {
        source: '/noyabr-2021',
        destination: '/arhiv/noyabr-2021',
        permanent: true,
      },
      {
        source: '/oktyabr-2021',
        destination: '/arhiv/oktyabr-2021',
        permanent: true,
      },
      {
        source: '/sentyabr-2021',
        destination: '/arhiv/sentyabr-2021',
        permanent: true,
      },
      {
        source: '/avgust-2021',
        destination: '/arhiv/avgust-2021',
        permanent: true,
      },
      {
        source: '/iyul-2021',
        destination: '/arhiv/iyul-2021',
        permanent: true,
      },
      {
        source: '/iyun-2021',
        destination: '/arhiv/iyun-2021',
        permanent: true,
      },
      {
        source: '/mai-2021',
        destination: '/arhiv/mai-2021',
        permanent: true,
      },
      {
        source: '/aprel-2021',
        destination: '/arhiv/aprel-2021',
        permanent: true,
      },
      {
        source: '/mart-2021',
        destination: '/arhiv/mart-2021',
        permanent: true,
      },
      {
        source: '/fevral-2021',
        destination: '/arhiv/fevral-2021',
        permanent: true,
      },
      {
        source: '/yanvar-2021',
        destination: '/arhiv/yanvar-2021',
        permanent: true,
      },
      {
        source: '/dekabr-2020',
        destination: '/arhiv/dekabr-2020',
        permanent: true,
      },
      {
        source: '/noyabr-2020-',
        destination: '/arhiv/noyabr-2020-',
        permanent: true,
      },
      {
        source: '/oktyabr-2020',
        destination: '/arhiv/oktyabr-2020',
        permanent: true,
      },
      {
        source: '/sentyabr-2020',
        destination: '/arhiv/sentyabr-2020',
        permanent: true,
      },
      {
        source: '/avgust-2020',
        destination: '/arhiv/avgust-2020',
        permanent: true,
      },
      {
        source: '/iyul-2020',
        destination: '/arhiv/iyul-2020',
        permanent: true,
      },
      {
        source: '/iyun-2020',
        destination: '/arhiv/iyun-2020',
        permanent: true,
      },
      {
        source: '/mai-2020',
        destination: '/arhiv/mai-2020',
        permanent: true,
      },
      {
        source: '/aprel-2020',
        destination: '/arhiv/aprel-2020',
        permanent: true,
      },
      {
        source: '/fevral-2020',
        destination: '/arhiv/fevral-2020',
        permanent: true,
      },
      {
        source: '/yanvar-2020',
        destination: '/arhiv/yanvar-2020',
        permanent: true,
      },
      {
        source: '/dekabr-2019',
        destination: '/arhiv/dekabr-2019',
        permanent: true,
      },
      {
        source: '/noyabr-2019',
        destination: '/arhiv/noyabr-2019',
        permanent: true,
      },
      {
        source: '/oktyabr-2019',
        destination: '/arhiv/oktyabr-2019',
        permanent: true,
      },
      {
        source: '/sentyabr-2019',
        destination: '/arhiv/sentyabr-2019',
        permanent: true,
      },
      {
        source: '/mart-2019',
        destination: '/arhiv/mart-2019',
        permanent: true,
      },
      {
        source: '/fevral-2019',
        destination: '/arhiv/fevral-2019',
        permanent: true,
      },
      {
        source: '/yanvar-2019',
        destination: '/arhiv/yanvar-2019',
        permanent: true,
      },
      {
        source: '/dekabr-2018',
        destination: '/arhiv/dekabr-2018',
        permanent: true,
      },
      {
        source: '/noyabr-2018',
        destination: '/arhiv/noyabr-2018',
        permanent: true,
      },
      {
        source: '/oktyabr-2018',
        destination: '/arhiv/oktyabr-2018',
        permanent: true,
      },
      {
        source: '/sentyabr-2018',
        destination: '/arhiv/sentyabr-2018',
        permanent: true,
      },
      {
        source: '/avgust-2018',
        destination: '/arhiv/avgust-2018',
        permanent: true,
      },
    ]
  },
}

export default config
