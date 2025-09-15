import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getFirestore, collection, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_NM8y_8pSXvWcNBQXGGNBRPs49J3BV0s",
  authDomain: "projetos-7e973.firebaseapp.com",
  projectId: "projetos-7e973",
  storageBucket: "projetos-7e973.firebasestorage.app",
  messagingSenderId: "659615197537",
  appId: "1:659615197537:web:608bd2a3199c5c17fcfd20",
  measurementId: "G-DF20S5XBVR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const lista = document.getElementById("lista");

// 🔹 Loga usuário anonimamente
signInAnonymously(auth)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Usuário anônimo logado:", user.uid);

    // 🔹 Pergunta nome do usuário
    const nomeUsuario = prompt("Digite seu nome de exibição:");

    // 🔹 Escuta produtos em tempo real
    onSnapshot(collection(db, "produtos"), (snapshot) => {
      lista.innerHTML = "";
      snapshot.forEach((docSnap) => {
        const produto = docSnap.data();
        const li = document.createElement("li");
        li.style.fontSize = "45px"
        li.style.marginBottom = "15px"

        let texto = produto.nome;
        if (produto.reservado && produto.reservadoPor) {
          texto += ` - Reservado por ${produto.reservadoPor}`;
        }
        li.textContent = texto + " ";

        const botao = document.createElement("button");
        botao.style.width = '180px';
        botao.style.height = "60px";
        botao.style.fontSize = "25px"
        
        if (produto.reservado) {
          if (produto.reservadoPor == nomeUsuario) {
            // 🔹 só quem reservou vê o botão de desreservar
            botao.textContent = "Tirar reserva";
            botao.onclick = async () => {
              await updateDoc(doc(db, "produtos", docSnap.id), { 
                reservado: false,
                reservadoPor: null
              });
            };
          } else {
            // 🔹 outros usuários só veem que está indisponível
            botao.textContent = "Indisponível";
            botao.disabled = true;
          }
        } else {
          // 🔹 produto disponível → qualquer um pode reservar
          botao.textContent = "Reservar";
          botao.onclick = async () => {
            await updateDoc(doc(db, "produtos", docSnap.id), { 
              reservado: true,
              reservadoPor: nomeUsuario // 🔹 agora salva o nome escolhido
            });
          };
        }

        li.appendChild(botao);
        lista.appendChild(li);
      });
    });

  })
  .catch((error) => {
    console.error("Erro no login anônimo:", error);
  });
