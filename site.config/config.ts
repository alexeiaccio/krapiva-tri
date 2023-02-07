export const config = {
  title: '·К·Р·А·П·И·В·А·',
  siteURL: 'https://krapiva.org',
  facebookAppId: '401298377254357',
  socials: {
    telegram: 'https://t.me/krapivajournal',
    instagram: 'https://instagram.com//krapivajournal',
  },
  pageLinks: [
    {
      title: {
        text: 'главная',
      },
      link: '/',
    },
    {
      title: {
        text: 'ревью',
      },
      link: '/rubriki/revyu',
    },
    {
      title: {
        text: 'аналитика',
      },
      link: '/rubriki/analitika',
    },
    {
      title: {
        text: 'дискуссии',
      },
      link: '/rubriki/diskussii',
    },
    {
      title: {
        text: 'практики письма',
      },
      link: '/rubriki/praktiki-pisma',
    },
    {
      title: {
        text: 'интервью',
      },
      link: '/rubriki/intervyu',
    },
    {
      title: {
        text: 'архив',
      },
      link: '/arhiv',
    },
    {
      title: {
        text: 'о редакции',
      },
      link: '/o-nas',
    },
  ],
  links: [
    {
      title: {
        text: 'PATREON',
      },
      link: {
        link_type: 'Web',
        url: 'https://www.patreon.com/krapivajournal',
        target: '_blank',
      },
    },
    {
      title: {
        text: 'TG',
      },
      link: {
        link_type: 'Web',
        url: 'https://t.me/krapivajournal',
        target: '_blank',
      },
    },
    {
      title: {
        text: 'IG',
      },
      link: {
        link_type: 'Web',
        url: 'https://www.instagram.com/krapivajournal',
        target: '_blank',
      },
    },
    {
      title: {
        text: 'FB',
      },
      link: {
        link_type: 'Web',
        url: 'https://www.facebook.com/krapivapiter',
        target: '_blank',
      },
    },
    {
      title: {
        text: 'MAIL',
      },
      link: {
        link_type: 'Web',
        url: 'mailto:krapiva@krapiva.org',
        target: '_blank',
      },
    },
    {
      title: {
        text: 'Подписаться',
      },
      link: {
        link_type: 'Web',
        url: 'https://us19.list-manage.com/contact-form?u=4076a0aa3adcc8abda830e362&form_id=24cd66bd3a08e13b804051af1eef29b7',
        target: '_blank',
      },
    },
  ],
  categories: [
    {
      title: 'Ревью',
      description: 'Рецензии на текущие события культурной жизни.',
      slug: 'revyu',
    },
    {
      title: 'Аналитика',
      description:
        'Материалы, анализирующие определенные феномены, важные для редакционной политики издания.',
      slug: 'analitika',
    },
    {
      title: 'Дискуссии',
      description:
        'Материалы, сделанные на  основе редакционных дискуссий "Крапивы", а также другие материалы,  обсуждающие важные для нас темы в формате коллективного диалога.',
      slug: 'diskussii',
    },
    {
      title: 'Практики письма',
      description:
        'Тексты, написанные хореографами,  музыкантами, художниками, активистами и т. д. и представляющие взгляд  изнутри их практики и опыта.',
      slug: 'praktiki-pisma',
    },
    {
      title: 'Интервью',
      description:
        'Блиц-портреты интересных и важных для нас художников и  арт-групп, кураторов и культуртрегеров, теоретиков и активистов.',
      slug: 'intervyu',
    },
    {
      title: 'Архив',
      description: null,
      slug: 'arhiv',
    },
  ],
  banners: [
    {
      text: 'Мы — независимое издание и существуем на ваши пожертвования. Поддержи журнал ·К·Р·А·П·И·В·А·!',
      button: 'ПОДДЕРЖАТЬ',
      colors: ['7 146 104', '158 250 222', '2 49 35', '75 85 99'] as [
        string,
        string,
        string,
        string,
      ],
      link: 'https://www.tinkoff.ru/cf/35BpzwGjxVy',
    },
    {
      text: 'Поддержи журнал ·К·Р·А·П·И·В·А· — перечисли пожертвование!',
      button: 'ПОДДЕРЖАТЬ',
      image:
        'https://images.prismic.io/krapiva-meta/ff368356-307b-44d2-99db-af3ccd49a05d_photo_2021-09-03+13.26.18.jpeg',
      colors: ['7 146 104', '158 250 222', '2 49 35', '75 85 99'] as [
        string,
        string,
        string,
        string,
      ],
      link: 'https://www.tinkoff.ru/cf/35BpzwGjxVy',
    },
  ],
  about: {
    image:
      'https://images.prismic.io/krapiva-meta/f6644d3b7ad881827a18c43a8faae0c6382d4b2c_brennnesselspinat.jpg',
    palette: '#3f591d',
    caption:
      '<p>By Kobako — photo taken by Kobako, CC BY-SA 2.5, <a class="link" target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/w/index.php?curid=755539">https://commons.wikimedia.org/w/index.php?curid=755539</a></p>',
    lead: 'К. Р. А. П. И. В. А. – это  аббревиатура из составленных в довольно произвольном порядке слов «Культура, Ревью, Аналитика, Петербург, Искусство, Вовлечённость, Активизм», маркирующих болевые точки наших интересов. Крапива жалит и жжёт, но она может быть и лекарством, и пищей. У крапивы есть корневище, она довольно живуча. Растение это сорное, пустырное, дикорастущее, вездесущее и самоорганизованное. ',
  },
} as const
