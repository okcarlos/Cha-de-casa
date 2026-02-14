import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getFirestore, collection, doc, updateDoc, onSnapshot, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";




  
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
    let overlay = document.createElement("div")
    overlay.style.position = "fixed"
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = "9980";
    
    
    let tutorial = document.createElement("div")
    tutorial.innerHTML = "digite seu nome: "
    tutorial.style.backgroundColor = "white"
    tutorial.style.position = "fixed"
    tutorial.style.top = "50%"
    tutorial.style.left = "50%"
    tutorial.style.borderRadius = "15px"
    tutorial.style.textAlign = "left"
    tutorial.style.fontSize = "25px"
    tutorial.style.transform = "translate(-50%, -50%)"
    tutorial.style.width = "30%"
    tutorial.style.height = "40%"
    tutorial.style.zIndex = "9990"
    tutorial.style.textAlign = "center"
    tutorial.style.display = "flex"
    tutorial.style.flexDirection = "column"
    tutorial.style.justifyContent = "center"
    tutorial.style.alignItems = "center"
    tutorial.style.gap = "20px"
    
    let input = document.createElement("input")
    input.innerHTML = "Confirmar"
    input.style.zIndex = "9999"
    input.style.borderRadius = "15px"
    input.style.textAlign = "center"
    input.style.fontSize = "25px"
    input.style.width = "150px"
    input.style.height = "30px"
    
    let nomeUsuario = "joão"
    let confirmar = document.createElement("button")
    confirmar.innerHTML = "Confirmar"
    confirmar.style.zIndex = "9999"
    confirmar.style.backgroundColor = "green"
    confirmar.style.borderRadius = "15px"
    confirmar.style.textAlign = "center"
    confirmar.style.fontSize = "25px"
    confirmar.style.width = "130px"
    confirmar.style.height = "50px"
    confirmar.onclick = () =>{
      nomeUsuario = input.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      tutorial.remove()
      overlay.remove()
      console.log(input)
    }
    document.body.appendChild(overlay)
    overlay.appendChild(tutorial)
    tutorial.appendChild(input)
    tutorial.appendChild(confirmar)
    
   { 
    //janela de fundo
    let overlay = document.createElement("div")
    overlay.style.position = "fixed"
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
    overlay.style.zIndex = "9980";
    
    
    //janela de tutorial
    let tutorial = document.createElement("div")
    tutorial.style.backgroundColor = "white"
    tutorial.style.position = "fixed"
    tutorial.style.top = "50%"
    tutorial.style.left = "50%"
    tutorial.style.borderRadius = "15px"
    tutorial.style.textAlign = "left"
    tutorial.style.fontSize = "30px"
    tutorial.style.transform = "translate(-50%, -50%)"
    tutorial.style.width = "75%"
    tutorial.style.height = "75%"
    tutorial.style.zIndex = "9990"
    
    
    let botao = document.createElement("button")
    botao.innerHTML = "Fechar"
    botao.style.zIndex = "9999"
    botao.style.backgroundColor = "#b1c0ff"
    botao.style.borderRadius = "15px"
    botao.style.textAlign = "center"
    botao.style.fontSize = "25px"
    botao.style.width = "140px"
    botao.style.height = "30px"
    botao.onclick = () =>{
      tutorial.remove()
    }
    
    tutorial.innerHTML = '<p>Olá!! Preparamos esse site com muito amor, com o intuito de organizar e informar os itens que ainda não temos para a nossa casinha. Graças a Deus, ao longo do caminho, já ganhamos alguns presente, e essa lista nos ajuda a evitar itens repetidos e também a facilitar a escolha de vocês✨</p> <br>🔹 Cadastro: <br>Não é obrigatório colocar o nome completo. apenas o primeiro e o segundo nome <br> 🔹 Preferência de cores:<br>Para manter tudo em harmonia, nossas preferências são: <br> Cores neutras: branco, preto, bege, cinza, prata e dourado• Cores coloridas: rosa, azul e verde <br>Ficamos imensamente gratos pelo carinho, pela presença e por fazerem parte desse momento tão especial das nossas vidas 🤍 Com amor, Gustavo & Laryssa… <br>'
    
    document.body.appendChild(tutorial)
    tutorial.appendChild(botao)
  }
    
    
    
    // 🔹 Escuta produtos em tempo real
    onSnapshot(collection(db, "produtos"), (snapshot) => {

  lista.innerHTML = "";

  snapshot.forEach((docSnap) => {

    const produto = docSnap.data();
    const li = document.createElement("li");
    li.style.fontSize = "45px";
    li.style.marginBottom = "15px";

    let texto = produto.nome;

    if (produto.reservadoPor && produto.reservadoPor.length > 0) {
      texto += " - Reservado por: " + produto.reservadoPor.join(", ");
    }

    li.textContent = texto + " ";

    const botao = document.createElement("button");
    botao.style.width = '180px';
    botao.style.height = "60px";
    botao.style.fontSize = "25px";
    botao.style.borderRadius = "15px";

    const listaReservas = produto.reservadoPor || [];
    const jaReservou = listaReservas.includes(nomeUsuario);

    if (jaReservou) {

      botao.textContent = "Remover minha reserva";
      botao.style.backgroundColor = "#ffbbbb";

      botao.onclick = async () => {
        if (confirm("Tem certeza que deseja remover sua reserva?")) {
          await updateDoc(doc(db, "produtos", docSnap.id), {
            reservadoPor: arrayRemove(nomeUsuario)
          });
        }
      };

    } else {

      botao.textContent = listaReservas.length > 0
        ? "Reservar também"
        : "Reservar";

      botao.style.backgroundColor = "#ceffb2";

      botao.onclick = async () => {
        await updateDoc(doc(db, "produtos", docSnap.id), {
          reservadoPor: arrayUnion(nomeUsuario)
        });
      };
    }

    li.appendChild(botao);
    lista.appendChild(li);

  });

});
});
