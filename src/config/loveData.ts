export interface LoveData {
  recipientName: string;
  subheading: string;
  coverImage: string;
  songs: {
    id: number;
    title: string;
    artist: string;
    url: string;
  }[];
  albumPhotos: {
    id: number;
    url: string;
    caption: string;
    date?: string;
  }[];
  letter: {
    title: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  finalPhoto: {
    url: string;
    title: string;
    description: string;
  };
}

export const loveData: LoveData = {
  recipientName: "Diana",
  subheading: "Hoy celebramos la magia de tenerte",
  // Foto inicial con el nombre
  coverImage: "/foto-1.jpeg",
  // Canciones para escoger al entrar
  songs: [
    {
      id: 1,
      title: "Tú y Yo",
      artist: "La Misma Gente",
      url: "/musica.mp3",
    },
    {
      id: 2,
      title: "Amor",
      artist: "Emmanuel Cortes",
      url: "/cancion-2.mp3",
    },
  ],
  
  // Álbum de fotos carrusel
  albumPhotos: [
    {
      id: 1,
      url: "/recuerdo-1.jpeg",
      caption: "Mi lugar favorito siempre serás tu",
      date: "Mi paraiso"
    },
    {
      id: 2,
      url: "/recuerdo-2.jpeg",
      caption: "No necesito un cuento de hadas, te tengo a ti",
      date: "Noches de Fiesta & Alegría"
    },
    {
      id: 3,
      url: "/recuerdo-3.jpeg",
      caption: "Tú haces especial cada momento",
      date: "Cada Celebración Contigo"
    },
    {
      id: 4,
      url: "/recuerdo-4.jpeg",
      caption: "Muy pronto nuestras aventuras",
      date: "Aventuras"
    },
    {
      id: 5,
      url: "/recuerdo-5.jpeg",
      caption: "Traes calma y afecto estés donde estés",
      date: "Siempre estaré a tu lado"
    },
    {
      id: 6,
      url: "/recuerdo-6.jpeg",
      caption: "Algo fuera de la rutina",
      date: "Nuestra escapada"
    }
  ],

  // Carta de amor
  letter: {
    title: "Para el amor de mi vida",
    date: "En este día tan especial",
    salutation: "Querida Diana,",
    paragraphs: [
      "Hoy, bueno la prox semana jeje será un día muy especial porque celebramos tu vida, la de esa personita que llegó a convertirse en alguien tan importante para mí. Y quiero que sepas lo muchísimo que te amo y lo feliz que me hace tenerte en mi vida. Desde que llegaste, todo es diferente, hasta las cosas más pequeñas se sienten especiales cuando las comparto contigo.",
      "Sabes lo mucho que encanta tu forma de ser, lo sentimental que eres y, por supuesto, lo caprichosa que puedes llegar a ser jajaja aunque me hagas renegar también:)). Me encanta cuando te pones así porque pareces una niñita pequeña, y esa parte de ti me transmite tanta ternura, inocencia y paz que no cambiaría nada de eso. Amo cada una de esas cositas que te hacen ser tú.",
      "Quiero que sepas que siempre voy a estar para ti, que voy a cuidarte y acompañarte pase lo que pase. Todavía nos esperan muchísimas cosas bonitas, nuestros viajes, nuestras aventuras y todos esos recuerdos que sé que algún día atesoraremos con mucho cariño. Sé que ya has conocido muchísimos lugares, pero quiero que ahora muchos de esos lugares y nuevas experiencias tengan algo diferente: que sean nuestros, que los vivamos juntos y que cada uno tenga una historia especial que contar.",
      "Hoy me preguntaba, bueno ayer xd: ¿qué puedo regalarle a alguien que lo tiene todo? Y entendí que hay cosas que no se compran ni vienen envueltas en una caja. Lo que quiero regalarte es mi amor, mi cariño, mi tiempo, mis cuidados y todo lo bonito que tengo para darte. Quiero seguir demostrándote cada día lo importante que eres para mí.",
      "Eres de lo mejor que me ha pasado y agradezco muchísimo que existas. También tengo que agradecerle a tu mami por haberte hecho así de maravillosa, aunque un poquito renegona y caprichosa jajaja. Te quiero con cada una de esas cositas y no quisiera que cambiaras tu esencia nunca.",
      "Feliz cumpleaños, mi niña hermosa. Nunca te canses de ser tú y nunca dudes de lo mucho que te amo. Quiero cuidarte, hacerte feliz y seguir eligiéndote cada día.",
      "Te amo muchísimooooo, y no me cansaré de recordártelo."
    ],
    closing: "Por siempre tuyo,",
    signature: "Con todo mi amor ❤️"
  },

  // Foto final general
  finalPhoto: {
    url: "/foto-2.jpeg",
    title: "El Mejor Capítulo Apenas Comienza",
    description: "Gracias por estar en mi vida, eres lo mejor que me ha sucedido. ¡Te amo con todo mi corazón!"
  }
};

