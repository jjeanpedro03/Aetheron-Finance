# 🌌 Aetheron Finance — Dashboard de Câmbio em Tempo Real

O **Aetheron Finance** é uma plataforma de monitoramento cambial e gestão de margem operacional (Spread), desenvolvida para oferecer uma experiência de trading moderna, reativa e de alta performance.

Este projeto foi totalmente desenvolvido por mim, **Jean Pedro**, como parte do meu ecossistema de soluções Full Stack.

---

## 🎥 Demonstração em Vídeo

Confira abaixo o funcionamento do sistema, incluindo o ajuste de spread em tempo real, a atualização dos gráficos e o fluxo de negociação de ativos:

<p align="center">
  <video src="./img/demonstracao-aetheron.mp4" width="700px" controls autoplay loop muted style="border-radius: 10px; border: 2px solid #1e293b;"></video>
</p>

---

## 🎯 Objetivo

O Aetheron Finance foi criado para solucionar a necessidade de visualização clara de lucros operacionais em transações de câmbio. O foco principal foi a manipulação de dados em tempo real e a construção de uma interface "Dark Terminal" que transmita confiança e precisão técnica ao usuário final.

## 🚀 Sobre o Projeto

Uma interface fintech robusta que permite ao administrador ajustar margens de lucro (Spread) e visualizar instantaneamente o impacto nos preços de venda através de gráficos analíticos triplos e reativos.

* ⚡ **Gráficos Preditivos:** Visualização simultânea de Taxa Atual, Projeção de Alta (Resistência) e Projeção de Queda (Suporte).
* 🎚️ **Engine de Margem:** Slider interativo que recalcula todo o dashboard em tempo real via Spread dinâmico.
* 📱 **Interface Ultra-Moderna:** Design focado em UX, utilizando Tailwind CSS para um visual sóbrio, profissional e responsivo.
* 📡 **Consumo de API Real-time:** Integração de dados históricos e atuais consumidos de serviços financeiros.

## 🛠️ Tecnologias Utilizadas

![Tecnologias](https://skillicons.dev/icons?i=react,ts,tailwind,nestjs,postgres,vite,git)

* **React & Vite:** SPA (Single Page Application) focada em velocidade e experiência de desenvolvimento.
* **TypeScript:** Tipagem rigorosa para garantir segurança em operações financeiras.
* **NestJS & PostgreSQL:** Backend escalável para processamento de logs e integração de dados.
* **Recharts:** Biblioteca de gráficos customizada para alcançar o visual estilo "Google Finance".
* **Tailwind CSS:** Estilização utilitária para uma interface customizada em modo Dark.

## 💡 Diferenciais Técnicos

* 🧠 **Memoization Progressiva:** Aplicação de `useMemo` para garantir performance estável (60 FPS) durante a interação com o slider de margem.
* 🎨 **Custom Tooltip System:** Dicas flutuantes com efeito de vidro fosco (Backdrop Blur) e informações localizadas em Português (PT-BR).
* 🛡️ **Resiliência de Dados:** Tratamento inteligente de falhas de rede e normalização automática de timestamps de diferentes provedores.

## 💻 Como Executar o Projeto
```
### 1. Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
* **Node.js** (Versão 18 ou superior)
* **npm** ou **yarn**

### 2. Instalação
Clone o repositório e instale as dependências:

bash
# Acesse a pasta do projeto
cd fintech-dashboard

# Instale as dependências
npm install
3. Execução
Para rodar o projeto em ambiente de desenvolvimento:

Bash
npm run dev
Após o comando, o Vite abrirá uma porta local (geralmente http://localhost:5173). Basta acessar este endereço no seu navegador.

📂 Estrutura do Projeto
Plaintext
├── src/
│   ├── components/       # Componentes modulares (HistoryChart, Card, Slider)
│   ├── hooks/            # Hooks customizados (useHistory para fetch de dados)
│   ├── utils/            # Lógica de cálculo (Finance Engine) e formatadores
│   └── App.tsx           # Ponto de entrada e orquestração do layout
├── public/               # Ativos estáticos e vídeo de demonstração
└── tailwind.config.js    # Customização da paleta de cores Aetheron
