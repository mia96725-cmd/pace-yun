import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCqnQi0MudXQXSNiXNU7yjTaQznWEeYuEI',
  authDomain: 'project-1695722827691305033.firebaseapp.com',
  projectId: 'project-1695722827691305033',
  storageBucket: 'project-1695722827691305033.firebasestorage.app',
  messagingSenderId: '348437473575',
  appId: '1:348437473575:web:7892f5712f2070e2076102',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const status = document.getElementById('authStatus');
const avatar = document.getElementById('authAvatar');
const signInButton = document.getElementById('googleSignIn');
const signOutButton = document.getElementById('googleSignOut');

onAuthStateChanged(auth, user => {
  if (user) {
    status.textContent = user.displayName || user.email || '已登入';
    avatar.textContent = (user.displayName || user.email || '我').slice(0, 1).toUpperCase();
    signInButton.hidden = true;
    signOutButton.hidden = false;
    signOutButton.title = `登出 ${user.displayName || user.email || 'Google 帳號'}`;
    return;
  }

  status.textContent = '個人運動模式';
  avatar.textContent = '我';
  signInButton.hidden = false;
  signOutButton.hidden = true;
});

signInButton.addEventListener('click', async () => {
  signInButton.disabled = true;
  status.textContent = '正在開啟 Google 登入…';
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      status.textContent = error.code === 'auth/unauthorized-domain'
        ? '此網站網域尚未加入 Firebase 授權網域。'
        : `Google 登入失敗：${error.message}`;
    }
  } finally {
    signInButton.disabled = false;
  }
});

signOutButton.addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (error) {
    status.textContent = `登出失敗：${error.message}`;
  }
});
