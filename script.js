
const typingText = document.getElementById('typing-text');
const text = "OLA! SOU O";
let i=0;

function typeWriter(){
    if(i<text.length){
        typingText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter,150);
    }
}
typeWriter();
const typingText2 = document.getElementById('typing-text2');
const text2 = "PAOLO";
let p=0;

function typeWriter2(){
    if(p<text2.length){
        typingText2.innerHTML += text2.charAt(p);
        p++;
        setTimeout(typeWriter2,150);
    }
}
typeWriter2();
const typingText3 = document.getElementById('typing-text3');
const text3 = "DESENVOLVEDOR FULLSTACK";
let d=0;

function typeWriter3(){
    if(d<text3.length){
        typingText3.innerHTML += text3.charAt(d);
        d++;
        setTimeout(typeWriter3,75);
    }
}
typeWriter3();

function mascara_telefone() {
    //limitador
    var tel = document.getElementById("telefone").value;
    console.log(tel);
    tel = tel.slice(0, 14); //(pode limitar a quantidade de char na entrada pelo java script)
    console.log(tel);
    document.getElementById("telefone").value = tel;
    tel = document.getElementById("telefone").value.slice(0, 10);
    console.log(tel);
  
    //máscara
    var tel_formatado = document.getElementById("telefone").value;
    if (tel_formatado[0] != "(") {
      if (tel_formatado[0] != undefined) {
        document.getElementById("telefone").value = "(" + tel_formatado[0];
      }
    }
  
    if (tel_formatado[3] != ")") {
      if (tel_formatado[3] != undefined) {
        document.getElementById("telefone").value =
          tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
      }
    }
  
    if (tel_formatado[9] != "-") {
      if (tel_formatado[9] != undefined) {
        document.getElementById("telefone").value =
          tel_formatado.slice(0, 9) + "-" + tel_formatado[9];
      }
    }
  }


  function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }


const darkToggle = document.getElementById('modoescuro');
const currentTheme = localStorage.getItem('theme');

if(currentTheme === 'dark') document.body.classList.add('dark');

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});