# Anagrams Game 🎮

`README Disclaimer: README.md is partially generated and formatted using AI`

A full-stack multilingual word puzzle game built with **React + Zustand + TailwindCSS** (frontend) and **Node.js + Express + MongoDB** (backend).
Form words from a base word, compete on the leaderboard, and improve your vocabulary skills in multiple languages.

---
[Anagrams Game](https://anagramsgame.netlify.app/)
---

## 📂 Project Structure

```
.
├─ backend/
│  ├─ src/            # Source code: data, middleware, models, passport, routes, utils
│  ├─ index.js        # Express server entry point
│  └─ package.json
├─ frontend/
│  ├─ src/            # React source code: components, data, router, stores, utils
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  └─ eslint.config.js
├─ README.md          # ← this file
└─ GradingHELP.md     # Special self-assessment and assistance in assessing compliance with requirements
```

---

## ⚡ Key Features

### Frontend

- **Multilingual interface** (English, Russian, Spanish)
- **Game UI**: interactive letters grid, word input, timer, score panel
- **State management**: Zustand handles game logic, word validation, player profile, leaderboard, UI language
- **Protected routes**: game board inaccessible without starting a game
- **Animations**: shake effect for invalid words, smooth transitions
- **Player profile management**: edit name, logout, delete account
- **Auto-login**: via URL token or localStorage

### Backend

- **Authentication**: Google OAuth 2.0 + JWT
- **REST API** (Express + MongoDB)
  - Users CRUD
  - Base word fetch & seed upload
  - Word validation via dictionary
  - Game session saving & leaderboard aggregation
- **Security**: token-protected endpoints
- **Persistence**: MongoDB with Mongoose models

---

## 🏗 Technology Stack

| Layer    | Technologies                                 |
| -------- | -------------------------------------------- |
| Backend  | Node.js, Express, Mongoose, Passport.js, JWT |
| Database | MongoDB                                      |
| Frontend | React, Zustand, React Router, TailwindCSS    |
| Tooling  | Vite, ESLint                                 |

---

## 🧩 React Component Structure

```
App
 ├─ AppRouter
 │   ├─ AppHeader
 │   ├─ AppLayout
 │   │   ├─ MainMenu
 │   │   ├─ Leaderboard
 │   │   ├─ UserProfile
 │   │   ├─ SettingsMenu
 │   │   └─ ProtectedGameRoute
 │   │       └─ GameBoard
```

---

## 🧠 Zustand State Flow

```
useGlobalStore
 ├─ autoLogin
 └─ interfaceLanguage

usePlayerStore
 ├─ logIn / logOut
 ├─ addGameToHistory
 ├─ updatePlayerName
 └─ deletePlayerAccount

useGameStore
 ├─ startGame
 ├─ submitWord
 ├─ endGame
 ├─ decrementTime
 └─ resetGameState

useWordsStore
 ├─ setGameBaseWord
 ├─ addLetter
 ├─ backspace
 ├─ checkPlayerWord
 ├─ resetPlayerWord
 └─ resetWordState

useLeaderBoardStore
 ├─ fetchLeaderBoards
 └─ topList / myRank
```

---

## 🧮 Score Calculation

- Some short words are zero points depending on difficulty
- Long words earn more points, multiplied by difficulty

---

## 🔐 Security & Authentication

- **JWT**: stored in localStorage & URL for auto-login
- **Protected React Routes**: prevent direct access to GameBoard
- **Backend**: all sensitive endpoints validate JWT
- **OAuth2**: Google login

---

## 🌐 Backend API Endpoints

| Endpoint                                | Method | Description              |
| --------------------------------------- | ------ | ------------------------ |
| `/api/auth/google`                      | GET    | Start Google OAuth       |
| `/api/auth/google/callback`             | GET    | OAuth callback → JWT     |
| `/api/users/me`                         | GET    | Fetch current user info  |
| `/api/users/me`                         | PUT    | Update player name       |
| `/api/users/me`                         | DELETE | Delete account & history |
| `/api/basewords/random/:lang`           | GET    | Get random base word     |
| `/api/basewords/upload/data`            | POST   | Upload seed base words   |
| `/api/words/check/:word?lang=`          | GET    | Check word existence     |
| `/api/gamesessions/save`                | POST   | Save game session        |
| `/api/gamesessions/leaderboard/top`     | GET    | Top leaderboard          |
| `/api/gamesessions/leaderboard/my-rank` | GET    | Player rank              |

---

## 🌐 UI / Animations

```css
@keyframes shake {
  10%,90% {transform: translateX(-1px);}
  20%,80% {transform: translateX(2px);}
  30%,50%,70% {transform: translateX(-4px);}
  40%,60% {transform: translateX(4px);}
}

.animate-shake {
  animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
```

- Smooth hover & modal transitions

---

## 🌐 Localization

- Supported languages: `en`, `ru`, `es`
- All UI strings in `src/data/texts.js`
- Language selection updates `interfaceLanguage` globally

---

## 🏁 Setup & Deployment

### Backend

1. Create `.env` and fill:

   ```
   ATLAS_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FRONTEND_URL=http://localhost:3000
   ```

2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

### Frontend

1. Navigate to `frontend/`
2. Create `.env` and fill: (`VITE_API_URL`)
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Build production: `npm run build`

---

## ✅ Future Improvements

### Gameplay

- **Sandbox Mode**: Allow players to experiment with words without time constraints.
- **Keyboard Input**: Enable typing words directly via keyboard in addition to letter selection.
- **Pause & Resume**: Implement game pause and the ability to save and continue sessions.

### Styles & UI

- **Responsive Design**: Improve adaptability for mobile and tablet devices.
- **Theme Options**: Add dark mode and theme customization.
- **Interface Localization**: Store UI language preferences and dynamically adjust interface text.
- **Avatar uploads**: Allow users to upload custom avatars

### Sound

- **Music & Sound Effects**: Add background music and audio feedback for actions and achievements.

### Platform

- **React Native Port**: Extend the game to mobile platforms.
- **App Store Deployment**: Release the app on Google Play Store and Apple App Store.
- **Offline play & caching**: Implement offline game feature

### Monetization

- **In-Game Tips & Hints**: Offer optional hints or tips for gameplay enhancement.
- **Ad Extensions**: Integrate ads for additional revenue streams.

### Language Support

- **Expanded Dictionary**: Integrate all supported languages from the [FreeDictionary API](https://freedictionaryapi.com/) to broaden accessibility.

---

## 📜 License

**MIT License** © 2025
**Dmitrii Izrailit** 2025

---

## 👏 Acknowledgments

- To my family, who taught me this game that brings four generations together in one activity
- To the wonderful PerScholas school and its teachers, who bring out talents
- FreeDictionary API for word validation
- Zustand for state management
- TailwindCSS for styling