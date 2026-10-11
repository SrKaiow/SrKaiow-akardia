
/* =================================================================
   CONFIGURAÇÃO — edite só esta parte
   ================================================================= */
window.OLIMPO = {
  rede: "AKARDIA",                   // nome da rede — é o que aparece na landing
  nome: "FACTIONS OLIMPO",           // nome do modo (usado nos textos internos)
  dominio: "akardia.net",            // aparece no rodapé
  ip: "akardia.net",
  versao: "1.21.11",                  // versão do Minecraft (aparece na landing)
  storeDomain: "akardianet.centralcart.ai",                    // ex: "olimpo.centralcart.ai"  (vazio = modo demonstração)
  discord: "https://discord.gg/VePCDTWVje",
  faq: "https://discord.gg/VePCDTWVje",
  // Rádio do site: cole aqui os links do YouTube (vídeo, shorts ou youtu.be). Toca em sequência, baixinho.
  musicas: [
    "https://www.youtube.com/watch?v=n4tK7LYFxI0",
    "https://www.youtube.com/watch?v=K4DyBUG242c",
    "https://www.youtube.com/watch?v=WzQBAc8i73E"
  ],
  volumeMusica: 15,                     // 0 a 100
  // Opcional (recomendado): MP3 dentro do repositório, ex. pasta "musicas". Se tiver algum aqui, a rádio usa estes no lugar do YouTube.
  // As músicas da NCS (NoCopyrightSounds) podem ser baixadas grátis em ncs.io — basta manter o crédito.
  musicasArquivos: [
    // { arquivo: "musicas/spektrem-shine.mp3", titulo: "Spektrem - Shine", credito: "NCS" },
  ],   // link do canal #faq (aparece nas Diretrizes)

  // Cores dos VIPs (mesmas do <gradient> do servidor). Vale para qualquer produto
  // da CentralCart cujo nome contenha a palavra (ex: "VIP Cavaleiro 30 dias").
  // As tags (imagens) de cada VIP ficam no bloco TAGS logo abaixo desta configuração.
  // Chaves de masmorra: arte gerada no site para qualquer produto cujo nome tenha o tipo
  // Vantagens dos VIPs (iguais às do jogo). "comuns" vale para todos; "niveis" muda por VIP.
  vantagens: {
    comuns: [
      ["tag",     "Tag exclusiva dentro do servidor e no Discord"],
      ["back",    "Acesso ao comando <b>/back</b>"],
      ["voar",    "Voo nos claims com <b>/f voar</b> e voo no spawn"],
      ["tempo",   "Sem espera para <b>/compactar</b>, teleportar e mandar mensagens globais"],
      ["kit",     "Acesso a <b>kits exclusivos</b>"],
      ["replay",  "Replays de invasões finalizadas"],
      ["fila",    "Entra nos servidores <b>sem enfrentar fila</b>"],
      ["global",  "Anúncios do mercado divulgados globalmente"]
    ],
    // ordem: Cavaleiro, Lorde, Soberano, Imperador
    niveis: {
      homes:    { nome: "Limite de homes",               sufixo: "",              valores: { cavaleiro: 10, lorde: 15, soberano: 20, imperador: 25 } },
      mercado:  { nome: "Itens anunciados no mercado",   sufixo: " itens",        valores: { cavaleiro: 5,  lorde: 7,  soberano: 9,  imperador: 11 } },
      bau:      { nome: "Baú do fim",                    sufixo: " linhas",       valores: { cavaleiro: 3,  lorde: 4,  soberano: 5,  imperador: 6 } },
      morte:    { nome: "Experiência mantida ao morrer", sufixo: "%",             valores: { cavaleiro: 70, lorde: 80, soberano: 90, imperador: 100 } },
      xp:       { nome: "Bônus de XP em habilidades",    sufixo: "%", mais: true, valores: { cavaleiro: 5,  lorde: 10, soberano: 15, imperador: 20 } },
      vendas:   { nome: "Bônus em vendas na loja",       sufixo: "%", mais: true, valores: { cavaleiro: 5,  lorde: 10, soberano: 15, imperador: 20 } },
      desconto: { nome: "Desconto em compras na loja",   sufixo: "%", mais: true, valores: { cavaleiro: 5,  lorde: 10, soberano: 15, imperador: 20 } }
    }
  },

  // Cash: arte de "meteoro de moedas" gerada no site para produtos com "cash" no nome
  // COMBO: produto da CentralCart com "combo" no nome. "itens" = nomes dos produtos avulsos que ele junta
  // (o site soma o preço deles para mostrar quanto a pessoa economiza).
  combo: { arte: "produtos/combo-imperial.webp", itens: ["VIP Imperador", "13.500 Cash"], cor: "#5261ff", cor2: "#ff40b3",
    resumo: "VIP Imperador + 13.500 Cash num pacote só, mais barato que comprar separado." },
  cash: { cor: "#FFD54A", cor2: "#FF8A00",
    resumo: "Moeda premium que cai direto do céu na sua conta. Troque no /kit por itens valiosos ou Caixas Divinas dos Deuses.",
    descricao: "O <b>Cash</b> é a moeda premium do Factions Olimpo. Ele cai direto na sua conta assim que o pagamento é aprovado e pode ser trocado no <b>/kit</b>, dentro do jogo, por <b>itens valiosos</b> ou <b>Caixas Divinas dos Deuses</b>.",
    // preços dentro do jogo (/kit), mostrados na janela do produto de cash
    tabela: [
      { grupo: "Caixas", cab: ["1x","5x","10x"], itens: [["Caixa Comum",250,1250,2500],["Caixa Rara",500,2500,5000],["Caixa Lendária",750,3750,7500]] },
      { grupo: "Itens especiais", itens: [["Super Creeper",1250],["Raio Mestre",750],["TNT Balística",750],["Reset de KDR",500],["Poder Máximo",1250],["Poder Instantâneo",500],
        ["Prisão de Sede",750],["Booster",1250],["Booster Nível 2",1500],["Reset de Talentos",1500],["Runa de Extração",750],["Reparador",1250]] },
      { grupo: "Chaves de masmorra", itens: [["Chave do Santuário das Profundezas",2500],["Chave do Calabouço Assombrado",2500],["Chave da Masmorra Infernal",2500]] }
    ] },

  // Cores no mesmo padrão dos VIPs: Santuário = Cavaleiro, Calabouço = Lorde, Infernal = Soberano
  chaves: {
    "santuario": { nome: "Santuário", cor: "#00a6a2", cor2: "#3b52e0", arma: "tridente", reliquia: "Tridente de Poseidon",
      resumo: "Santuário das Profundezas: ondas de Wardens e o Mega Warden. Dá Fragmentos de Eco para o Conjunto do Warden.",
      descricao: "Abre o <b>Santuário das Profundezas</b>: enfrente ondas de Wardens e derrote o <b>Mega Warden</b>. A recompensa são os <b>Fragmentos de Eco</b>, usados para forjar o Conjunto do Warden, que dá <b>Resistência II</b> com a armadura completa." },
    "calabouco": { nome: "Calabouço", cor: "#6eff70", cor2: "#00a800", arma: "lanca", reliquia: "Lança de Atena",
      resumo: "Calabouço Assombrado: mortos-vivos, abóboras e aranhas, com o chefe Retalha-Almas. Dá Fragmentos Assombrados.",
      descricao: "Abre o <b>Calabouço Assombrado</b>: mortos-vivos, monstros de abóbora e aranhas, e no fim o <b>Retalha-Almas</b>. A recompensa são os <b>Fragmentos Assombrados</b>, usados para forjar o Conjunto Assombrado, que dá <b>Velocidade II</b> com a armadura completa." },
    "infernal":  { nome: "Infernal",  cor: "#d60000", cor2: "#7a0000", arma: "bidente", reliquia: "Bidente de Hades",
      resumo: "Masmorra Infernal: demônios e o Demônio Carmesim. Dá Fragmentos Infernais para o Conjunto Infernal.",
      descricao: "Abre a <b>Masmorra Infernal</b>: enfrente ondas de demônios e derrote o <b>Demônio Carmesim</b>. A recompensa são os <b>Fragmentos Infernais</b>, usados para forjar o Conjunto Infernal, que dá <b>Força II</b> com a armadura completa." }
  },
  vips: {
    cavaleiro: ["#00a6a2", "#3b52e0"],
    lorde:     ["#00a800", "#6eff70"],
    soberano:  ["#d60000", "#7a0000"],
    imperador: ["#5261ff", "#ff40b3"]
  },

  // "nick" = nome que aparece no site. "conta" = nome da conta ORIGINAL do Minecraft (Java)
  // de onde vem a skin. Se for igual ao nick, pode deixar "conta" vazio.
  // Também aceita o UUID da conta em "conta" (mais garantido, nunca muda).
  equipe: [
    {
      nick: "akahasky",
      conta: "ae3c2538-1cee-46b7-8d10-5e88236ad93f",   // UUID da conta akahasky (NameMC: akahasky.1)
      cargo: "Desenvolvedor",
      bio: "Desenvolvedor do Factions Olimpo. Cuida dos plugins, das mecânicas de facção e de tudo o que roda dentro do servidor, do primeiro bloco quebrado à última guerra da temporada.",
      redes: { discord: "", instagram: "", youtube: "", x: "" }
    },
    {
      nick: "SrKaio",
      conta: "b27069e4-be54-4527-b31a-22aa0bade97a",   // UUID da conta xX_KaioYT_Xx (NameMC: xX_KaioYT_Xx.2)
      cargo: "Fundador · Infraestrutura",
      bio: "Fundador do Factions Olimpo. Cuida da infraestrutura e dos sistemas que sustentam o servidor, da estrutura de dados ao equilíbrio das mecânicas de jogo, para que cada detalhe técnico funcione com precisão.",
      redes: { discord: "", instagram: "", youtube: "", x: "" }
    }
  ],
  // colaboradores: só o quadrado com a skin e o nick. "conta" = UUID ou nome da conta original (skin).
  colaboradores: [
    { nick: "HellmetxD",   conta: "2184ed4f-db86-4115-ba0a-c5d45863e846" },   // NameMC: HellmetxD.2
    { nick: "Diviinidade", conta: "79dfc07c-0e3b-4685-82b3-b591ea460976" }    // NameMC: PONYB0T.1
  ],
  apoiadores: [],                     // ex: ["Notch", "jeb_"]

  guias: [
    { titulo: "Primeiros passos", texto: "Entre pelo IP e abra o menu de kits. O kit Básico pode ser pego a cada 30 minutos, e ainda tem o Diário e o Semanal. Para ir até um amigo, mande um pedido de teleporte.", comandos: ["/kit", "/spawn", "/tpa <nick>"] },
    { titulo: "Criando sua facção", texto: "Crie sua facção escolhendo a tag e o nome no menu, convide os aliados e domine território para proteger sua base.", comandos: ["/f criar", "/f convidar <nick>", "/f dominar"] },
    { titulo: "Economia e loja", texto: "Ganhe coins farmando. Para vender, entre na área de venda e agache (SHIFT): todos os itens aceitos são vendidos de uma vez, sem placas nem menus. O cash comprado na loja vira itens no /loja.", comandos: ["/money", "/loja"] },
    { titulo: "Guerra e invasões", texto: "Fique de olho no poder e no território da sua facção: abaixo do mínimo, suas terras podem ser invadidas.", comandos: ["/f info", "/f mapa"] }
  ],

  // DUNGEONS — cada masmorra usa a chave de mesmo nome em "chaves". Sem dados (null) = aparece "em breve".
  // As três têm a mesma dificuldade e os conjuntos têm a mesma força; muda o tema, os inimigos e o efeito do conjunto completo.
  dungeons: {
    santuario: {
      titulo: "SANTUÁRIO DAS PROFUNDEZAS",
      kick: "// ECOS DO ABISMO",
      intro: "Desça às profundezas onde o silêncio é a única defesa. Sobreviva às ondas de <strong>Wardens</strong>, derrote o <strong>Mega Warden</strong> e junte <strong>Fragmentos de Eco</strong> para forjar o Conjunto do Warden.",
      tema: { c1:"#13c8d8", c2:"#0b3a66", c3:"#7ff6ff", bg1:"#020a0e", bg2:"#05161d", bg3:"#082a33", t:"#dff9ff", p:"#a9c4cb", m:"#6f8f97" },
      chaveNome: "Chave do Santuário das Profundezas", inimigos: "ondas de <strong>Wardens</strong>", chefe: "Mega Warden",
      efeito: "Resistência II",
      material: { img:"fragmento-de-eco", nome:"Fragmento de Eco", plural:"Fragmentos de Eco" },
      mobs: [
        { svg:"sonar", nome:"Warden", txt:"Warden de corpo padrão, com perseguição implacável e ataque corpo a corpo. O efeito de escuridão é cancelado dentro da dungeon." }
      ],
      notaMobs: "O Warden comum usa o modelo do próprio Minecraft.",
      boss: { img:"mega-warden", nome:"MEGA WARDEN", sub:"// CHEFE DO SANTUÁRIO",
        itens: [
          "<strong>Ofensiva:</strong> combo de golpes laterais, impacto no chão e explosão sônica.",
          "<strong>Explosão sônica:</strong> 16 de dano, com cegueira e confusão.",
          "<strong>Emergência:</strong> 10 de dano em área ao sair do solo.",
          "<strong>Perseguição:</strong> faro, investigação, sonar, acúmulo de fúria e corrida até o alvo.",
          "<strong>Defesa:</strong> pode submergir com alta resistência e reaparecer entre rochas e sculk.",
          "<strong>Atordoamento:</strong> sequências especiais em 75%, 50% e 25% de vida."
        ] },
      conjunto: [
        ["s-capacete","Capacete do Warden",1],["s-peitoral","Peitoral do Warden",1],["s-calcas","Calças do Warden",1],["s-botas","Botas do Warden",1],
        ["s-espada","Espada do Warden"],["s-machado","Machado do Warden"],["s-picareta","Picareta do Warden"],["s-pa","Pá do Warden"],["s-enxada","Enxada do Warden"]
      ]
    },
    calabouco: {
      titulo: "CALABOUÇO ASSOMBRADO",
      kick: "// ONDE OS MORTOS NÃO DESCANSAM",
      intro: "Corredores tomados por mortos-vivos, abóboras famintas e aranhas. No fim espera o <strong>Retalha-Almas</strong>, com seus clones e fantoches. Junte <strong>Fragmentos Assombrados</strong> para forjar o Conjunto Assombrado.",
      tema: { c1:"#6eff70", c2:"#1c5a1d", c3:"#ff9a2e", bg1:"#030703", bg2:"#081308", bg3:"#0f220f", t:"#e9ffdf", p:"#b2c6a9", m:"#76906c" },
      chaveNome: "Chave do Calabouço Assombrado", inimigos: "uma rotação de <strong>mortos-vivos, monstros de abóbora e aranhas</strong>", chefe: "Retalha-Almas",
      efeito: "Velocidade II",
      material: { img:"fragmento-assombrado", nome:"Fragmento Assombrado", plural:"Fragmentos Assombrados" },
      mobs: [
        { img:"zumbi-mutante",       nome:"Zumbi Mutante",       txt:"Golpes pesados e trovão em área. Vai perdendo membros conforme perde vida." },
        { img:"monstro-de-abobora",  nome:"Monstro de Abóbora",  txt:"Mordida incendiária, golpe em arco e vinhas que causam dano em área." },
        { img:"mumia",               nome:"Múmia",               txt:"Dois ataques animados que aplicam confusão, veneno e arremesso." },
        { img:"aranha-guerreira",    nome:"Aranha Guerreira",    txt:"Ataque frontal e investida curta." },
        { img:"aranha-armadilheira", nome:"Aranha Armadilheira", txt:"Dispara uma armadilha que puxa o alvo para o centro." },
        { img:"aranha-venenosa",     nome:"Aranha Venenosa",     txt:"Projétil venenoso que cria uma área de dano contínuo." },
        { img:"aranha-elite",        nome:"Aranha Elite",        txt:"Pisões em área, golpes alternados e corrida ofensiva." }
      ],
      boss: { img:"retalha-almas", nome:"RETALHA-ALMAS", sub:"// CHEFE DO CALABOUÇO",
        itens: [
          "<strong>Fases:</strong> muda de comportamento em 65% e 35% de vida.",
          "<strong>Ofensiva:</strong> golpes em cone, estocada, lançamento de facas e tesoura cadente.",
          "<strong>Controle:</strong> teleporte, cegueira no alvo e ataque surpresa.",
          "<strong>Invocações:</strong> clones, miragens e um fantoche explosivo que gera um anel de almas.",
          "<strong>Dano:</strong> 12 a 16 nos golpes; a tesoura cadente causa 15."
        ] },
      conjunto: [
        ["c-capacete","Capacete Assombrado"],["c-peitoral","Peitoral Assombrado",1],["c-calcas","Calças Assombradas",1],["c-botas","Botas Assombradas",1],
        ["c-espada","Espada Assombrada"],["c-machado","Machado Assombrado"],["c-picareta","Picareta Assombrada"],["c-pa","Pá Assombrada"],["c-enxada","Enxada Assombrada"]
      ]
    },
    infernal: {
      titulo: "MASMORRA INFERNAL",
      kick: "// AS PROFUNDEZAS EM CHAMAS",
      intro: "Um portal para as profundezas do Nether. Enfrente ondas de demônios, derrote o <strong>Demônio Carmesim</strong> e junte <strong>Fragmentos Infernais</strong> para forjar o Conjunto Infernal.",
      tema: { c1:"#d60000", c2:"#7a0000", c3:"#ff8a1f", bg1:"#0b0303", bg2:"#1a0504", bg3:"#2a0805", t:"#ffe2cc", p:"#cdb3a2", m:"#9c8172" },
      chaveNome: "Chave da Masmorra Infernal", inimigos: "ondas de <strong>criaturas infernais</strong>", chefe: "Demônio Carmesim",
      efeito: "Força II",
      material: { img:"fragmento-infernal", nome:"Fragmento Infernal", plural:"Fragmentos Infernais" },
      mobs: [
        { img:"mago-demoniaco",      nome:"Mago Demoníaco",      txt:"Combate mágico, anel de fogo e ataque corpo a corpo." },
        { img:"berserker-demoniaco", nome:"Berserker Demoníaco", txt:"Golpes de machado, agarrão e empurrão, e ataque de salto." },
        { img:"guerreiro-demoniaco", nome:"Guerreiro Demoníaco", txt:"Combos com duas espadas, investidas e ataques corpo a corpo." },
        { img:"demonio-do-tempo",    nome:"Demônio do Tempo",    txt:"Ataques temporais e golpes em área. Ao morrer, invoca o Núcleo Temporal." },
        { img:"espectro-demoniaco",  nome:"Espectro Demoníaco",  txt:"Variante espectral com combos corpo a corpo e recuo." },
        { img:"nucleo-temporal",     nome:"Núcleo Temporal",     txt:"Invocado pelo Demônio do Tempo. Fica imóvel e executa a ressurreição e os efeitos temporais.", tag:"INVOCAÇÃO" }
      ],
      boss: { img:"demonio-carmesim", nome:"DEMÔNIO CARMESIM", sub:"// CHEFE DA MASMORRA INFERNAL",
        itens: [
          "<strong>Mobilidade:</strong> salto de aproximação, giro e esquiva ao receber dano.",
          "<strong>Ofensiva:</strong> três variações de golpe em arco e sopro de chamas.",
          "<strong>Golpe corpo a corpo:</strong> 14 de dano.",
          "<strong>Sopro de chamas:</strong> 5 de dano por acerto e 3 segundos pegando fogo."
        ] },
      conjunto: [
        ["capacete-infernal","Capacete Infernal"],["peitoral-infernal","Peitoral Infernal",1],["calcas-infernais","Calças Infernais",1],["botas-infernais","Botas Infernais",1],
        ["espada-infernal","Espada Infernal"],["machado-infernal","Machado Infernal"],["picareta-infernal","Picareta Infernal"],["pa-infernal","Pá Infernal"],["enxada-infernal","Enxada Infernal"]
      ]
    }
  },

  // PROGRAMA DE PARCEIROS (página #parceiros)
  parceiros: {
    autor: "xX_KaioYT_Xx", autorSkin: "SrKaio",   // autorSkin = cabeça embutida da equipe (aparece mesmo sem internet de skins)
    data: "09/10/2026",
    comissoes: [5, 10, 15, 20],     // % de cada compra feita com o código, da Comissão 1 até a 4
    cashPorLike: 10, limiteResgate: 4000, minLikes: 30, minVideos: 1,
    hashtags: ["#FactionsOlimpo", "#ParceiroAkardia"],
    formulario: "https://docs.google.com/forms/d/1WY9o4ufYTij2Q6rbU32V0M8YqQ6t6KovR86OGKinNIM/preview"   // formulário de inscrição de parceiros
  },

  // CRIADORES PARCEIROS: códigos aceitos no campo "Apoie um criador" (maiúsculas não importam).
  // Para adicionar um criador novo, é só colocar o código dele aqui.
  criadores: ["Altivinho", "KBM"],

  formularioEquipe: "https://forms.gle/434vPyNM7rXH8qgW8",   // formulário para entrar na equipe (página Equipe)

  email: "suporte@akardia.net",
  campoTipoConta: "",                 // nome do campo de checkout na CentralCart para "Original/Pirata" (ex: "tipo_conta"). Vazio = não envia
  etTeste: false,                    // true = ET aparece sempre (para testar). Deixe false no site no ar
  cupomET: "OLIMPO30",               // cupom que o ET entrega na loja (precisa existir na CentralCart). Vazio = sem ET   // e-mail de suporte (aparece na política de reembolso)
  links: { termos: "#", diretrizes: "#" }
};
