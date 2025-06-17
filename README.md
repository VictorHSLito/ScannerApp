# 📱 Scanner App

### ✔️ Controle suas compras de forma simples, prática e **offline**.

---

## 🚀 Visão Geral do Projeto

Atualmente, os dispositivos móveis estão presentes em quase todos os momentos do nosso dia a dia. Nesse contexto, cresce a necessidade de soluções que facilitem tarefas rotineiras — como controlar compras no mercado ou em lojas.

O **Scanner App** foi criado com esse objetivo: permitir que o consumidor registre e acompanhe suas compras diretamente no celular, de forma prática, rápida e até sem internet.

Com isso, você evita anotações confusas, reduz erros e ganha controle real sobre seus gastos — tudo na palma da mão, **com ou sem internet**.

---

## 🔧 Tecnologias Utilizadas

- **TypeScript**
- **React Native**
- **Expo**
- **SQLite** (Armazenamento local offline)
- **Styled Components**
- **Android Studio (para build e emulador)**

---

## 🎯 Funcionalidades

- ✔️ Cadastro de produtos
- ✔️ Lista de produtos com opção de editar, excluir e limpar
- ✔️ Cálculo automático de subtotal e total da compra
- ✔️ Armazenamento local via SQLite (funciona offline)
- ✔️ Exportação da lista em **PDF** ou **JSON**
- ✔️ Interface simples, intuitiva e leve
- ✔️ Inclusão digital e facilidade de uso

---

## 📸 APP EM FUNCIONAMENTO

1. Cadastra produtos com nome, quantidade e preço
2. Visualiza e edita a lista de compras
3. Calcula automaticamente subtotal e total
4. Salva tudo no próprio aparelho (offline)
5. Exporta sua lista em **PDF** ou **JSON**

---

## 🗺️ Estrutura do Código (Simplificada)

```
ScannerApp/
├── android/                 # Projeto Android nativo
├── ios/                     # Projeto iOS nativo
├── assets/                  # Imagens e ícones
├── src/                     # Código fonte
│   ├── app/
│   │   ├── data/            # DataSources, Models, Repositories (SQLite)
│   │   ├── domain/          # Entities, UseCases, Interfaces
│   │   ├── main/            # App.tsx e setup principal
│   │   ├── presentation/    # Telas, navegação, componentes e controllers
│   │   └── utils/           # Funções utilitárias como exportação PDF/JSON
├── app.json                 # Configuração Expo
├── eas.json                 # Configuração de build EAS
├── index.ts                 # Arquivo inicial
├── package.json             # Dependências
└── tsconfig.json            # Configuração TypeScript
```

---

## 📲 Como Rodar o Projeto

### 🔥 Passo 1: Instalar dependências
```bash
npm install
```

### 🔥 Passo 2: Instalar CLI da EAS (Expo Application Services)
- Instalação global:
```bash
npm install -g eas-cli
```
- Ou como dependência do projeto:
```bash
npm install --save-dev eas-cli
```

---

## 🧠 Observação Importante:
Se é sua **primeira vez usando Expo**, crie uma conta gratuita:

- Acesse: https://expo.dev/signup  
ou  
- Pelo terminal:
```bash
npx eas login
```
→ Siga os passos para criar uma conta ou fazer login.

---

## 🚀 Executar no Android

### ✅ Build para testar no emulador ou dispositivo físico:
```bash
npx eas build --platform android --profile preview
```
- O `--profile preview` gera uma build para desenvolvimento, com atualizações mais rápidas e suporte a debug.

### ✅ Modo desenvolvimento (preview instantâneo):
```bash
npx expo start --tunnel
```
- Escaneie o QR Code com o **Expo Go** (se seu projeto não usa nativo avançado)  
ou use o **emulador Android Studio** aberto para rodar no simulador.

---

## 🚀 Executar no iOS

> ⚠️ Para builds iOS, é necessário um Mac ou utilizar um serviço de build em nuvem.

### ✅ Build para iOS:
```bash
npx eas build --platform ios --profile preview
```

### ✅ Modo desenvolvimento (preview):
```bash
npx expo start --tunnel
```
- Funciona via app **Expo Go** no iPhone (desde que não use dependências nativas fora do Expo Managed).

---

## 🚀 Build para Produção (Play Store / App Store):
```bash
npx eas build --platform android --profile production
```
ou
```bash
npx eas build --platform ios --profile production
```
→ Gera APK, AAB (Android) ou arquivos para submissão na App Store.

---

## 💡 Benefícios do App

- ✅ App funcional, simples e acessível
- ✅ Facilita o controle de gastos do dia a dia
- ✅ Funciona **offline**
- ✅ Exportação dos dados
- ✅ Foco na inclusão digital

---

## 🧠 Observações Finais

Este projeto tem foco acadêmico, mas pode ser facilmente adaptado e expandido para uso pessoal, comercial ou publicação nas lojas de aplicativos.

---
 
🚀 Projeto acadêmico | Desenvolvimento Mobile  

---
