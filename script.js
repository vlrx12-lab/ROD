document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const modal = document.getElementById('modal');
  const modalOptions = document.getElementById('modalOptions');
  const modalResult = document.getElementById('modalResult');
  const resultText = document.getElementById('resultText');
  const acceptFromModal = document.getElementById('acceptFromModal');
  const closeModal = document.getElementById('closeModal');
  const confettiEl = document.getElementById('confetti');

  yesBtn.addEventListener('click', () => {
    showConfetti();
    showToast("¡Perfecto! Acabas de alegrar mi multiverso✨");
  });

  noBtn.addEventListener('click', () => {
    openModal();
  });

  modalOptions && modalOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    handlePersuasion(action);
  });

  acceptFromModal && acceptFromModal.addEventListener('click', () => {
    closeModalFunc();
    showConfetti();
    showToast("¡Qué emoción! Me alegraste el multiverso, Te confirmo detalles en un rato mi loquita <3");
  });

  closeModal && closeModal.addEventListener('click', () => closeModalFunc());

  function openModal(){
    modal.classList.remove('hidden');
    modalResult.classList.add('hidden');
  }
  function closeModalFunc(){
    modal.classList.add('hidden');
  }

  function handlePersuasion(action){
    modalResult.classList.remove('hidden');
    let text = '';
    switch(action){
      case 'bribe':
        text = "Palomitas y bebida tamaño gigante — ¡a mi cargo!";
        break;
      case 'reschedule':
        text = "Sin problema, dime cuándo y lo reprogramamos.";
        break;
      case 'guilt':
        text = "Recuerda los besitos pendientes... aunque si no quieres no hump";
        break;
      case 'think':
        text = "Te doy tiempo: te recuerdo mañana (simulación en 8s).";
        startThinkingCountdown();
        break;
      default:
        text = "Hmm... inténtalo otra vez.";
    }
    resultText.textContent = text;
  }

  function startThinkingCountdown(){
    closeModalFunc();
    showToast("Te dejo pensarlo. Te recuerdo en unos segundos (simulación).");
    setTimeout(() => {
      openModal();
      modalResult.classList.remove('hidden');
      resultText.textContent = "¿Y ahora? ¿Aceptas la misión?";
    }, 8000);
  }

  // confetti simple
  function showConfetti(){
    confettiEl.classList.remove('hidden');
    for(let i=0;i<40;i++){
      const dot = document.createElement('div');
      dot.style.position='absolute';
      dot.style.left = (Math.random()*100)+'%';
      dot.style.top = (Math.random()*10)+'%';
      dot.style.width = (6 + Math.random()*8)+'px';
      dot.style.height = (10 + Math.random()*12)+'px';
      dot.style.background = randomColor();
      dot.style.opacity = '0.95';
      dot.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
      dot.style.borderRadius = '2px';
      dot.style.pointerEvents = 'none';
      confettiEl.appendChild(dot);
      const fall = dot.animate([
        { transform: `translateY(0)`, opacity:1 },
        { transform: `translateY(${200 + Math.random()*400}px)`, opacity:0.1 }
      ], { duration: 1200 + Math.random()*1200, easing:'cubic-bezier(.2,.7,.2,1)'});
      fall.onfinish = () => dot.remove();
    }
    setTimeout(()=> confettiEl.classList.add('hidden'), 2200);
  }
  function randomColor(){
    const colors=['#ff3b3b','#ffd166','#60f','#7efcbd','#ff6b6b','#9b5cff'];
    return colors[Math.floor(Math.random()*colors.length)];
  }

  function showToast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style,{position:'fixed',bottom:'22px',left:'50%',transform:'translateX(-50%)',background:'#111',color:'#fff',padding:'12px 18px',borderRadius:'10px',boxShadow:'0 6px 18px rgba(0,0,0,0.6)',zIndex:9999,opacity:0});
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity='0.95',50);
    setTimeout(()=> t.remove(), 3000);
  }
})
