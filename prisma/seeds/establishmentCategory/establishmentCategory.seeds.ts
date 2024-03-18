import { EstablishmentCategory } from "@prisma/client";
import { randomUUID } from "crypto";

export const establishmentCategorySeeds: EstablishmentCategory[] = [
  {
    id: randomUUID(),
    name: "Restaurante",
    description:
      "Estabelecimento que oferece refeições preparadas e servidas no local.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Café",
    description:
      "Local que serve uma variedade de bebidas, lanches e, às vezes, refeições leves.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Bar",
    description:
      "Estabelecimento que serve bebidas alcoólicas, muitas vezes acompanhadas de lanches.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Padaria",
    description:
      "Loja que produz e vende pães, bolos, doces e outros produtos de padaria.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Sorveteria",
    description: "Local que oferece sorvetes e sobremesas geladas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Food truck",
    description:
      "Restaurante móvel que prepara e vende comida de rua em locais diversos.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Supermercado",
    description:
      "Grande loja que vende uma variedade de produtos alimentícios, de limpeza e domésticos.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Loja de roupas",
    description: "Estabelecimento que vende roupas, calçados e acessórios.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Loja de eletrônicos",
    description:
      "Comércio especializado em produtos eletrônicos, como smartphones, computadores e televisões.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Loja de móveis",
    description:
      "Estabelecimento que vende móveis e artigos para decoração de ambientes.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Livraria",
    description:
      "Loja que comercializa livros, revistas e materiais de papelaria.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Loja de conveniência",
    description:
      "Pequeno estabelecimento que oferece uma seleção limitada de produtos para conveniência dos clientes.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Salão de beleza",
    description:
      "Estabelecimento que oferece serviços de cuidados com o cabelo, unhas e pele.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Academia",
    description:
      "Local destinado à prática de exercícios físicos e atividades esportivas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Lavanderia",
    description: "Serviço especializado em limpeza e lavagem de roupas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Oficina mecânica",
    description:
      "Local onde são realizados reparos e manutenção de veículos automotores.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Agência bancária",
    description:
      "Filial de uma instituição financeira onde os clientes podem realizar transações bancárias.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Agência de viagens",
    description:
      "Empresa que organiza e vende pacotes turísticos e serviços relacionados a viagens.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Hospital",
    description:
      "Instituição de saúde onde são oferecidos serviços médicos, cirúrgicos e de emergência para pacientes internados e ambulatoriais.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Clínica médica",
    description:
      "Estabelecimento onde médicos e outros profissionais de saúde oferecem consultas e tratamentos para diversas condições médicas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Farmácia",
    description:
      "Local onde são vendidos medicamentos, produtos de saúde e itens relacionados à higiene pessoal.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Spa",
    description:
      "Estabelecimento dedicado ao bem-estar e relaxamento, oferecendo uma variedade de tratamentos, como massagens, banhos terapêuticos e serviços de beleza.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Clínica de fisioterapia",
    description:
      "Centro especializado em reabilitação física e tratamento de lesões musculoesqueléticas, oferecendo terapias e exercícios específicos.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Centro de bem-estar",
    description:
      "Espaço que oferece uma variedade de serviços para promover o bem-estar físico e mental, incluindo atividades como ioga, meditação, terapias holísticas e workshops de saúde.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Cinema",
    description:
      "Local onde são exibidos filmes em tela grande para entretenimento do público.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Teatro",
    description:
      "Espaço destinado à apresentação de peças teatrais, concertos, musicais e outras formas de entretenimento ao vivo.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Parque de diversões",
    description:
      "Área de lazer com atrações como montanhas-russas, carrosséis, jogos e atividades recreativas para toda a família.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Centro de jogos",
    description:
      "Estabelecimento que oferece uma variedade de jogos eletrônicos, arcade, bilhar e outras atividades de entretenimento.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Centro de artes",
    description:
      "Local dedicado à promoção e exibição de arte visual, incluindo galerias de arte, estúdios de artistas e espaços para performances artísticas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Centro de eventos",
    description:
      "Espaço utilizado para a realização de eventos públicos e privados, como conferências, shows, casamentos e exposições.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Escola",
    description:
      "Instituição de ensino que oferece educação formal para crianças e adolescentes, abrangendo desde a educação infantil até o ensino médio.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Universidade",
    description:
      "Instituição de ensino superior que oferece uma ampla gama de cursos de graduação, pós-graduação e pesquisa, concedendo diplomas acadêmicos.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Curso de idiomas",
    description:
      "Estabelecimento especializado em ensinar um idioma estrangeiro, oferecendo aulas para alunos de diferentes níveis de proficiência.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Centro de treinamento profissional",
    description:
      "Instituição que fornece treinamento prático e teórico em uma área específica, preparando os alunos para ingressarem no mercado de trabalho em profissões técnicas ou especializadas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Instituição de ensino à distância",
    description:
      "Organização que oferece programas educacionais online, permitindo que os alunos estudem remotamente e obtenham certificados ou diplomas sem a necessidade de frequentar aulas presenciais.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Hotel",
    description:
      "Estabelecimento comercial que oferece acomodações temporárias, serviços de hospedagem e uma variedade de comodidades para os hóspedes.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Pousada",
    description:
      "Estabelecimento menor que oferece acomodações simples e acolhedoras, geralmente administrado por proprietários locais.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Hostel",
    description:
      "Acomodação econômica, muitas vezes voltada para viajantes jovens ou mochileiros, que oferece quartos compartilhados e áreas comuns para socialização.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Resort",
    description:
      "Complexo turístico que oferece uma variedade de comodidades e atividades recreativas, além de acomodações de luxo, destinadas a proporcionar experiências de férias completas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Alojamento",
    description:
      "Instalação temporária ou permanente destinada a fornecer habitação básica, como dormitório, albergue ou quarto alugado, muitas vezes para estudantes ou trabalhadores temporários.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Escritório de advocacia",
    description:
      "Empresa que presta serviços jurídicos, incluindo aconselhamento legal, representação em processos judiciais e elaboração de contratos.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Escritório de contabilidade",
    description:
      "Empresa especializada em serviços de contabilidade, incluindo auditoria, preparação de declarações fiscais, consultoria financeira e gestão de registros financeiros.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Consultoria",
    description:
      "Empresa ou profissional autônomo que oferece serviços especializados de consultoria em diversas áreas, como gestão, recursos humanos, tecnologia e estratégia empresarial.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Escritório de arquitetura",
    description:
      "Empresa que oferece serviços de design e planejamento arquitetônico para projetos de construção, incluindo residenciais, comerciais e institucionais.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Empresa de tecnologia",
    description:
      "Empresa especializada no desenvolvimento, implementação e suporte de soluções tecnológicas, como software, hardware, serviços de TI e consultoria em tecnologia.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: randomUUID(),
    name: "Agência de publicidade",
    description:
      "Empresa de comunicação que cria e executa campanhas publicitárias para clientes, incluindo planejamento estratégico, criação de conteúdo, compra de mídia e avaliação de desempenho de campanhas.",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
