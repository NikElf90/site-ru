/* ============================================================
   Logispot landing page — vanilla JS
   Structure follows the GTM brief: what it does -> how (screenshots)
   -> who it is for -> measured numbers -> rejection report ->
   founder -> price -> FAQ -> repeat the action.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- state ---------- */
  var BASE = window.LP_BASE || '';
  var LANG_PATH = { RU: '', EN: 'en/' };
  function langHref(code) { return BASE + (LANG_PATH[code] || ''); }

  var state = { lang: 'RU', faqOpen: 0, raf: null };

  function detectLang() {
    if (window.LP_LANG && LANG_PATH[window.LP_LANG] !== undefined) return window.LP_LANG;
    return 'RU';
  }

  /* ---------- icons ---------- */
  var IP = {
    forward: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3',
    scan: 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 8h10M7 12h10M7 16h6',
    send: 'M22 2 11 13M22 2l-7 20-4-9-9-4z',
    mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7v5l3 2',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4'
  };
  function icon(name, size, sw) {
    size = size || 24; sw = sw || 1.7;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round"><path d="' + IP[name] + '"/></svg>';
  }
  function check(size, sw) { return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>'; }
  function cross(size, sw) { return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'; }
  var arrowIcon = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var chevronIcon = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  var LOGO_IMG_NAV = '<img src="' + BASE + 'static/img/logo-white.png" alt="Logispot" style="height:34px;width:auto;display:block;">';
  var LOGO_IMG_FOOTER = '<img src="' + BASE + 'static/img/logo-white.png" alt="Logispot" style="height:30px;width:auto;display:block;">';

  var LANGS = [
    { code: 'RU', name: 'Русский' },
    { code: 'EN', name: 'English' }
  ];
  var APP_URL = 'https://app.logispotio.ru/sign-up?utm_medium=website';
  var SIGNIN_URL = 'https://app.logispotio.ru/sign-in?utm_medium=website';
  var FWD_URL = 'mailto:hello@logispotio.ru?subject=One%20real%20request';

  /* ---------- content ---------- */
  var CONTENT = {
    EN: {
      nav: { how: 'How it works', who: "Who it's for", numbers: 'The numbers', pricing: 'Price', signin: 'Sign in' },
      hero: {
        eyebrow: 'FOR FREIGHT FORWARDERS WHO QUOTE EVERY DAY',
        lead: 'Every quotation request, 16 minutes faster.', accent: '10× more quotes, same team.',
        bullets: [
          'Builds the request straight from your mailbox — pdf, xlsx, photos.',
          'Calculates dimensions and rates in seconds.',
          'Prepares the email for your agents — you press send.',
          'Collects client replies and grows your sales.',
          'Fills your CRM or TMS — one less system to type into.'
        ],
        cta: 'Start free trial',
        ctaNote: '14 days free. No card, nothing to install.',
        fwdTitle: 'Or just forward one real request to', fwdCopy: 'Copy', fwdCopied: 'Copied',
        cardTitle: 'One quotation request in seconds',
        cardHuman: 'Human', cardTool: 'Logispot', cardUnit: 'sec',
        cardR1: 'Calculates dimensions', cardR2: 'Collects and compares rates', cardR3: 'Writes emails to clients and agents',
        cardTotal: 'Total per request', cardDelta: '90% less time', cardNote: 'Real numbers from <a href="https://deliverymanager.biz/en/" target="_blank" rel="noopener" style="color:#8FE0A6;font-weight:600;text-decoration:underline;">Delivery Manager</a>.'
      },
      how: {
        eyebrow: 'HOW IT WORKS',
        title: 'You forward the email. Nothing to fill in manually.',
        sub: 'Two screens are the whole product.',
        beforeLabel: 'The email, as it arrived',
        afterLabel: 'The shipment, 5 seconds later',
        beforeShot: 'static/img/shots/01-email.png',
        afterShot: 'static/img/shots/02-request.png',
        pairCap: 'A Chinese address translated, dimensions mixed in with weights and “do not stack” buried mid-line — out come three clean cargo rows, with the non-stackable flag on the right piece.',
        ratesTitle: 'Agent replies with rates land in one table',
        ratesText: "The agent writes back in plain text, as always — top left. Freight, AWB fee, terminal, customs, pickup and commission come out as rows with currency, margin and selling price calculated, and the client's offer is written next to them.",
        ratesShot: 'static/img/shots/04-rates.png',
        agentLabel: "The agent's reply, as it arrived",
        enlarge: 'Enlarge'
      },
      control: {
        eyebrow: "YOU STAY IN CONTROL", title: "Logispot prepares. Your team decides.",
        items: [
          "Nothing goes out without your click — not to the client, not to the agent.",
          "Every recognised field stays editable, and the totals recalculate as you correct them.",
          "Where the recognition is unsure, it says so instead of guessing."
        ],
        foot: "A fast first draft, not an autopilot."
      },
      who: {
        eyebrow: 'WHO IT IS FOR',
        title: 'If your team gets a couple of requests a week, this is not for you.',
        sub: 'The gain grows in direct proportion to the number of people who quote every day. Nothing else.',
        yesTitle: 'This is for you if',
        yes: [
          'You are an international freight forwarder with 3 to 30 people.',
          'At least a few of them quote every day.',
          'You handle air freight, LCL or LTL — shipments that actually need calculating.',
          'You consolidate several shipments in one MAWB or FCL / FTL.'
        ],
        noTitle: 'This is not for you if',
        no: [
          'Your team gets a couple of requests a week.',
          'You only move full containers where the shipper does the loading plan.',
          'The subscription will not pay for itself at your volume.'
        ]
      },
      numbers: {
        eyebrow: 'MEASURED, NOT PROMISED',
        title: '16 minutes saved on every request, measured in our own forwarding company.',
        sub: 'Measured over half a month across three people on the pricing desk at <a href="https://deliverymanager.biz/en/" target="_blank" rel="noopener" style="color:#3F8353;font-weight:600;text-decoration:underline;">Delivery Manager</a>, counting only where the recognition actually worked. Put your own volume in and see what it comes to.',
        calc: {
          title: 'How many quotation requests does your team handle a day?',
          sub: 'Move the slider to your daily volume.',
          unit: 'requests a day',
          hours: 'Hours given back per month', money: 'That time in money', cost: 'Logispot', net: 'Net gain per month',
          seats: 'seats', seatOne: 'seat', hUnit: 'h',
          note: "Not counted: the mailouts to agents, recalculation when weights change, automatic statuses, and the hours no longer spent digging through the mailbox."
        }
      },
      reject: {
        eyebrow: 'EXTRA ADVANTAGES',
        title: 'Full RFQ statistics, with no extra work.',
        sub: 'Who keeps asking, who actually buys — and the client\'s own words when they said no.',
        items: [
          'Works from your first month. No historical data needed.',
          "Nothing to fill in — it reads your team's mailboxes.",
          'See the client, the request and their own words on why they said no.'
        ],
        shot: 'static/img/shots/05-statuses.png',
        cap: "Statuses set themselves from the mailbox — the reason and the client's own words are kept next to each one."
      },
      founder: {
        eyebrow: 'WHO BUILT THIS',
        title: 'I own a forwarding company. I built this for my own team first.',
        paras: [
          'I have run an international forwarding company for more than 10 years. My team quotes air, LCL and road every day, and I watched them retype the same cargo lines from an email into a spreadsheet, then into a letter to an agent, then into an offer for the client.',
          'So we built Logispot for ourselves. It runs in our operations every day — the numbers on this page are ours, taken from our own mailboxes.',
          'If it does not fit how you work, I would rather tell you that than sell you a seat.'
        ],
        sign: 'Nikita, founder — Logispot',
        signSub: 'Owner of <a href="https://deliverymanager.biz/en/" target="_blank" rel="noopener" style="color:#3F8353;font-weight:600;text-decoration:underline;">Delivery Manager</a>, a working freight forwarding company',
        placeholder: 'Draft text — replace with your own three or four lines.'
      },
      pricing: {
        eyebrow: 'PRICE',
        title: 'Start with 14 days free. Then 1,900 ₽ + VAT per seat, per month.',
        sub: 'Everything included. No request limits.',
        plan: 'Per seat', price: '14 days free', priceOld: '1 900 ₽', per: 'then 1,900 ₽ + 22% VAT / seat / month',
        features: [
          'Everything included — no request limits, no token limits.',
          'Mailbox reading, forwarding addresses and team work on every seat.',
          'All modes: air, sea FCL/LCL, road FTL/LTL, rail. 3D load planning and consolidation splits included.',
          'Free view-only seats for the owner and the sales team — they see the rejection report and statuses, but do not work on requests.'
        ],
        api: 'API integration with your own system: we set it up and support it — write to the same address.',
        cta: 'Start free trial', fwdLabel: 'Or forward an RFQ to', mail: 'hello@logispotio.ru', copy: 'Copy', copied: 'Copied',
        fine: 'Fair use policy. Unusual volumes are discussed separately.'
      },
      faq: {
        eyebrow: 'BEFORE YOU SIGN UP',
        title: 'Straight answers',
        items: [
          { q: 'What exactly do you access in my mailbox, and what do you not?', a: 'Forwarding an email is enough on its own — nothing else is touched. If you do connect a mailbox, Logispot reads the replies to your own requests only: agent rates and client answers. It stops reading the moment a request becomes an order, so the correspondence that follows a booking is never scanned. Your contacts are not copied out, and nothing is sent to anyone.' },
          { q: 'Where is the data stored?', a: 'On servers in Russia. You can export everything at any time and ask for full deletion. Your data is never used to train models.' },
          { q: "What happens to my clients' data?", a: 'It stays yours. Personal data recognition can be switched off in settings — then Logispot reads only services, dimensions and routes and ignores personal information entirely. When an employee is deactivated, their access and forwarding address stop the same second, while their requests, rates and correspondence stay with the company.' },
          { q: 'Which languages does the recognition handle?', a: 'The ones your agents actually write in — including Chinese, Turkish, Arabic, Serbian, Russian and the European languages. It reads text, pdf, docx and xlsx attachments, and photographs or screenshots of documents.' }
        ]
      },
      cta: {
        title: 'Forward any request to hello@logispotio.ru',
        sub: "Any real one, as it came in — attachments and all. We'll send back the structured shipment Logispot made of it. No account, nothing to install.",
        mail: 'hello@logispotio.ru', button: 'Copy the address', copied: 'Copied', secondary: 'Start free trial'
      },
      footer: {
        tagline: 'No more manual routine.',
        product: 'Product', company: 'Company', connect: 'Connect',
        terms: 'Public offer (RU)', privacy: 'Personal data policy (RU)', consent: 'Data processing consent (RU)', dpa: 'Data processing instruction (RU)', rights: '© 2026 Delivery Manager LLC (ООО «Менеджер Доставки») · INN 7453347099 · OGRN 1227400021573',
        try: 'Create an account'
      }
    },

    /* Full translations; image paths and mail address inherit from EN. */
    RU: {
          "nav": {
                "how": "Как это работает",
                "who": "Кому подходит",
                "numbers": "Цифры",
                "pricing": "Цена",
                "signin": "Войти"
          },
          "hero": {
                "eyebrow": "ДЛЯ ЭКСПЕДИТОРОВ, КОТОРЫЕ СЧИТАЮТ КАЖДЫЙ ДЕНЬ",
                "lead": "Каждый запрос — на 16 минут быстрее.",
                "accent": "В 10 раз больше расчётов той же командой.",
                "bullets": [
       "Создаёт заявку прямо из почты — pdf, xlsx, фото.",
       "Считает габариты и ставки за секунды.",
       "Готовит письмо агентам — отправляете вы.",
       "Собирает ответы клиентов и растит продажи.",
       "Заполняет CRM или TMS — одной системой меньше."
      ],
                "cta": "Начать бесплатно",
                "ctaNote": "14 дней бесплатно. Без карты и без установки.",
                "fwdTitle": "Или просто перешлите один реальный запрос на",
                "fwdCopy": "Копировать",
                "fwdCopied": "Скопировано",
                "cardTitle": "Один запрос — за секунды",
                "cardHuman": "Человек",
                "cardTool": "Logispot",
                "cardUnit": "сек",
                "cardR1": "Считает габариты",
                "cardR2": "Собирает и сравнивает ставки",
                "cardR3": "Пишет письма клиентам и агентам",
                "cardTotal": "Итого на запрос",
                "cardDelta": "На 90% меньше времени",
                "cardNote": "Реальные цифры <a href=\"https://deliverymanager.biz/\" target=\"_blank\" rel=\"noopener\" style=\"color:#8FE0A6;font-weight:600;text-decoration:underline;\">ООО «Менеджер Доставки»</a>."
          },
          "how": {
                "eyebrow": "КАК ЭТО РАБОТАЕТ",
                "title": "Вы пересылаете письмо. Заполнять руками нечего.",
                "sub": "Два экрана — это весь продукт.",
                "beforeLabel": "Письмо, как оно пришло",
                "afterLabel": "Отправка, через 5 секунд",
                "pairCap": "Китайский адрес переведён, габариты вперемешку с весами и «do not stack» посреди строки — на выходе три чистые грузовые строки с признаком «не штабелировать» у нужного места.",
                "ratesTitle": "Ответы агентов со ставками попадают в одну таблицу",
                "ratesText": "Агент пишет обычным текстом, как всегда — слева вверху. Фрахт, AWB, терминал, таможня, забор и комиссия превращаются в строки с валютой, маржой и ценой продажи, а рядом уже готово предложение клиенту.",
                "agentLabel": "Ответ агента, как он пришёл",
                "enlarge": "Увеличить"
          },
          "control": {
                "eyebrow": "КОНТРОЛЬ ОСТАЁТСЯ ЗА ЧЕЛОВЕКОМ",
                "title": "Logispot готовит. Решает ваша команда.",
                "items": [
                      "Ничего не уходит без вашего клика — ни клиенту, ни агенту.",
                      "Любое распознанное поле можно поправить, итоги пересчитываются сразу.",
                      "Там, где распознавание не уверено, оно так и пишет, а не додумывает."
                ],
                "foot": "Это быстрый черновик, а не автопилот."
          },
          "who": {
                "eyebrow": "КОМУ ПОДХОДИТ",
                "title": "Если у команды пара запросов в неделю — это не для вас.",
                "sub": "Польза растёт пропорционально числу людей, которые считают запросы каждый день. Больше ни от чего.",
                "yesTitle": "Это для вас, если",
                "yes": [
                      "Вы международный экспедитор, в компании от 3 до 30 человек.",
                      "Хотя бы несколько из них считают запросы каждый день.",
                      "Вы возите авиа, LCL или сборные грузы — то, что действительно нужно считать.",
                      "Вы консолидируете несколько отправок в один MAWB или FCL / FTL."
                ],
                "noTitle": "Это не для вас, если",
                "no": [
                      "У команды пара запросов в неделю.",
                      "Вы возите только полные контейнеры, а план загрузки делает отправитель.",
                      "На вашем объёме подписка себя не окупит."
                ]
          },
          "numbers": {
                "eyebrow": "ИЗМЕРЕНО, А НЕ ОБЕЩАНО",
                "title": "16 минут экономии на каждом запросе — замер в нашей собственной экспедиторской компании.",
                "sub": "Замеряли полмесяца на трёх логистах в <a href=\"https://deliverymanager.biz/\" target=\"_blank\" rel=\"noopener\" style=\"color:#3F8353;font-weight:600;text-decoration:underline;\">ООО «Менеджер Доставки»</a>, считали только там, где распознавание реально сработало. Подставьте свой объём.",
                "calc": {
                      "title": "Сколько запросов ваша команда обрабатывает в день?",
                      "sub": "Поставьте ползунок на свой объём в день.",
                      "unit": "запросов в день",
                      "hours": "Часов возвращается в месяц",
                      "money": "Это время в деньгах",
                      "cost": "Logispot",
                      "net": "Чистая выгода в месяц",
                      "seats": "мест",
                      "seatFew": "места",
                      "seatOne": "место",
                      "hUnit": "ч",
                      "note": "Не посчитано: рассылки агентам, пересчёт при изменении весов, автоматические статусы и часы, которые больше не уходят на раскопки в почте."
                }
          },
          "reject": {
                "eyebrow": "ДОПОЛНИТЕЛЬНЫЕ ВОЗМОЖНОСТИ",
                "title": "Полная статистика по запросам — без лишней работы.",
                "sub": "Кто запрашивает постоянно, кто реально заказывает — и слова клиента при отказе.",
                "items": [
                      "Работает с первого месяца. Историю грузить не нужно.",
                      "Заполнять нечего — система читает почту ваших логистов.",
                      "Видно клиента, запрос и его собственные слова об отказе."
                ],
                "cap": "Статусы проставляются сами из почты — рядом остаются причина и слова клиента."
          },
          "founder": {
                "eyebrow": "КТО ЭТО СДЕЛАЛ",
                "title": "У меня своя экспедиторская компания. Я сделал это сначала для своих логистов.",
                "paras": [
                      "Я больше 10 лет управляю международной экспедиторской компанией. Моя команда каждый день считает авиа, LCL и автоперевозки, и я видел, как одни и те же грузовые строки перебивают из письма в таблицу, потом в письмо агенту, потом в предложение клиенту.",
                      "Поэтому мы сделали Logispot для себя. Он работает в наших операциях каждый день — цифры на этой странице наши, из наших собственных почтовых ящиков.",
                      "Если это не подходит под то, как вы работаете, я лучше скажу об этом прямо, чем продам вам место."
                ],
                "sign": "Никита, основатель — Logispot",
                "signSub": "Владелец <a href=\"https://deliverymanager.biz/\" target=\"_blank\" rel=\"noopener\" style=\"color:#3F8353;font-weight:600;text-decoration:underline;\">ООО «Менеджер Доставки»</a>, действующей экспедиторской компании"
          },
          "pricing": {
                "eyebrow": "ЦЕНА",
                "title": "Начните с 14 дней бесплатно. Дальше 1 900 ₽ + НДС за место в месяц.",
                "sub": "Всё включено. Без лимитов на количество запросов.",
                "plan": "За место",
                "price": "14 дней бесплатно",
                "priceOld": "1 900 ₽",
                "per": "затем 1 900 ₽ + НДС 22% / место / месяц",
                "features": [
                      "Всё включено — без лимитов на запросы и без лимитов на токены.",
                      "Чтение почты, адреса для пересылки и командная работа на каждом месте.",
                      "Все виды перевозок: авиа, море FCL/LCL, авто FTL/LTL, ж/д. 3D-планирование загрузки и разбивка консолидаций включены.",
                      "Бесплатные места «только просмотр» для владельца и отдела продаж — они видят отчёт по отказам и статусы, но не работают с запросами."
                ],
                "api": "Интеграция по API с вашей системой: настроим и будем поддерживать — напишите на тот же адрес.",
                "cta": "Начать бесплатно",
                "fwdLabel": "Или перешлите запрос на",
                "copy": "Копировать",
                "copied": "Скопировано",
                "fine": "Политика разумного использования. Необычные объёмы обсуждаем отдельно."
          },
          "faq": {
                "eyebrow": "ПЕРЕД РЕГИСТРАЦИЕЙ",
                "title": "Прямые ответы",
                "items": [
                      {
                            "q": "К чему именно вы получаете доступ в моей почте, а к чему — нет?",
                            "a": "Переслать письмо достаточно само по себе — больше ничего не затрагивается. Если вы подключите ящик, Logispot читает только ответы на ваши собственные запросы: ставки агентов и ответы клиентов. Чтение прекращается в тот момент, когда запрос становится заказом, поэтому переписка после букинга не сканируется. Контакты не выгружаются, никому ничего не отправляется."
                      },
                      {
                            "q": "Где хранятся данные?",
                            "a": "На серверах в России. Вы можете в любой момент выгрузить всё и запросить полное удаление. Ваши данные никогда не используются для обучения моделей."
                      },
                      {
                            "q": "Что происходит с данными моих клиентов?",
                            "a": "Они остаются вашими. Распознавание персональных данных отключается в настройках — тогда Logispot читает только услуги, габариты и маршруты. При деактивации сотрудника его доступ и адрес пересылки отключаются в ту же секунду, а запросы, ставки и переписка остаются у компании."
                      },
                      {
                            "q": "Какие языки понимает распознавание?",
                            "a": "Те, на которых реально пишут ваши агенты — включая китайский, турецкий, арабский, сербский, русский и европейские языки. Читает текст, вложения pdf, docx и xlsx, а также фотографии и скриншоты документов."
                      }
                ]
          },
          "cta": {
                "title": "Перешлите любой запрос на hello@logispotio.ru",
                "sub": "Любой реальный, как он пришёл — со всеми вложениями. Мы вернём структурированную отправку, которую из него сделал Logispot. Без аккаунта и без установки.",
                "button": "Скопировать адрес",
                "copied": "Скопировано",
                "secondary": "Начать бесплатно"
          },
          "footer": {
                "tagline": "Никакой ручной рутины.",
                "product": "Продукт",
                "company": "Компания",
                "connect": "Контакты",
                "terms": "Публичная оферта",
                "privacy": "Политика обработки персональных данных",
                "consent": "Согласие на обработку ПД",
                "dpa": "Поручение на обработку ПД",
                "rights": "© 2026 ООО «Менеджер Доставки» · ИНН 7453347099 · ОГРН 1227400021573",
                "try": "Создать аккаунт"
          }
    },
  };

  /* deep-merge each locale over EN so a partial locale still renders */
  function merge(base, over) {
    if (Object.prototype.toString.call(base) !== '[object Object]') return over === undefined ? base : over;
    var out = {}, k;
    for (k in base) out[k] = base[k];
    if (!over) return out;
    for (k in over) {
      out[k] = (Object.prototype.toString.call(out[k]) === '[object Object]') ? merge(out[k], over[k]) : over[k];
    }
    return out;
  }
  function T() { return state.lang === 'EN' ? CONTENT.EN : merge(CONTENT.EN, CONTENT[state.lang]); }

  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- view ---------- */
  var langBtnStyle = 'display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#D6DBE0;font-size:13px;font-weight:600;padding:8px 11px;border-radius:9px;cursor:pointer;';
  var eyebrowLight = 'font-size:12.5px;font-weight:700;letter-spacing:0.09em;color:#4C9A63;margin-bottom:14px;';

  function view(t) {
    return '' +
    '<div id="top">' +
      nav(t) +
      hero(t) +
      main(t) +
      ctaBand(t) +
      footer(t) +
    '</div>';
  }

  function nav(t) {
    var links = ['how', 'who', 'numbers', 'pricing'].map(function (k) {
      return '<a href="#' + k + '" class="lp-nav-link" style="font-size:14px;color:#B8BFC7;font-weight:500;">' + t.nav[k] + '</a>';
    }).join('');
    var mLinks = ['how', 'who', 'numbers', 'pricing'].map(function (k) {
      return '<a href="#' + k + '" data-mnav style="display:block;font-size:15px;color:#D6DBE0;font-weight:500;padding:11px 12px;border-radius:9px;">' + t.nav[k] + '</a>';
    }).join('');
    var menu = LANGS.map(function (l) {
      return '<a href="' + langHref(l.code) + '" hreflang="' + l.code.toLowerCase() + '" data-lang="' + l.code + '" style="display:flex;align-items:center;justify-content:space-between;width:100%;color:#D6DBE0;font-size:13.5px;font-weight:500;padding:9px 10px;border-radius:8px;text-align:left;">' +
        l.name + '<span style="color:#5FBE7C;">' + (l.code === state.lang ? '✓' : '') + '</span></a>';
    }).join('');
    return '<nav style="position:sticky;top:14px;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:0 clamp(12px,3vw,32px) -60px;padding:12px clamp(16px,3vw,28px);background:rgba(20,26,22,0.38);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);border:1px solid rgba(95,190,124,0.16);border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.25);">' +
      '<a href="./" style="display:flex;align-items:center;gap:11px;">' + LOGO_IMG_NAV + '</a>' +
      '<div class="lp-nav-links" style="display:flex;align-items:center;gap:28px;flex-wrap:wrap;">' + links + '</div>' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<div style="position:relative;">' +
          '<button id="langBtn" style="' + langBtnStyle + '"><span style="width:7px;height:7px;border-radius:50%;background:#5FBE7C;"></span>' + state.lang + '<span style="opacity:.6;font-size:10px;">▾</span></button>' +
          '<div id="langMenu" style="display:none;position:absolute;top:calc(100% + 8px);left:0;right:auto;background:#14181D;border:1px solid rgba(255,255,255,0.1);border-radius:11px;padding:6px;min-width:150px;box-shadow:0 18px 40px rgba(0,0,0,0.5);z-index:80;">' + menu + '</div>' +
        '</div>' +
        '<a href="' + SIGNIN_URL + '" class="lp-btn-secondary" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.16);color:#E9ECEF;font-size:14px;font-weight:600;padding:8px 16px;border-radius:9px;">' + t.nav.signin + '</a>' +
        '<button id="burgerBtn" class="lp-burger" aria-label="Menu" aria-expanded="false" style="display:none;align-items:center;justify-content:center;width:38px;height:36px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9px;cursor:pointer;color:#D6DBE0;">' + burgerIcon + '</button>' +
      '</div>' +
      '<div id="navMobile" style="display:none;position:absolute;top:calc(100% + 8px);left:0;right:0;background:#14181D;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:8px;box-shadow:0 18px 40px rgba(0,0,0,0.5);z-index:70;">' + mLinks + '</div>' +
    '</nav>';
  }

  function hero(t) {
    return '<header class="lp-hero" style="position:relative;min-height:100svh;display:grid;align-content:center;padding:clamp(72px,10vh,150px) clamp(16px,4vw,44px) clamp(24px,4vh,90px);">' +
      '<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">' +
        '<div style="position:absolute;top:-15%;right:-5%;width:60vw;height:60vw;max-width:820px;max-height:820px;background:radial-gradient(circle,rgba(95,190,124,0.20),transparent 62%);filter:blur(20px);"></div>' +
        '<div style="position:absolute;bottom:-12%;left:-8%;width:48vw;height:48vw;max-width:560px;max-height:560px;background:radial-gradient(circle,rgba(95,190,124,0.09),transparent 66%);filter:blur(30px);"></div>' +
      '</div>' +
      '<div id="lp-hero-3d" style="position:absolute;inset:0;z-index:1;pointer-events:none;"></div>' +
      '<div style="position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(11,13,16,0.34) 0%,rgba(11,13,16,0.2) 42%,rgba(11,13,16,0) 68%);"></div>' +
      '<div style="position:relative;z-index:2;width:100%;max-width:1280px;margin:0 auto;display:flex;align-items:center;gap:clamp(24px,3.5vw,72px);flex-wrap:wrap;">' +
        '<div style="flex:1 1 420px;min-width:min(100%,340px);">' +
          '<div style="font-size:11.5px;font-weight:700;letter-spacing:0.1em;color:#8FE0A6;margin:0 0 clamp(14px,3vh,34px);">' + t.hero.eyebrow + '</div>' +
          '<h1 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(28px,3.6vw,56px);line-height:1.06;font-weight:700;letter-spacing:-0.02em;margin:0 0 clamp(13px,2vh,22px);color:#fff;max-width:13em;text-shadow:0 1px 14px rgba(6,10,14,0.55);">' + t.hero.lead + '</h1>' +
          '<p style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(18px,2vw,30px);line-height:1.25;font-weight:600;color:#5FBE7C;margin:0 0 clamp(20px,3.4vh,54px);text-shadow:0 1px 14px rgba(6,10,14,0.55);">' + t.hero.accent + '</p>' +
          heroBullets(t) +
          '<div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap;">' +
          '<a href="' + APP_URL + '" class="lp-btn-primary" style="display:inline-flex;align-items:center;gap:9px;background:#5FBE7C;color:#08130C;font-size:16px;font-weight:600;padding:15px 28px;border-radius:11px;box-shadow:0 14px 34px rgba(95,190,124,0.28);">' + t.hero.cta + arrowIcon + '</a>' +
          '<span style="font-size:13px;color:#8B939B;">' + t.hero.ctaNote + '</span>' +
          '</div>' + heroForward(t) +
        '</div>' +
        '<div class="lp-hero-slot" style="flex:1 1 380px;min-width:min(100%,300px);position:relative;min-height:clamp(340px,40vw,520px);">' +
          heroCard(t) +
        '</div>' +
      '</div>' +
    '</header>';
  }

  function heroBullets(t) {
    var items = (t.hero.bullets || []).map(function (b) {
      return '<li style="display:flex;gap:10px;align-items:flex-start;font-size:clamp(15px,1.15vw,17.5px);line-height:1.4;color:#C6CCD3;text-shadow:0 1px 10px rgba(6,10,14,0.5);">' +
        '<span style="flex:0 0 auto;margin-top:6px;width:5px;height:5px;border-radius:50%;background:#5FBE7C;"></span><span>' + b + '</span></li>';
    }).join('');
    return '<ul style="list-style:none;padding:0;margin:0 0 clamp(22px,3.6vh,58px);max-width:min(100%,540px);display:flex;flex-direction:column;gap:clamp(8px,1.4vh,19px);">' + items + '</ul>';
  }

  function heroForward(t) {
    return '<div style="margin-top:clamp(14px,2.2vh,34px);display:flex;align-items:center;gap:13px;flex-wrap:wrap;">' +
      '<span style="font-size:13px;color:#8B939B;">' + t.hero.fwdTitle + '</span>' +
      '<button type="button" data-copy-mail="hello@logispotio.ru" data-copied-label="' + t.hero.fwdCopied + '" style="display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.16);border-radius:9px;padding:7px 11px;cursor:pointer;font-family:inherit;color:#E9ECEF;">' +
        '<span style="font-family:monospace;font-size:13.5px;color:#8FE0A6;">hello@logispotio.ru</span>' +
        '<span data-copy-label style="font-size:12px;font-weight:600;opacity:0.62;">' + t.hero.fwdCopy + '</span>' +
      '</button></div>';
  }

  function heroCard(t) {
    var rows = [[t.hero.cardR1, 300, 30], [t.hero.cardR2, 600, 60], [t.hero.cardR3, 180, 18]];
    var body = rows.map(function (r) {
      return '<div style="display:grid;grid-template-columns:1fr 62px 62px;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.07);">' +
        '<div style="font-size:12.5px;line-height:1.3;color:#C6CCD3;">' + r[0] + '</div>' +
        '<div style="text-align:right;font-family:monospace;font-size:14px;color:#E68A7A;">' + r[1] + '</div>' +
        '<div style="text-align:right;font-family:monospace;font-size:14px;font-weight:700;color:#8FE0A6;">' + r[2] + '</div>' +
      '</div>';
    }).join('');
    return '<div class="lp-hero-card" style="position:absolute;right:0;bottom:2%;width:min(94%,400px);background:rgba(16,20,25,0.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:18px 19px;box-shadow:0 30px 64px rgba(0,0,0,0.6);animation:lpfloat 6s ease-in-out infinite;">' +
      '<div style="display:flex;align-items:center;gap:9px;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,0.09);"><span style="width:8px;height:8px;border-radius:50%;background:#5FBE7C;animation:lppulse 2s ease-in-out infinite;"></span><span style="font-size:12px;font-weight:700;color:#fff;">' + t.hero.cardTitle + '</span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 62px 62px;gap:8px;padding:11px 0 7px;font-size:10px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#6E7883;">' +
        '<div>' + t.hero.cardUnit + '</div><div style="text-align:right;">' + t.hero.cardHuman + '</div><div style="text-align:right;color:#8FE0A6;">' + t.hero.cardTool + '</div>' +
      '</div>' +
      body +
      '<div style="display:grid;grid-template-columns:1fr 62px 62px;align-items:center;gap:8px;padding:12px 0 4px;">' +
        '<div style="font-size:12.5px;font-weight:700;color:#fff;">' + t.hero.cardTotal + '</div>' +
        '<div style="text-align:right;font-family:monospace;font-size:15px;font-weight:700;color:#E68A7A;">1080</div>' +
        '<div style="text-align:right;font-family:monospace;font-size:15px;font-weight:700;color:#8FE0A6;">108</div>' +
      '</div>' +
      '<div style="margin-top:12px;padding:9px 12px;border-radius:9px;background:rgba(95,190,124,0.14);font-size:12.5px;font-weight:700;color:#8FE0A6;text-align:center;">' + t.hero.cardDelta + '</div>' +
      '<div style="margin-top:10px;font-size:12px;line-height:1.4;color:#9AA3AD;text-align:center;">' + t.hero.cardNote + '</div>' +
    '</div>';
  }

  function centeredHead(eyebrow, title, sub, maxw, light) {
    var color = light ? '#8FE0A6' : '#4C9A63';
    var titleColor = light ? '#fff' : '#14171B';
    return '<div data-reveal style="text-align:center;max-width:' + (maxw || 720) + 'px;margin:0 auto 44px;">' +
      '<div style="font-size:12.5px;font-weight:700;letter-spacing:0.09em;color:' + color + ';margin-bottom:14px;">' + eyebrow + '</div>' +
      '<h2 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(28px,4vw,44px);line-height:1.1;font-weight:700;letter-spacing:-0.015em;margin:0 0 ' + (sub ? '16px' : '0') + ';color:' + titleColor + ';text-wrap:pretty;">' + title + '</h2>' +
      (sub ? '<p style="font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:' + (light ? '#A9B6AD' : '#6B7280') + ';margin:0;">' + sub + '</p>' : '') +
    '</div>';
  }

  function main(t) {
    return '<main style="position:relative;background:#F5F6F7;border-radius:34px 34px 0 0;margin-top:8px;padding:clamp(56px,8vw,100px) clamp(16px,4vw,44px) clamp(40px,6vw,72px);color:#14171B;">' +
      how(t) + control(t) + who(t) + numbers(t) + reject(t) + founder(t) + pricing(t) + faq(t) +
    '</main>';
  }

  /* --- 2. how it works: one before/after pair + the rates composite --- */
  function how(t) {
    var h = t.how;
    var lab = 'font-size:12.5px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6B7280;margin-bottom:10px;';
    var frame = function (ratio, light) {
      return 'border-radius:16px;overflow:hidden;border:1.5px solid ' + (light ? '#DCE1E6' : '#BEDFCA') + ';background:#fff;aspect-ratio:' + ratio + ';cursor:zoom-in;position:relative;';
    };
    var badge = '<span style="position:absolute;right:10px;bottom:10px;display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:8px;background:rgba(8,12,16,0.72);color:#D7DDE3;font-size:11.5px;font-weight:600;pointer-events:none;">' + zoomIcon + (h.enlarge || 'Enlarge') + '</span>';
    var img = function (src, alt) {
      src = BASE + src;
      return '<img src="' + src + '" alt="' + escAttr(alt) + '" loading="lazy" data-zoom="' + src + '" style="width:100%;height:100%;display:block;object-fit:contain;object-position:center;">' + badge;
    };
    return '<section id="how" style="max-width:1120px;margin:0 auto;scroll-margin-top:88px;">' +
      centeredHead(h.eyebrow, h.title, h.sub, 760) +
      '<div data-reveal style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:20px;align-items:stretch;">' +
        '<div><div style="' + lab + '">' + h.beforeLabel + '</div><div style="' + frame('2/1', true) + '">' + img(h.beforeShot, h.beforeLabel) + '</div></div>' +
        '<div><div style="' + lab + 'color:#3F8353;">' + h.afterLabel + '</div><div style="' + frame('2/1') + '">' + img(h.afterShot, h.afterLabel) + '</div></div>' +
      '</div>' +
      '<div data-reveal style="font-size:14px;line-height:1.55;color:#7A838D;margin-top:14px;max-width:820px;">' + h.pairCap + '</div>' +
      '<div data-reveal style="margin-top:clamp(40px,5vw,64px);max-width:820px;">' +
        '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(19px,2.2vw,24px);font-weight:700;letter-spacing:-0.01em;color:#14171B;margin-bottom:10px;">' + h.ratesTitle + '</div>' +
        '<div style="font-size:15.5px;line-height:1.6;color:#5A6570;">' + h.ratesText + '</div>' +
      '</div>' +
      '<div data-reveal style="' + frame('2764/1340') + 'background:#F0F2F4;margin-top:18px;">' +
        '<img src="' + BASE + h.ratesShot + '" alt="' + escAttr(h.ratesTitle) + '" loading="lazy" data-zoom="' + BASE + h.ratesShot + '" style="width:100%;height:100%;display:block;object-fit:contain;">' + badge +
      '</div>' +
    '</section>';
  }

  /* --- 2b. the human stays in the loop --- */
  function control(t) {
    var c = t.control;
    var items = c.items.map(function (x) {
      return '<div style="display:flex;gap:12px;align-items:flex-start;font-size:15.5px;line-height:1.55;color:#22432F;">' +
        '<span style="flex:none;width:22px;height:22px;border-radius:7px;background:#DFF3E4;border:1px solid #C9E9D1;display:flex;align-items:center;justify-content:center;color:#3F8353;margin-top:1px;">' + check(12, 2.6) + '</span>' + x + '</div>';
    }).join('');
    return '<section id="control" style="max-width:1120px;margin:clamp(48px,6vw,84px) auto 0;scroll-margin-top:88px;">' +
      '<div data-reveal style="background:#EAF6ED;border:1px solid #C9E4D2;border-radius:22px;padding:clamp(26px,3.4vw,40px);">' +
        '<div style="font-size:12.5px;font-weight:700;letter-spacing:0.09em;color:#3F8353;margin-bottom:12px;">' + c.eyebrow + '</div>' +
        '<h2 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(23px,3vw,32px);line-height:1.14;font-weight:700;letter-spacing:-0.015em;margin:0 0 26px;color:#14171B;text-wrap:pretty;">' + c.title + '</h2>' +
        '<div class="lp-tri-lead" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;">' + items + '</div>' +
        '<div style="margin-top:24px;padding-top:18px;border-top:1px solid #C9E4D2;font-size:15px;font-weight:600;color:#3F8353;">' + c.foot + '</div>' +
      '</div></section>';
  }

  /* --- 3. who it is for, who it is not --- */
  function who(t) {
    var col = function (title, items, yes) {
      return '<div data-reveal class="lp-card" style="background:' + (yes ? '#F4FAF6' : '#fff') + ';border:1px solid ' + (yes ? '#BEDFCA' : '#E4E7EA') + ';border-radius:20px;padding:clamp(26px,3vw,34px);box-shadow:0 1px 2px rgba(16,24,32,0.05);">' +
        '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:19px;font-weight:700;color:#14171B;margin-bottom:20px;">' + title + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:14px;">' +
          items.map(function (x) {
            return '<div style="display:flex;gap:12px;align-items:flex-start;font-size:15.5px;line-height:1.55;color:' + (yes ? '#3A4048' : '#6B7280') + ';">' +
              '<span style="flex:none;width:22px;height:22px;border-radius:7px;background:' + (yes ? '#DFF3E4' : '#F1F3F5') + ';border:1px solid ' + (yes ? '#C9E9D1' : '#E4E7EA') + ';display:flex;align-items:center;justify-content:center;color:' + (yes ? '#3F8353' : '#98A1AA') + ';margin-top:1px;">' + (yes ? check(12, 2.6) : cross(11, 2.4)) + '</span>' + x + '</div>';
          }).join('') +
        '</div></div>';
    };
    return '<section id="who" style="max-width:1120px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      centeredHead(t.who.eyebrow, t.who.title, t.who.sub, 780) +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;">' +
        col(t.who.yesTitle, t.who.yes, true) + col(t.who.noTitle, t.who.no, false) +
      '</div></section>';
  }

  /* --- 4. one question, one calculator --- */
  function numbers(t) {
    var n = t.numbers, c = n.calc;
    var out = function (id, accent) {
      return '<div style="min-width:0;">' +
        '<div data-out-label="' + id + '" style="font-size:12.5px;font-weight:600;color:' + (accent ? 'rgba(255,255,255,0.72)' : '#6B7280') + ';margin-bottom:6px;">' + escAttr(c[id]) + '</div>' +
        '<div data-out="' + id + '" style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(22px,2.6vw,30px);font-weight:700;letter-spacing:-0.01em;color:' + (accent ? '#fff' : '#14171B') + ';line-height:1.1;">\u2014</div></div>';
    };
    return '<section id="numbers" style="max-width:1120px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      centeredHead(n.eyebrow, n.title, n.sub, 800) +
      '<div data-reveal data-calc-box class="lp-card" style="max-width:860px;margin:0 auto;background:#fff;border:1px solid #E4E7EA;border-radius:22px;padding:clamp(24px,3.4vw,38px);box-shadow:0 1px 2px rgba(16,24,32,0.05);">' +
        '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(18px,2.2vw,23px);font-weight:700;letter-spacing:-0.01em;line-height:1.25;margin-bottom:6px;color:#14171B;">' + escAttr(c.title) + '</div>' +
        '<div style="font-size:14px;line-height:1.55;color:#6B7280;margin-bottom:26px;">' + escAttr(c.sub) + '</div>' +
        '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:14px;">' +
          '<span data-out="perday" style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(44px,7vw,68px);font-weight:700;letter-spacing:-0.03em;line-height:1;color:#2E6B41;">20</span>' +
          '<span style="font-size:15px;font-weight:600;color:#6B7280;">' + escAttr(c.unit) + '</span>' +
        '</div>' +
        '<input type="range" data-calc="perday" min="0" max="22" step="1" value="10" class="lp-range" aria-label="' + escAttr(c.title) + '">' +
        '<div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:600;color:#9AA3AD;margin:8px 2px 26px;"><span>1</span><span>20</span><span>300</span></div>' +
        '<div style="display:grid;gap:14px;">' +
          '<div class="lp-calc-out" style="display:grid;gap:18px;background:#F4FAF6;border:1px solid #C9E4D2;border-radius:14px;padding:20px 22px;">' + out('hours') + out('money') + out('cost') + '</div>' +
          '<div style="background:#2E6B41;border-radius:14px;padding:20px 22px;">' + out('net', true) + '</div>' +
        '</div>' +
        '<div style="font-size:12px;line-height:1.6;color:#8A939C;margin-top:18px;">' + c.note + '</div>' +
      '</div>' +
    '</section>';
  }

  /* --- 5. rejection report --- */
  function reject(t) {
    var r = t.reject;
    return '<section id="reject" style="max-width:1120px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      centeredHead(r.eyebrow, r.title, r.sub, 760) +
      '<div data-reveal style="background:#14171B;border-radius:22px;padding:clamp(12px,1.4vw,18px);position:relative;">' +
        '<div style="border-radius:14px;overflow:hidden;background:#fff;aspect-ratio:1420/674;cursor:zoom-in;position:relative;">' +
          '<img src="' + BASE + r.shot + '" alt="' + escAttr(r.cap) + '" loading="lazy" data-zoom="' + BASE + r.shot + '" style="width:100%;height:100%;display:block;object-fit:contain;background:#fff;">' +
          '<span style="position:absolute;right:10px;bottom:10px;display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:8px;background:rgba(8,12,16,0.72);color:#D7DDE3;font-size:11.5px;font-weight:600;pointer-events:none;">' + zoomIcon + (t.how.enlarge || 'Enlarge') + '</span>' +
        '</div>' +
        '<div style="display:flex;gap:10px;align-items:baseline;font-size:13px;line-height:1.5;color:#8A939C;padding:12px 6px 4px;">' +
          '<span style="flex:none;width:6px;height:6px;border-radius:50%;background:#5FBE7C;transform:translateY(-3px);"></span>' + r.cap +
        '</div>' +
      '</div></section>';
  }

  /* --- 6. founder --- */
  function founder(t) {
    var f = t.founder;
    var paras = f.paras.map(function (p) {
      return '<p style="font-size:16px;line-height:1.7;color:#4F5B66;margin:0 0 14px;">' + p + '</p>';
    }).join('');
    return '<section id="founder" style="max-width:820px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      '<div data-reveal class="lp-card" style="background:#fff;border:1px solid #E4E7EA;border-radius:22px;padding:clamp(28px,4vw,44px);box-shadow:0 1px 2px rgba(16,24,32,0.05);">' +
        '<div style="' + eyebrowLight + '">' + f.eyebrow + '</div>' +
        '<h2 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(23px,3vw,32px);line-height:1.16;font-weight:700;letter-spacing:-0.015em;margin:0 0 20px;color:#14171B;text-wrap:pretty;">' + f.title + '</h2>' +
        paras +
        '<div style="display:flex;align-items:center;gap:14px;margin-top:24px;padding-top:22px;border-top:1px solid #E4E7EA;">' +
          '<img src="' + BASE + 'static/img/founder.png" alt="' + escAttr(f.sign) + '" loading="lazy" style="flex:none;width:56px;height:56px;border-radius:50%;object-fit:cover;background:#EAF6ED;">' +
          '<div><div style="font-size:15px;font-weight:600;color:#14171B;">' + f.sign + '</div>' +
          '<div style="font-size:13.5px;color:#7A838D;">' + f.signSub + '</div></div>' +
        '</div>' +
      '</div></section>';
  }

  /* --- 7. price --- */
  function pricing(t) {
    var p = t.pricing;
    var feats = p.features.map(function (x) {
      return '<div style="display:flex;gap:12px;align-items:flex-start;font-size:15.5px;line-height:1.55;color:#3A4048;">' +
        '<span style="flex:none;width:22px;height:22px;border-radius:7px;background:#DFF3E4;border:1px solid #C9E9D1;display:flex;align-items:center;justify-content:center;color:#3F8353;margin-top:1px;">' + check(12, 2.6) + '</span>' + x + '</div>';
    }).join('');
    return '<section id="pricing" style="max-width:1120px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      centeredHead(p.eyebrow, p.title, p.sub, 720) +
      '<div data-reveal style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:stretch;">' +
        '<div class="lp-card" style="background:#fff;border:1px solid #E4E7EA;border-radius:20px;padding:clamp(26px,3vw,34px);box-shadow:0 1px 2px rgba(16,24,32,0.05);display:flex;flex-direction:column;justify-content:center;gap:15px;">' + feats + '</div>' +
        '<div style="background:#14171B;border-radius:22px;display:flex;flex-direction:column;justify-content:center;padding:clamp(28px,4vw,40px);color:#fff;position:relative;overflow:hidden;box-shadow:0 30px 70px rgba(16,24,32,0.28);">' +
          '<div style="position:absolute;top:-40%;right:-20%;width:360px;height:360px;background:radial-gradient(circle,rgba(95,190,124,0.22),transparent 65%);"></div>' +
          '<div style="position:relative;">' +
            '<div style="display:inline-flex;padding:6px 13px;border-radius:999px;background:rgba(95,190,124,0.16);color:#8FE0A6;font-size:12px;font-weight:600;letter-spacing:0.04em;margin-bottom:20px;">' + p.plan + '</div>' +
            '<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;flex-wrap:wrap;">' +
              '<span style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(34px,4.4vw,46px);font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1;">' + p.price + '</span>' +
              '<span style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(22px,2.6vw,28px);font-weight:700;color:#E68A7A;text-decoration:line-through;text-decoration-thickness:2px;line-height:1;">' + p.priceOld + '</span></div>' +
            '<div style="font-size:15px;color:#9AA3AD;margin-bottom:22px;">' + p.per + '</div>' +
            '<a href="' + APP_URL + '" class="lp-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:9px;background:#5FBE7C;color:#08130C;font-size:15.5px;font-weight:600;padding:15px 24px;border-radius:12px;margin-bottom:12px;">' + p.cta + arrowIcon + '</a>' +
            '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;font-size:13.5px;color:#9AA3AD;">' + p.fwdLabel +
              '<button type="button" data-copy-mail="' + p.mail + '" data-copied-label="' + p.copied + '" style="display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);border-radius:10px;padding:8px 12px;cursor:pointer;font-family:inherit;color:#E9ECEF;">' +
                '<span style="font-family:monospace;font-size:13.5px;color:#8FE0A6;">' + p.mail + '</span>' +
                '<span data-copy-label style="font-size:12px;font-weight:600;opacity:0.62;">' + p.copy + '</span></button></div>' +
            '<div style="font-size:13.5px;line-height:1.6;color:#9AA3AD;margin-top:22px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);">' + p.api + '</div>' +
            '<div style="font-size:11.5px;line-height:1.55;color:#6B7280;margin-top:12px;">' + p.fine + '</div>' +
          '</div>' +
        '</div>' +
      '</div></section>';
  }

  /* --- 8. faq --- */
  function faq(t) {
    var items = t.faq.items.map(function (q, i) {
      var open = state.faqOpen === i;
      return '<div style="background:#fff;border:1px solid #E4E7EA;border-radius:14px;box-shadow:0 1px 2px rgba(16,24,32,0.04);overflow:hidden;">' +
        '<button data-faq="' + i + '" class="lp-faq-btn" style="display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;background:transparent;border:none;padding:20px 22px;cursor:pointer;text-align:left;">' +
          '<span style="font-size:16px;font-weight:600;color:#14171B;">' + q.q + '</span>' +
          '<span data-faq-chev="' + i + '" class="lp-faq-chev" style="flex:none;width:26px;height:26px;border-radius:8px;background:#F6F7F8;display:flex;align-items:center;justify-content:center;color:#4C9A63;transform:' + (open ? 'rotate(180deg)' : 'rotate(0deg)') + ';">' + chevronIcon + '</span>' +
        '</button>' +
        '<div data-faq-body="' + i + '" style="' + (open ? '' : 'display:none;') + 'padding:0 22px 22px;font-size:14.5px;line-height:1.65;color:#6B7280;">' + q.a + '</div>' +
      '</div>';
    }).join('');
    return '<section id="faq" style="max-width:820px;margin:clamp(64px,9vw,120px) auto 0;scroll-margin-top:88px;">' +
      '<div data-reveal style="text-align:center;margin-bottom:40px;"><div style="' + eyebrowLight + '">' + t.faq.eyebrow + '</div><h2 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(28px,4vw,42px);line-height:1.1;font-weight:700;letter-spacing:-0.015em;margin:0;">' + t.faq.title + '</h2></div>' +
      '<div style="display:flex;flex-direction:column;gap:12px;">' + items + '</div></section>';
  }

  /* --- 9. repeat the action --- */
  function ctaBand(t) {
    return '<section style="position:relative;background:linear-gradient(135deg,#0E1712,#123322);padding:clamp(56px,8vw,96px) clamp(16px,4vw,44px);overflow:hidden;">' +
      '<div style="position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:80vw;max-width:900px;height:900px;background:radial-gradient(circle,rgba(95,190,124,0.2),transparent 60%);pointer-events:none;"></div>' +
      '<div data-reveal style="position:relative;max-width:820px;margin:0 auto;text-align:center;">' +
        '<h2 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(30px,5vw,50px);line-height:1.08;font-weight:700;letter-spacing:-0.02em;margin:0 0 18px;color:#fff;text-wrap:pretty;">' + t.cta.title + '</h2>' +
        '<p style="font-size:clamp(15px,1.7vw,19px);line-height:1.6;color:#B4C4B9;margin:0 auto 30px;max-width:620px;">' + t.cta.sub + '</p>' +
        '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;">' +
          '<button type="button" data-copy-mail="' + t.cta.mail + '" data-copied-label="' + t.cta.copied + '" class="lp-btn-primary" style="display:inline-flex;align-items:center;gap:10px;background:#5FBE7C;color:#08130C;font-size:16px;font-weight:600;padding:16px 26px;border-radius:12px;border:0;cursor:pointer;font-family:inherit;box-shadow:0 16px 40px rgba(95,190,124,0.3);"><span style="font-family:monospace;font-size:15px;">' + t.cta.mail + '</span><span data-copy-label style="opacity:0.72;font-size:13.5px;">' + t.cta.button + '</span></button>' +
          '<a href="' + APP_URL + '" class="lp-btn-secondary" style="display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#E9ECEF;font-size:16px;font-weight:600;padding:16px 28px;border-radius:12px;">' + t.cta.secondary + '</a>' +
        '</div>' +
      '</div></section>';
  }

  function footer(t) {
    var prod = '<a href="#how" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.nav.how + '</a>' +
      '<a href="#who" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.nav.who + '</a>' +
      '<a href="#pricing" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.nav.pricing + '</a>' +
      '<a href="' + APP_URL + '" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.footer.try + '</a>';
    var col = 'font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#5B636B;margin-bottom:16px;';
    return '<footer style="background:#08090B;padding:clamp(48px,6vw,72px) clamp(16px,4vw,44px) 32px;border-top:1px solid rgba(255,255,255,0.06);">' +
      '<div style="max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:40px;">' +
        '<div style="max-width:300px;"><div style="display:flex;align-items:center;gap:11px;margin-bottom:16px;"><a href="./" style="display:flex;align-items:center;gap:11px;">' + LOGO_IMG_FOOTER + '</a></div><p style="font-size:13.5px;line-height:1.6;color:#7F8891;margin:0;">' + t.footer.tagline + '</p></div>' +
        '<div><div style="' + col + '">' + t.footer.product + '</div><div style="display:flex;flex-direction:column;gap:11px;">' + prod + '</div></div>' +
        '<div><div style="' + col + '">' + t.footer.company + '</div><div style="display:flex;flex-direction:column;gap:11px;"><a href="' + BASE + 'oferta.html" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.footer.terms + '</a><a href="' + BASE + 'politika.html" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.footer.privacy + '</a><a href="' + BASE + 'soglasie.html" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.footer.consent + '</a><a href="' + BASE + 'poruchenie.html" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">' + t.footer.dpa + '</a></div></div>' +
        '<div><div style="' + col + '">' + t.footer.connect + '</div><div style="display:flex;flex-direction:column;gap:11px;"><a href="mailto:hello@logispotio.ru" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">hello@logispotio.ru</a><a href="tel:+73512724001" class="lp-nav-link" style="font-size:14px;color:#B0B7BE;">+7 (351) 272-40-01</a></div></div>' +
      '</div>' +
      '<div style="max-width:1120px;margin:40px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);font-size:12.5px;color:#5B636B;">' + t.footer.rights + '</div>' +
    '</footer>';
  }

  var burgerIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';

  var zoomIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"></path></svg>';

  function openLightbox(src) {
    var prev = document.getElementById('lp-lightbox');
    if (prev) prev.parentNode.removeChild(prev);
    var ov = document.createElement('div');
    ov.id = 'lp-lightbox';
    ov.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(6,9,12,0.92);display:flex;align-items:center;justify-content:center;padding:clamp(12px,3vw,40px);cursor:zoom-out;';
    ov.innerHTML = '<img src="' + src + '" alt="" style="max-width:100%;max-height:100%;border-radius:12px;border:1px solid rgba(255,255,255,0.16);box-shadow:0 40px 90px rgba(0,0,0,0.6);">';
    var close = function () {
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    ov.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.appendChild(ov);
  }

  /* ---------- interactions ---------- */
  function bind() {
    var app = document.getElementById('app');

    var langBtn = document.getElementById('langBtn');
    var langMenu = document.getElementById('langMenu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
      });
      langMenu.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lang]');
        if (btn && btn.getAttribute('data-lang') === state.lang) e.preventDefault();
      });
    }
    var burgerBtn = document.getElementById('burgerBtn');
    var navMobile = document.getElementById('navMobile');
    if (burgerBtn && navMobile) {
      burgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = navMobile.style.display !== 'block';
        navMobile.style.display = open ? 'block' : 'none';
        burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      navMobile.addEventListener('click', function (e) {
        if (e.target.closest('[data-mnav]')) { navMobile.style.display = 'none'; burgerBtn.setAttribute('aria-expanded', 'false'); }
      });
    }
    if (!bind._docCloseBound) {
      bind._docCloseBound = true;
      document.addEventListener('click', function () {
        var lm = document.getElementById('langMenu');
        if (lm && lm.style.display === 'block') lm.style.display = 'none';
        var nm = document.getElementById('navMobile');
        if (nm && nm.style.display === 'block') { nm.style.display = 'none'; var bb = document.getElementById('burgerBtn'); if (bb) bb.setAttribute('aria-expanded', 'false'); }
      });
    }

    if (!bind._zoomBound) {
      bind._zoomBound = true;
      app.addEventListener('click', function (e) {
        var im = e.target.closest('[data-zoom]');
        if (im) openLightbox(im.getAttribute('data-zoom'));
      });
    }

    if (!bind._copyBound) {
      bind._copyBound = true;
      app.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-copy-mail]');
        if (!btn) return;
        var mail = btn.getAttribute('data-copy-mail');
        var done = function () {
          var lab = btn.querySelector('[data-copy-label]');
          if (!lab || lab._busy) return;
          lab._busy = true;
          var prev = lab.textContent;
          lab.textContent = btn.getAttribute('data-copied-label') || 'Copied';
          lab.style.opacity = '1';
          setTimeout(function () { lab.textContent = prev; lab.style.opacity = btn.hasAttribute('data-nudge-copy') ? '1' : '0.72'; lab._busy = false; }, 1800);
        };
        var legacy = function () {
          var ta = document.createElement('textarea');
          ta.value = mail;
          ta.setAttribute('readonly', '');
          ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
          document.body.appendChild(ta);
          ta.focus(); ta.select(); ta.setSelectionRange(0, mail.length);
          var ok = false;
          try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
          document.body.removeChild(ta);
          return ok;
        };
        var copied = legacy();
        if (!copied && navigator.clipboard && navigator.clipboard.writeText) {
          try {
            var p = navigator.clipboard.writeText(mail);
            if (p && p.catch) p.catch(function () {});
          } catch (err) {}
        }
        done();
      });
    }

    if (!bind._faqBound) {
      bind._faqBound = true;
      app.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-faq]');
        if (!btn) return;
        var i = +btn.getAttribute('data-faq');
        var next = state.faqOpen === i ? -1 : i;
        state.faqOpen = next;
        app.querySelectorAll('[data-faq-body]').forEach(function (b) {
          b.style.display = +b.getAttribute('data-faq-body') === next ? '' : 'none';
        });
        app.querySelectorAll('[data-faq-chev]').forEach(function (c) {
          c.style.transform = +c.getAttribute('data-faq-chev') === next ? 'rotate(180deg)' : 'rotate(0deg)';
        });
      });
    }
  }

  /* ---------- "still unsure" popup ---------- */
  var NUDGE = {
    EN: { title: 'Still not sure?', sub: 'Forward any real quotation request to this address — as it came in, attachments and all. We\'ll send back what Logispot made of it.', later: 'Maybe later' },
    RU: { title: 'Всё ещё сомневаетесь?', sub: 'Перешлите на этот адрес любой настоящий запрос на расчёт — как он пришёл, со вложениями. Мы вернём то, что из него сделал Logispot.', later: 'Позже' },
  };
  var NUDGE_DELAY = 35000, NUDGE_KEY = 'lp_nudge_seen';

  function setupNudge() {
    try {
      var seen = +localStorage.getItem(NUDGE_KEY) || 0;
      if (Date.now() - seen < 7 * 864e5) return;
    } catch (e) {}
    var fired = false;
    var cancel = function () { fired = true; };
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-copy-mail]:not([data-nudge-copy])')) cancel(); }, true);
    var show = function () {
      if (fired) return;
      if (document.hidden) { document.addEventListener('visibilitychange', function h() { if (!document.hidden) { document.removeEventListener('visibilitychange', h); show(); } }); return; }
      if (document.getElementById('lp-lightbox')) { setTimeout(show, 4000); return; }
      fired = true;
      try { localStorage.setItem(NUDGE_KEY, String(Date.now())); } catch (e) {}
      openNudge();
    };
    setTimeout(show, NUDGE_DELAY);
  }

  function openNudge() {
    var t = T(), n = NUDGE[state.lang] || NUDGE.EN;
    var ov = document.createElement('div');
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', n.title);
    ov.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,12,16,0.62);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:0;transition:opacity .28s ease;';
    ov.innerHTML =
      '<div data-nudge-card style="position:relative;width:100%;max-width:480px;background:#14171B;color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:22px;padding:clamp(26px,4vw,38px);box-shadow:0 30px 80px rgba(0,0,0,0.45);overflow:hidden;transform:translateY(14px) scale(.98);transition:transform .32s cubic-bezier(.2,.8,.2,1);">' +
        '<div style="position:absolute;top:-40%;right:-30%;width:420px;height:420px;background:radial-gradient(circle,rgba(95,190,124,0.18),transparent 65%);pointer-events:none;"></div>' +
        '<button type="button" data-nudge-close aria-label="Close" style="position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:10px;border:0;background:rgba(255,255,255,0.06);color:#C3CBD2;font-size:20px;line-height:1;cursor:pointer;">×</button>' +
        '<div style="position:relative;">' +
          '<h3 style="font-family:\'Space Grotesk\',sans-serif;font-size:clamp(24px,3vw,30px);line-height:1.15;font-weight:700;letter-spacing:-0.015em;margin:0 0 12px;padding-right:36px;">' + n.title + '</h3>' +
          '<p style="font-size:15.5px;line-height:1.6;color:#C3CBD2;margin:0 0 24px;text-wrap:pretty;">' + n.sub + '</p>' +
          '<button type="button" data-copy-mail="hello@logispotio.ru" data-nudge-copy data-copied-label="' + t.cta.copied + '" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-radius:14px;border:1px solid rgba(95,190,124,0.45);background:rgba(95,190,124,0.1);color:#fff;cursor:pointer;font:inherit;">' +
            '<span style="font-family:monospace;font-size:16px;color:#8FE0A6;">hello@logispotio.ru</span>' +
            '<span data-copy-label style="font-size:13.5px;font-weight:700;background:#5FBE7C;color:#0E1114;padding:8px 13px;border-radius:9px;opacity:1;">' + t.cta.button + '</span>' +
          '</button>' +
          '<button type="button" data-nudge-close style="display:block;margin:16px auto 0;background:none;border:0;color:#8A939C;font-size:13.5px;cursor:pointer;font:inherit;font-size:13.5px;">' + n.later + '</button>' +
        '</div>' +
      '</div>';
    document.getElementById('app').appendChild(ov);
    var close = function () {
      ov.style.opacity = '0';
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { ov.remove(); }, 300);
    };
    var onKey = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.closest('[data-nudge-close]')) close();
      else if (e.target.closest('[data-nudge-copy]')) setTimeout(close, 1600);
    });
    requestAnimationFrame(function () {
      ov.style.opacity = '1';
      ov.querySelector('[data-nudge-card]').style.transform = 'none';
    });
  }

  /* ---------- cookie consent + Yandex Metrika ---------- */
  var CONSENT_KEY = 'lp_cookie_consent';
  var CONSENT_TXT = {
    RU: { text: 'Мы используем cookie и Яндекс Метрику, чтобы понимать, как работает сайт. Подробнее — в <a href="' + BASE + 'politika.html" style="color:#8FE0A6;text-decoration:underline;">Политике обработки персональных данных</a>.', yes: 'Принять', no: 'Отклонить' },
    EN: { text: 'We use cookies and Yandex Metrica to understand how the site is used. Details are in our <a href="' + BASE + 'politika.html" style="color:#8FE0A6;text-decoration:underline;">personal data policy</a> (in Russian).', yes: 'Accept', no: 'Decline' }
  };
  function loadMetrika() {
    var id = window.LP_METRIKA_ID;
    if (!id || window.ym) return;
    (function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); }; m[i].l = 1 * new Date(); k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a); })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(id, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
  }
  function setupConsent() {
    var v = null;
    try { v = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (v === 'yes') { loadMetrika(); return; }
    if (v === 'no') return;
    var c = CONSENT_TXT[state.lang] || CONSENT_TXT.RU;
    var bar = document.createElement('div');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie');
    bar.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:150;max-width:760px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:16px 18px;border-radius:16px;background:#14171B;border:1px solid rgba(255,255,255,0.12);box-shadow:0 18px 50px rgba(0,0,0,0.35);color:#C3CBD2;font-size:14px;line-height:1.5;';
    var btn = 'border:0;border-radius:10px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;';
    bar.innerHTML = '<div style="flex:1 1 320px;min-width:0;">' + c.text + '</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button type="button" data-consent="no" style="' + btn + 'background:rgba(255,255,255,0.08);color:#D7DDE3;">' + c.no + '</button>' +
        '<button type="button" data-consent="yes" style="' + btn + 'background:#5FBE7C;color:#0E1114;">' + c.yes + '</button>' +
      '</div>';
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var ans = b.getAttribute('data-consent');
      try { localStorage.setItem(CONSENT_KEY, ans); } catch (err) {}
      if (ans === 'yes') loadMetrika();
      bar.remove();
    });
    document.body.appendChild(bar);
  }

  /* ---------- savings calculator ---------- */
  var MIN_PER_REQUEST = 16;
  var PER_DAY_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300];
  var WORK_DAYS = 21, HOUR_COST = 600, SEAT_PRICE = 1900, REQ_PER_SEAT = 5;

  function seatWord(n, labels) {
    var many = labels.seats || 'seats', one = labels.seatOne || 'seat', few = labels.seatFew;
    if (!few) return n === 1 ? one : many;
    var d10 = n % 10, d100 = n % 100;
    if (d10 === 1 && d100 !== 11) return one;
    if (d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) return few;
    return many;
  }

  function initCalc() {
    var box = document.querySelector('[data-calc-box]');
    if (!box) return;
    var labels = (T().numbers && T().numbers.calc) || {};
    var money = function (v) { return Math.round(v).toLocaleString('en-US').replace(/,/g, '\u00a0') + '\u00a0\u20bd'; };
    var set = function (id, txt) { var e = box.querySelector('[data-out="' + id + '"]'); if (e) e.textContent = txt; };
    function run() {
      var slider = box.querySelector('[data-calc="perday"]');
      if (!slider) return;
      var perDay = PER_DAY_STEPS[Math.max(0, Math.min(PER_DAY_STEPS.length - 1, +slider.value))] || 1;
      var hours = perDay * WORK_DAYS * MIN_PER_REQUEST / 60;
      var saved = hours * HOUR_COST;
      var seats = Math.max(1, Math.ceil(perDay / REQ_PER_SEAT));
      var cost = SEAT_PRICE * seats;
      var net = saved - cost;
      set('perday', String(perDay));
      set('hours', Math.round(hours) + ' ' + (labels.hUnit || 'h'));
      set('money', money(saved));
      set('cost', money(cost));
      set('net', (net >= 0 ? '+' : '\u2212') + money(Math.abs(net)));
      var cl = box.querySelector('[data-out-label="cost"]');
      if (cl) cl.textContent = (labels.cost || 'Logispot') + ', ' + seats + ' ' + seatWord(seats, labels);
    }
    box.addEventListener('input', run);
    run();
  }

  function initGallery() { /* screenshots are inline per step — no carousel */ }

  /* ---------- scroll reveal ---------- */
  var revealObserver = null;
  function setupReveal() {
    if (revealObserver) revealObserver.disconnect();
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); revealObserver.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 3D hero scene ---------- */
  function init3D() {
    if (state.raf) { cancelAnimationFrame(state.raf); state.raf = null; }
    var mount = document.getElementById('lp-hero-3d');
    var THREE = window.THREE;
    if (!mount) return;
    if (!THREE) { setTimeout(init3D, 300); return; }
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    var W = function () { return mount.clientWidth || 400; };
    var H = function () { return mount.clientHeight || 440; };
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, W() / H(), 0.1, 100);
    camera.position.set(0, 0.6, 9.8);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(4, 6, 5); scene.add(key);
    var green = new THREE.PointLight(0x5FBE7C, 1.4, 30); green.position.set(-4, 2, 4); scene.add(green);

    var pivot = new THREE.Group(); scene.add(pivot);
    var GREEN = 0x5FBE7C, DARK = 0x8b949d, LIGHT = 0xdfe3e7, MID = 0x707a83;
    var std = function (c, m, r) { return new THREE.MeshStandardMaterial({ color: c, metalness: m == null ? 0.35 : m, roughness: r == null ? 0.55 : r }); };
    var box = function (p, w, h, d, x, y, z, mat) { var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); me.position.set(x, y, z); p.add(me); return me; };
    var cyl = function (p, rt, rb, h, x, y, z, mat, rx, rz) { var me = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 20), mat); me.position.set(x, y, z); if (rx) me.rotation.x = rx; if (rz) me.rotation.z = rz; p.add(me); return me; };
    var edge = function (mesh, col) { mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color: col == null ? 0x0d1a12 : col }))); };

    function buildTruck() {
      var g = new THREE.Group();
      box(g, 1.55, 0.74, 0.84, 0.2, 0.42, 0, std(DARK));
      var cab = box(g, 0.62, 0.64, 0.84, -0.92, 0.37, 0, std(GREEN)); edge(cab);
      box(g, 0.52, 0.2, 0.7, -0.92, 0.14, 0, std(0x5a636c));
      [-0.98, -0.36, 0.56, 0.98].forEach(function (x) {
        cyl(g, 0.2, 0.2, 0.14, x, -0.02, 0.46, std(0x4a525a, 0.3, 0.7), Math.PI / 2);
        cyl(g, 0.2, 0.2, 0.14, x, -0.02, -0.46, std(0x4a525a, 0.3, 0.7), Math.PI / 2);
      });
      return g;
    }
    function buildPlane() {
      var g = new THREE.Group();
      cyl(g, 0.2, 0.24, 1.95, 0, 0, 0, std(LIGHT, 0.5, 0.4), 0, Math.PI / 2);
      cyl(g, 0.02, 0.2, 0.5, 1.12, 0, 0, std(LIGHT, 0.5, 0.4), 0, -Math.PI / 2);
      box(g, 0.55, 0.06, 2.05, -0.05, 0, 0, std(GREEN));
      box(g, 0.4, 0.05, 0.82, -0.85, 0, 0, std(GREEN));
      box(g, 0.42, 0.48, 0.05, -0.92, 0.25, 0, std(GREEN));
      return g;
    }
    function buildShip() {
      var g = new THREE.Group();
      box(g, 2.3, 0.44, 0.88, 0, 0, 0, std(DARK));
      box(g, 2.55, 0.3, 0.5, 0.12, -0.03, 0, std(DARK));
      box(g, 2.05, 0.12, 0.8, -0.05, 0.28, 0, std(MID));
      var cols = [GREEN, LIGHT, 0x9aa3ad, GREEN, LIGHT];
      for (var i = 0; i < 5; i++) for (var j = 0; j < 2; j++) {
        box(g, 0.36, 0.22, 0.3, -0.86 + i * 0.38, 0.47 + j * 0.24, 0.21, std(cols[(i + j) % 5]));
        box(g, 0.36, 0.22, 0.3, -0.86 + i * 0.38, 0.47 + j * 0.24, -0.21, std(cols[(i + j + 2) % 5]));
      }
      box(g, 0.44, 0.54, 0.76, 0.84, 0.58, 0, std(0xe6e9ec, 0.3, 0.4));
      return g;
    }
    function buildContainer() {
      var g = new THREE.Group();
      var b = box(g, 1.5, 0.76, 0.76, 0, 0, 0, std(GREEN)); edge(b);
      for (var i = -6; i <= 6; i++) { box(g, 0.05, 0.7, 0.015, i * 0.11, 0, 0.385, std(0x3f8353)); box(g, 0.05, 0.7, 0.015, i * 0.11, 0, -0.385, std(0x3f8353)); }
      return g;
    }
    function buildTrain() {
      var g = new THREE.Group();
      box(g, 2.7, 0.14, 0.62, 0.05, 0.12, 0, std(0x5a636c));
      var loco = box(g, 0.98, 0.62, 0.62, -0.92, 0.5, 0, std(GREEN)); edge(loco);
      box(g, 0.34, 0.16, 0.5, -0.5, 0.86, 0, std(GREEN));
      cyl(g, 0.09, 0.11, 0.22, -1.15, 0.92, 0, std(0x5a636c));
      var w1 = box(g, 0.82, 0.5, 0.6, 0.2, 0.42, 0, std(LIGHT)); edge(w1, 0x9aa3ad);
      var w2 = box(g, 0.82, 0.5, 0.6, 1.15, 0.42, 0, std(DARK)); edge(w2, 0x565f68);
      [-1.15, -0.7, -0.1, 0.35, 0.95, 1.4].forEach(function (x) { cyl(g, 0.13, 0.13, 0.1, x, 0.07, 0.34, std(0x4a525a), Math.PI / 2); cyl(g, 0.13, 0.13, 0.1, x, 0.07, -0.34, std(0x4a525a), Math.PI / 2); });
      return g;
    }

    var defs = [
      { make: buildTruck, y: -1.5, z: 0.5, s: 1.0, vx: 1.5 },
      { make: buildPlane, y: 1.7, z: -0.5, s: 1.05, vx: 2.3 },
      { make: buildShip, y: -1.9, z: -0.3, s: 0.9, vx: -1.1 },
      { make: buildContainer, y: 1.9, z: 0.3, s: 0.8, vx: -1.8 },
      { make: buildTrain, y: 0.1, z: -1.2, s: 0.9, vx: 1.3 }
    ];
    var items = defs.map(function (d) {
      var wrap = new THREE.Group(); var inner = d.make(); inner.scale.setScalar(d.s);
      wrap.add(inner); wrap.position.set(0, d.y, d.z); wrap.rotation.y = Math.random() * Math.PI;
      pivot.add(wrap);
      var sgn = function () { return Math.random() < 0.5 ? 1 : -1; };
      return { wrap: wrap, inner: inner, startX: Math.random() * 40 - 20, y0: d.y, vx: d.vx, phase: Math.random() * Math.PI * 2, spinX: (0.12 + Math.random() * 0.25) * sgn(), spinY: (0.16 + Math.random() * 0.3) * sgn(), bob: 0.2 + Math.random() * 0.18 };
    });

    var pts = 70, pa = new Float32Array(pts * 3);
    for (var i = 0; i < pts; i++) {
      var r = 4 + Math.random() * 2, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pa[i * 3] = r * Math.sin(ph) * Math.cos(th); pa[i * 3 + 1] = r * Math.cos(ph); pa[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    var pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
    var points = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x5FBE7C, size: 0.05, transparent: true, opacity: 0.45 }));
    pivot.add(points);

    var mx = 0, my = 0;
    var heroEl = mount.closest('header') || mount.parentElement;
    (heroEl || window).addEventListener('pointermove', function (e) {
      var rc = (heroEl || mount).getBoundingClientRect();
      mx = ((e.clientX - rc.left) / rc.width - 0.5);
      my = ((e.clientY - rc.top) / rc.height - 0.5);
    });

    var clock = new THREE.Clock();
    function animate() {
      state.raf = requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      pivot.rotation.y = mx * 0.5;
      pivot.rotation.x = my * 0.32;
      points.rotation.y = -t * 0.04;
      var vFOV = THREE.MathUtils.degToRad(camera.fov);
      var halfH = Math.tan(vFOV / 2) * camera.position.z;
      var halfW = halfH * camera.aspect;
      var range = halfW * 2 + 9;
      items.forEach(function (it) {
        it.wrap.position.x = ((it.startX + t * it.vx) % range + range) % range - range / 2;
        it.wrap.position.y = it.y0 + Math.sin(t * 0.5 + it.phase) * it.bob;
        it.inner.rotation.y = t * it.spinY + it.phase;
        it.inner.rotation.x = t * it.spinX;
        it.inner.rotation.z = Math.sin(t * 0.3 + it.phase) * 0.12;
      });
      camera.position.x += (mx * 2.6 - camera.position.x) * 0.06;
      camera.position.y += (0.6 - my * 1.8 - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();

    if (init3D._resize) window.removeEventListener('resize', init3D._resize);
    init3D._resize = function () { camera.aspect = W() / H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H()); };
    window.addEventListener('resize', init3D._resize);
  }

  /* ---------- demo video autoplay-on-scroll ---------- */
  var demoObserver = null;
  function setupDemoVideo() {
    if (demoObserver) demoObserver.disconnect();
    var video = document.querySelector('.lp-demo-video');
    if (!video || !('IntersectionObserver' in window)) return;
    var wantsPlay = false;
    var tryPlay = function () {
      if (wantsPlay && video.paused) video.play().catch(function () {});
    };
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    demoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        wantsPlay = en.isIntersecting;
        if (en.isIntersecting) tryPlay();
        else video.pause();
      });
    }, { threshold: 0.5 });
    demoObserver.observe(video);
  }

  /* ---------- render ---------- */
  function render() {
    document.documentElement.lang = state.lang.toLowerCase();
    document.getElementById('app').innerHTML = view(T());
    bind();
    initGallery();
    initCalc();
    setupReveal();
    setupDemoVideo();
    init3D();
  }

  function start() {
    state.lang = detectLang();
    render();
    setupNudge();
    setupConsent();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
